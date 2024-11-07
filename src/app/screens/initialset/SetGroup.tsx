import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { StyleSheet, SafeAreaView, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import MainButton from "@/src/components/MainButton"
import LoadFonts from '../../fonts'

export const SetGroup: React.FC = () => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('SetGroupDetail');
    }
    const SkipPress = () => {
        //navigation.navigate('Welcome');
        navigation.navigate('BottomTabNavigator', { screen: 'Main'});
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.boxContainer}>
                <Text style={styles.title}>Create Your Group on Rooms</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.titleDescription}>
                    Select interests that match your passions and preferences.
                    </Text>
                </View>
                <View style={styles.imageBox}>
                    <View style={styles.rotatedRectangle}></View>
                </View>
                <View style={styles.btnContainer}>
                    <View style={styles.continueBtn}>
                        <MainButton label = 'Create Your Group' fontcolor = '#ffffff' bgcolor ='black' onPress={onPress} />
                    </View>
                    <View style={styles.skipBtn}>
                        <MainButton label = 'Skip' fontcolor = '#8697AC' bgcolor ='#ffffff' onPress={SkipPress} />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#C995E0',
        flexDirection: 'column'
    },
    boxContainer: {
        margin: 20,
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
      imageBox:{
        height :300,
        //borderWidth: 1,
        //justifyContent: 'flex-end',
        top: 220,
        alignItems: 'center',
      },
    rotatedRectangle: {
        width: 320, // Adjust width as needed
        height: 1, // Adjust height as needed
        backgroundColor: 'black', // Rectangle color
        transform: [
        { rotate: '165.22deg' }, // Adjust angle for rotation
        ],

    },
    btnContainer:{
        flexDirection: 'column',
        flex:1,
        marginTop: 30
    },
    continueBtn:{
        marginTop: 0,
    },
    skipBtn:{
        marginTop: 70,
    },
})