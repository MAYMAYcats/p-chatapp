import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Button from '@/src/components/Button'
import MainButton from '@/src/components/MainButton'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { auth, db } from '@/src/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { SignScreen } from './SignScreen'
import LoadFonts from '../../../app/fonts'

const handlePress = ( email: string, password: string, navigation: ReturnType<typeof useNavigation>): void => {
    //const navigation = useNavigation();
    console.log(email, password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential.user.uid)

        const data = {
            _id: userCredential.user.uid,
            //fullName: name,
            providerData: userCredential.user.providerData[0]
        }
        setDoc(doc(db, 'users', userCredential.user.uid), data).then(()=> {
            //router.replace('/auth/SignScreen')
            navigation.navigate('SignScreen')
        })
    })
    .catch((error) => {
        const { code, message } = error
        console.log(code, message)
        Alert.alert(message)
    })
}
export const SignUp = (): JSX.Element => {
    const navigation = useNavigation();
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    //const [ name, setName ] = useState('')
    return(
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
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
                    placeholder = 'Password'
                    textContentType='password'
                />
                <MainButton label = 'Submit' fontcolor = '#ffffff' bgcolor ='#000000' onPress={() => {handlePress(email, password, navigation)}} />
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already registered?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignScreen')}>
                    <Text style={styles.footerLink}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#C995E0',
        //justifyContent: 'center',
    },
    inner: {
        //flex:1,
        flexDirection: 'column',
        paddingVertical: 50,
        paddingHorizontal: 30,
        //backgroundColor: 'orange'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 16,
        fontFamily: 'ABCMonumentGrotesk',
        //textAlign: 'center'
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
        //marginBottom: 10,
        color: '#000000'
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#ffffff'
    }
})
