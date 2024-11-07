import React, { useEffect, useState, useLayoutEffect } from "react"
import { StyleSheet, SafeAreaView, Text } from "react-native"
import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import Button from "@/src/components/Button"
import MainButton from "@/src/components/MainButton"
import { Link, router } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from "@/src/config"
//import Header from '../../components/Header'
import { setDoc, getDoc, doc, Timestamp } from 'firebase/firestore'
import { collection } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { ProfileNameScreen } from "../initialset/SetProfileName"
import { StatusBar } from 'expo-status-bar';
import LoadFonts from '../../../app/fonts'
import { SignUp } from "./SignUp"
import ProcessBarNavigator from "@/src/navigation/ProcessBarNavigator"
import { BottomTabNavigator } from "@/src/navigation/BottomTabNavigator"
import { Main } from "../main/Main"

export const SignScreen: React.FC = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigation = useNavigation();

    const handlePress = async (email: string, password: string): Promise<void> => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("uid", userCredential.user.uid);
          const userUid = userCredential.user.uid;
        

          // Check if user profile setup is complete
          const userDocRef = doc(db, `users/${userUid}`);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.fullName) {
                navigation.navigate('BottomTabNavigator', { screen: 'Main'});
            } else {
                navigation.navigate('ProcessBarNavigator', { screen : 'SetUserProfile' }); // Navigate to setup process if profile setup is not complete
            }
        } else {
            console.log('User document does not exist.');
            // Handle case where user document does not exist (possibly an error state)
        }



          //navigation.navigate("ProcessBarNavigator")
        } catch (error) {
          const { code, message } = error;
          console.log(code, message);
          Alert.alert('Error', message);
        }
      };
   
    return (
        <View style={styles.container}>
            <StatusBar style="dark"  backgroundColor="red"/>
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
                <TextInput 
                style={styles.input} 
                value ={email}
                onChangeText={(text) => { setEmail(text) }}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Email Address'
                textContentType='emailAddress'
                />
                <TextInput 
                style={styles.input} 
                value ={password}
                onChangeText={(text) => { setPassword(text) }}
                autoCapitalize='none'
                secureTextEntry
                placeholder='password'
                textContentType='password'
                />
                <MainButton label = 'Sign' fontcolor = '#ffffff' bgcolor ='#000000' onPress={() => {handlePress(email, password)}} />
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText} >Not registered?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.footerLink} >Sign up here!</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#C995E0'
    },
    inner: {
        flexDirection: 'column',
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 16,
        fontFamily: 'ABCMonumentGrotesk',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#ffffff',
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16,
        borderRadius: 8
    },
    footer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
        alignItems: 'flex-start',
        //backgroundColor: 'red',
        paddingLeft: 30
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#000000'
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#ffffff'
    }
})


//<Link href='/screens/auth/SignUp' asChild replace>
