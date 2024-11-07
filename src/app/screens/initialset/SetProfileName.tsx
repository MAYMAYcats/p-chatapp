import { Alert, View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Touchable, KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from "react"
import { useNavigation } from 'expo-router'
import LogOutButton from '@/src/components/LogOutButton'
import { auth, db } from '@/src/config'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import MainButton from "@/src/components/MainButton"
import LoadFonts from '../../fonts'


export const ProfileNameScreen: React.FC = () => {
    
    const [image, setImage] = useState('');
    const [name, setName] = useState('')
    const [bodyText, setBodyText] = useState('')
    const navigation = useNavigation();
    const maxLength = 16;

    const handlePress = async (fullName: string): Promise<void> => {
        if (!fullName.trim()) {
            // Check if the name is empty or contains only whitespace
            Alert.alert('Name cannot be empty.');
            return;
        }
        if(auth.currentUser === null) {
            console.error('user is not authenticated.')
            return
        }    
        const ref = doc(db, `users/${auth.currentUser.uid}`)
        setDoc(
            ref, 
            {
                fullName, 
            },
            {merge:true}
        )
        .then((docRef) => {
            console.log('success', docRef)
            //router.push('setting/selection')
        }).catch((error)=> {
            console.log(error)
        })
        navigation.navigate('SetProfilePhoto');
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
                        if (userData.fullName) {
                            setName(userData.fullName);
                        }

                    }
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        fetchProfileData(); // Call the function on component mount

    }, []);

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <View style = {styles.boxContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Your Username</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.titleDescription}>Set up your usename now and adjust it anytime in the future.</Text>
                </View>
                <View style = {styles.nameContainer}>
                    <TextInput
                        multiline
                        style={styles.nameInput}
                        value={name}
                        placeholder='name'
                        placeholderTextColor="lightgrey"
                        onChangeText={(text) => {setName(text)}}
                        maxLength = {maxLength}
                    />
                </View>
                <View style = {styles.ruleContainer}>
                    <Text style = {styles.ruleText}>
                            Name must be no more than 16 characters long.
                    </Text>
                    <Text style = {styles.ruleText}>
                        {name.length}/{maxLength}
                    </Text>

                </View>
                <View style={styles.buttonContainer}>
                    <MainButton label = 'Continue' fontcolor = '#ffffff' bgcolor ='black' onPress={() => {handlePress(name)}}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C995E0',
      justifyContent: 'center',
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
    titleDescription: {
      color: '#ffffff',
    },
    nameContainer: {
      marginTop: 12,
      //justifyContent: 'center',

    },
    nameInput: {
      fontSize: 16,
      fontWeight: '700',
      width: '100%',
      height: 56,
      paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 20,
      borderWidth: 1,
      borderColor: '#cccccc',
      backgroundColor: '#F6F8F9',
      borderRadius: 100,
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      gap: 8,
      color: 'black', 
    },
    ruleContainer: {
      marginTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    ruleText: {
      color: '#F5ECE6',
      fontSize: 12,
      fontWeight: '400'
    },
    ruleLength: {

    },
    buttonContainer: {
      marginTop: 24,
    },
})