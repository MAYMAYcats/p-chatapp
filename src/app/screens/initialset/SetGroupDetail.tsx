import React, { useEffect, useState } from "react"
import { TouchableWithoutFeedback, Keyboard, ActivityIndicator, View, Text, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Link, router } from 'expo-router';
import { auth, db, storage } from "@/src/config";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import CircleButton from "@/src/components/CircleButton";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native"
import MainButton from "@/src/components/MainButton";
import LoadFonts from '../../fonts'
import HeaderBack from "@/src/components/HeaderBack";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const interestIcons: {[key: string]: any} = {
    'Music': require('../../../../assets/images/Music.png'),
    'Fashion': require('../../../../assets/images/Fashion.png'),
    'Games': require('../../../../assets/images/Games.png'),
    'Pet': require('../../../../assets/images/Pet.png'),
    'Travelling': require('../../../../assets/images/Travelling.png'),
    'Technology': require('../../../../assets/images/Technology.png'),
    'Beauty': require('../../../../assets/images/Beauty.png'),
    'Food': require('../../../../assets/images/Food.png'),
    'Comedy': require('../../../../assets/images/Comedy.png'),
    'Skincare': require('../../../../assets/images/Skincare.png'),
    'Wellness': require('../../../../assets/images/Wellness.png'),
    'Bag': require('../../../../assets/images/Bag.png'),
    'Accessories': require('../../../../assets/images/Accessories.png'),
    'Architecture': require('../../../../assets/images/Architecture.png'),
    'Art': require('../../../../assets/images/Art.png'),
    'Sport': require('../../../../assets/images/Sport.png'),
    'Film': require('../../../../assets/images/Film.png'),
    'Drama': require('../../../../assets/images/Drama.png'),
}
    
const interests = [
    'Music', 'Fashion', 'Games', 'Pet', 'Travelling', 'Technology', 'Beauty', 'Food', 
    'Comedy', 'Skincare', 'Wellness', 'Bag', 'Accessories', 'Architecture', ' Art',
    'Sport', 'Film', 'Drama'
];

export const SetGroupDetail: React.FC = () => {
    const navigation = useNavigation()
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                if (!auth.currentUser) {
                    console.error('User is not authenticated.');
                    return;
                }
                const userDocRef = doc(db, `groups/${auth.currentUser.uid}`);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();

                    if (userData) {
                        if (userData.profileImage) {
                            setImage(userData.profileImage);
                        }
                        if (userData.fullName) {
                            setName(userData.fullName);
                        }
                        if (userData.about) {
                            setBodyText(userData.about);
                        }
                        if (userData.interest) {
                            setSelectedInterests(userData.interests);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchProfileData();



        /**/
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
          setSelectedInterests(selectedInterests.filter((i) => i !== interest));
        } else {
          setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            await uploadImage(result.assets[0].uri);
        }
    };

    async function uploadImage(uri: string) {
        const response = await fetch(uri);
        const blob = await response.blob();

        if (!auth.currentUser) {
            console.error('User is not authenticated.');
            return;
        }

        const storageRef = ref(storage, `groups/${auth.currentUser.uid}/groupImage.jpg`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        setLoading(true);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Progress is ' + progress.toFixed(2) + '% done');
            },
            (error) => {
                console.log('Error is happened ', error);
                setLoading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        if (auth.currentUser) {
                            const groupDocRef = doc(db, `groups/${auth.currentUser.uid}`);
                            await setDoc(groupDocRef, { profileImage: downloadURL }, { merge: true });
                        }

                        setImage(downloadURL);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                        setLoading(false);
                    });
            }
        );
    }  
    
    const handlePress = async (fullName: string, bodyText: string): Promise<void> => {
        Keyboard.dismiss();
        if (auth.currentUser === null) {
            console.error('User is not authenticated.');
            return;
        }
        try {
            const groupDocRef = doc(db, `groups/${auth.currentUser.uid}`)
            await setDoc(groupDocRef, 
                { fullName, about: bodyText, interests: selectedInterests }, 
                { merge: true }
            );
            navigation.navigate('MainScreens', { screen: 'Welcome'});
        } catch (error) {
            console.log(error);
        }
    };



return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView behavior="height" style={styles.container}>
    <HeaderBack/>
        <View style = {styles.boxContainer}>
            <Text style={styles.title}>Group Setting</Text>
            <View style={styles.imageContainer}>
                <View style={styles.photoContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
                        {!image && <FontAwesome5 name="camera" color="#ccc" size={24} />}
                        {!!image && <Image source={{ uri: image }} style={styles.image} />}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.nameContainer}>
                <TextInput
                    multiline
                    style={styles.nameInput}
                    value={name}
                    placeholder="Group Name"
                    placeholderTextColor="rgba(231, 236, 240, 0.50)"
                    onChangeText={(text) => {
                        setName(text);
                    }}
                />
                <View style={styles.line}/>
            </View>

            <Text style={styles.topicTitle}>Topics</Text>
            <Text style={styles.topicDescription}>
                Select from a wide variety of topics that match your group.
            </Text>
           
            <View style={styles.interestContainer}>
                {interests.map((interest) => (
                    <TouchableOpacity
                        key={interest}
                        onPress={() => toggleInterest(interest)}
                        style={{ 
                        padding: 8,
                        backgroundColor: selectedInterests.includes(interest) ? '#252525' : 'transparent',
                        borderRadius: 20,
                        flexDirection: 'row',
                        borderWidth: 1,
                        height: 40,
                        alignItems: 'center'
                        }}
                    >
                        <Image
                            source={interestIcons[interest]}
                            style={styles.interestImage} // Adjust size as needed
                        />
                        <Text style={{ color: 'white' }}>{interest}</Text>
                    </TouchableOpacity>
                ))}

            </View>

            {loading && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    )}

{!isKeyboardVisible && (
            <View style={styles.buttonStyle}>
                <MainButton label = 'Save' fontcolor = '#ffffff' bgcolor ='black' onPress={() => handlePress(name, bodyText)} />
            </View>    
)}

        </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
)
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#C995E0'
    },
    boxContainer: {
        marginLeft: 20,
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: 'black',
        fontFamily: 'ABCMonumentGrotesk',
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 144,
        width: 144,
        alignSelf: 'center',
        position: 'relative',
    },
    photoContainer:{
        width: 128,
        height: 128,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        //margin : 8
    },
    nameContainer:{
        marginTop: 15,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    nameInput:{
        fontSize: 18,
        fontFamily: 'ABCMonumentGrotesk',
        fontWeight: '500'
    },
    topicTitle:{
        marginTop: 15,
        fontSize: 20,
        fontFamily: 'ABCMonumentGrotesk',
        fontWeight: '500'
    },
    topicDescription:{
        marginTop: 5,
        color: 'white'
    },

    descriptionContainer: {
        marginTop: 16,
      },
    titleDescription:{
        color: '#ffffff'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#f6f8f9',
        borderStyle: 'solid'
    },
    iconContainer: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon:{
        alignSelf: 'center',

    },
    buttonStyle:{
        position: 'absolute',
        bottom: 0,
        left: 20,
        right: 20,
        zIndex: 1000,
    },

    line: {
        height:1,
        backgroundColor: 'black',
        width: 150,
        marginVertical:10,

    },
    interestContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
        //borderWidth: 2,
        paddingVertical: 0,
        paddingHorizontal: 0,
        columnGap: 8,
        rowGap: 8,
    },
    interestImage:{
        width: 20, 
        height: 20, 
        marginRight: 5
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
})

