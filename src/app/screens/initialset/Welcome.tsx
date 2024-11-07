import React, { useEffect, useState } from "react"
import { StyleSheet, SafeAreaView, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import MainButton from "@/src/components/MainButton"
import { auth, db } from "@/src/config"


export const Welcome: React.FC = () => {

    const navigation = useNavigation()
    const onPress =() => {
        const id = auth.currentUser.uid;
        navigation.navigate('ChatScreen', {id})
        //navigation.navigate('BottomTabNavigator', { screen: 'Main'});
        //console.log("auth? ", auth.currentUser.uid)
        //navigation.navigate("ChatScreen")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.boxContainer}>
                <Text style={styles.title}>Let's grap a blahblah</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.titleDescription}>
                    Select from a wide variety of interests that match your passions and preferences.
                    </Text>
                </View>    
                <View style={styles.buttonContainer}>      
                    <MainButton label = 'Continue' fontcolor = '#ffffff' bgcolor ='black' onPress={onPress} />
                </View>  
            </View>
        </SafeAreaView>
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
        //borderWidth: 1,
        //justifyContent: 'center',
      },
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
      buttonContainer: {
        flex: 1,
        padding: 2,
    }
})