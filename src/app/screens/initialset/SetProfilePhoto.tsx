import { ActivityIndicator, View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Touchable, KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from "react"
import { useNavigation } from 'expo-router'
import LogOutButton from '@/src/components/LogOutButton'
import { auth, db, storage } from '@/src/config'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import MainButton from "@/src/components/MainButton"
import * as ImagePicker from "expo-image-picker";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import LoadFonts from '../../fonts'
import ContinueBtn from '@/src/components/ContinueBtn'


export const SetProfilePhoto: React.FC = () => {
    
    const [image, setImage] = useState('');
    const [name, setName] = useState('')
    const [bodyText, setBodyText] = useState('')
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const handlePress = async (fullName: string): Promise<void> => {
        navigation.navigate('SetProfileInterest');
    }

     // Function to fetch existing profile image and set it in state on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
        try {
            if (!auth.currentUser) {
                console.error('User is not authenticated.');
                return;
            }
            const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
            const docSnap = await getDoc(userDocRef);
            
            if (docSnap.exists()) {
                const userData = docSnap.data();
            
                if (userData) {
                    if (userData.profileImage) {
                        setImage(userData.profileImage);
                    }

                }
            }
        } catch (error) {
            console.error('Error fetching profile image:', error);
        }
    };

fetchProfileData(); // Call the function on component mount

}, []);

//async function pickImage() {
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1
    })
    if(!result.canceled){
        await uploadImage(result.assets[0].uri)
    }
}
async function uploadImage (uri: string | URL | Request){
    const response = await fetch(uri)
    const blob = await response.blob();

    //const storageRef = ref(storage, "Stuff/" + new Date().getTime())
    if(auth.currentUser === null) {console.error('user is not authenticated.')
        return}
    const storageRef = ref(storage, `UserImg/${auth.currentUser.uid}/profileImage.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, blob)

    setLoading(true);

    // Listen for events
    uploadTask.on("state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
            console.log("Progress is "  + progress.toFixed(2) + "% done")
        },
        (error) => {
            console.log("Error is happend ", error)
            setLoading(false);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log("File available at", downloadURL)
                if(auth.currentUser){
                    const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
                    await setDoc(userDocRef, { profileImage: downloadURL }, { merge: true });
                }

                // Update the image state with the new image URI
                setImage(downloadURL);
                setLoading(false);
            }).catch((error)=> {
                console.error("Error getting download URL:", error)
                setLoading(false);
            })
        }
    )
}
    
    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <View style = {styles.boxContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Upload Photo</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.titleDescription}>
                        Give your profile a personal touch by uploading a photo. Let your image reflect your identity.
                    </Text>
                </View>

                <View style={styles.setImageContainer}>
                    <View style={styles.imageContainer}>
                        <View style={styles.photoContainer}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.image} />
                            ) : (
                                <MaterialIcons name="person" size={130} color="#ccc" style={styles.personIcon}/>
                            )}
                        </View>
                        <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
                            <Feather name="plus" style={styles.plusIcon} size={16} color={'#ffffff'}/>
                        </TouchableOpacity>
                    </View>

                    {loading && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    )}

                </View>
                <View style={styles.btnContainer}>
                    <View  style={styles.continueBtn}>
                        <MainButton label = 'Continue' fontcolor = '#ffffff' bgcolor ='black' onPress={() => {handlePress(name)}}/>
                    </View>
                    <View  style={styles.laterBtn}>
                        <MainButton label = 'Set Up Later' fontcolor = '#8697AC' bgcolor ='#ffffff' onPress={() => {handlePress(name)}}/>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#C995E0'
    },
    boxContainer: {
        margin: 24,
        flex: 1,
        //justifyContent: 'center',
      },
    titleContainer: {},
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: 'black',
        fontFamily: 'ABCMonumentGrotesk',
    },
    descriptionContainer: {
        marginTop: 16,
      },
    titleDescription:{
        color: '#ffffff'
    },
    nameContainer:{
        flex:1,
    },
    setImageContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        //flex:1,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
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
    personIcon:{
        
    },
    plusIcon:{
        alignSelf: 'center',

    },
    btnContainer:{
        flexDirection: 'column',
        flex:1,
        marginTop: 30
    },
    continueBtn:{
        marginTop: 0,
    },
    laterBtn:{
        marginTop: 70,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },

})

