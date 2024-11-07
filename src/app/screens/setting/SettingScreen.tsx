
import { Alert, View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Touchable, KeyboardAvoidingView} from 'react-native'
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
import Header from '@/src/components/Header'
import { SetUserProfile } from './SetUerProfile'
import { SetGroupProfile } from './SetGroupProfile'
import { SignScreen } from '../auth/SignScreen'

export const SettingScreen: React.FC = () => {
    const navigation = useNavigation();
    const MyProfilePress= () => {
        navigation.navigate('SetUserProfile')
    }
    const MyGroupPress= () => {
        navigation.navigate('SetGroupProfile')
    }

    const handleLogout = () => {
        auth.signOut()
          .then(() => {
            // Successfully logged out
            Alert.alert('Logout', 'You have been logged out.');
            navigation.navigate('SignScreen')
          })
          .catch((error) => {
            // Handle logout errors here
            Alert.alert('Logout Error', error.message);
          });
      };

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <Header title={"My page"} onLogout={handleLogout} showLogout={true}/>
            <View style={styles.menuContainer}>
                <View style={styles.menu}>
                    <MaterialIcons name="person" size={30} color="#ffffff"/>
                    <Text style={styles.menuText}>
                        My profile
                    </Text>
                    <TouchableOpacity onPress={MyProfilePress} style={styles.chevron} >
                        <MaterialIcons name="chevron-right" size={27}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.line}></View>
                <View style={styles.menu}>
                    <MaterialIcons name="groups" size={30} color="#ffffff"/>
                    <Text style={styles.menuText}>
                        My group
                    </Text>
                    <TouchableOpacity onPress={MyGroupPress} style={styles.chevron}>
                        <MaterialIcons name="chevron-right" size={27}/>
                    </TouchableOpacity>

                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#C995E0',     
    },
    title: {
        paddingTop: 25,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
        //letterSpacing: -0.5
    }, 
    menuContainer:{
        padding: 10,
    },
    menu:{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    menuText:{
        flex:1,
        paddingLeft: 10,
        fontSize: 15,
    },
    chevron:{
        marginRight: 0
    },
    line:{
        width: 400,
        height: 1,
        backgroundColor: '#ffffff',
        alignSelf: 'center'

    },
})