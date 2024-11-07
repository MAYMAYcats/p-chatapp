
import { TouchableWithoutFeedback, Keyboard, View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Touchable, KeyboardAvoidingView} from 'react-native'
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
import { ProfileInterest } from '@/src/components/ProfileInterest'
import SettingHeader from '@/src/components/SettingHeader'
import LoadFonts from '../../../app/fonts'

export const SetGroupProfile: React.FC = () => {
    
    const [image, setImage] = useState('');
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [id, setid] = useState('')
    const [interest, setInterest] = useState('')
    const [fee, setFee] = useState('')
    const [location, setLocation] = useState('')
    const navigation = useNavigation();

    const interestPress =() => {

  }

    const handlePress = async (fullName: string, interest: string): Promise<void> => {
        Keyboard.dismiss();
        if(auth.currentUser === null) {
            console.error('user is not authenticated.')
            return
        }    
        const ref = doc(db, `groups/${auth.currentUser.uid}`)
        setDoc(
            ref, 
            {
                fullName, 
                description,
                fee,
                location,
            },
            {merge:true}
        )
        .then((docRef) => {
            console.log('success', docRef)
        }).catch((error)=> {
            console.log(error)
        })
    }

     // Function to fetch existing profile image and set it in state on component mount
    useEffect(() => {
               const fetchProfileData = async () => {
            try {
                if (!auth.currentUser) {
                    console.error('User is not authenticated.');
                    return;
                }
                const groupDocRef = doc(db, `groups/${auth.currentUser.uid}`);
                const docSnap = await getDoc(groupDocRef);
                
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                
                    if (userData) {
                        if (userData.profileImage) {
                            setImage(userData.profileImage);
                        }
                        if (userData.fullName) {
                            setName(userData.fullName);
                        }
                        if (userData.description) {
                            setDescription(userData.description);
                        }
                        if (userData.fee) {
                            setFee(userData.fee);
                        }
                        if (userData.location) {
                            setLocation(userData.location);
                        }
                        if (userData.interest) {
                            setInterest(userData.interest);
                        }      
                    }
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        fetchProfileData(); 
    }, []);


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
        const storageRef = ref(storage, `groups/${auth.currentUser.uid}/profileImage.jpg`);
        const uploadTask = uploadBytesResumable(storageRef, blob)

        // Listen for events
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
                console.log("Progress is "  + progress.toFixed(2) + "% done")
            },
            (error) => {
                console.log("Error is happend ", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log("File available at", downloadURL)
                    if(auth.currentUser){
                        const userDocRef = doc(db, `groups/${auth.currentUser.uid}`);
                    await setDoc(userDocRef, { profileImage: downloadURL }, { merge: true });
                    }

                    // Update the image state with the new image URI
                    setImage(downloadURL);
                }).catch((error)=> {
                    console.error("Error getting download URL:", error)
                })
            }
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <SettingHeader/>
            <View>
                <Text style={styles.title}>Group Profile</Text>
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.photoContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <MaterialIcons name="groups" size={130} color="#ccc" style={styles.personIcon}/>
                    )}
                </View>
                <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
                    <Feather name="plus" style={styles.plusIcon} size={16} color={'#ffffff'}/>                    
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.subTitle}>
                    About
                </Text>
            </View>
            <View style={styles.profileContainer}>
                <View style={styles.profileBox}>
                    <Text style={styles.profileQ}>
                        Name
                    </Text>
                    <TextInput
                        style={styles.profileA}
                        multiline
                        value={name}
                        placeholder='名前'
                        placeholderTextColor="lightgrey"
                        onChangeText={(text) => {setName(text)}}
                    />
                </View>
                <View style={styles.profileBox}>
                    <Text style={styles.profileQ}>
                        Description
                    </Text>
                    <TextInput
                        style={styles.profileA}
                        multiline
                        value={description}
                        placeholder='description'
                        placeholderTextColor="lightgrey"
                        onChangeText={(text) => {setDescription(text)}}
                    />
                </View>
                <View style={styles.profileBox}>
                    <Text style={styles.profileQ}>
                        Fee
                    </Text>
                    <TextInput
                        style={styles.profileA}
                        multiline
                        value={fee}
                        placeholder='fee'
                        placeholderTextColor="lightgrey"
                        onChangeText={(text) => {setFee(text)}}
                    />
                </View>
                <View style={styles.profileBox}>
                    <Text style={styles.profileQ}>
                        Location
                    </Text>
                    <TextInput
                        style={styles.profileA}
                        multiline
                        value={location}
                        placeholder='location'
                        placeholderTextColor="lightgrey"
                        onChangeText={(text) => {setLocation(text)}}
                    />
                </View>
                {/*  
                <View style={styles.profileBox}>
                    <Text style={styles.profileQ}>
                        Interest
                    </Text>
                    <TouchableOpacity onPress={interestPress}>
                        <MaterialIcons name="chevron-right" size={27}/>
                    </TouchableOpacity>
                </View>
                */}

            </View>
            <View style={styles.buttonStyle}>
            <MainButton label = 'Save' fontcolor = '#ffffff' bgcolor ='black' onPress={() => {handlePress(name, interest)}}/>
            </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#C995E0',     
    },
    title: {
        paddingTop: 0,
        fontSize: 32,
        textAlign: 'center',
        fontWeight: '800',
        color: 'black',
        fontFamily: 'ABCMonumentGrotesk',
    },
    subTitle:{
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: '600',
    
    },
    profileContainer:{
        flex:1,
       flexDirection: 'column',
       marginLeft: 10,
    },
    profileBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft : 10,
        marginRight: 20,
        marginBottom: 15
    },
    profileQ:{
        fontWeight: 'bold'
    },
    profileA:{},
    line:{
        width: 400,
        height: 1,
        backgroundColor: '#ffffff',
        alignSelf: 'center'
    },
    nameInputBox:{
        flex:1,
        backgroundColor: 'Green'
    },
    imageContainer: {
        marginTop: 32,
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
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 100, // half of width and height
        borderWidth: 4,
        borderColor: 'white'
    },
    nameContainer:{
        flexDirection:'row',
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
    buttonStyle:{
        position: 'absolute',
        bottom: 0,
        left: 20,
        right: 20,
        zIndex: 1000,
    },
})