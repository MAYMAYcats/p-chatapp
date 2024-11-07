import { View, Text, KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from  'react-native'
import React from 'react'

const ios = Platform.OS == 'ios';
const CustomKeyboardView = ({children, inChat})=> {
    let kavConfig = {};
    let scrollViewConfig = {};

    if(inChat){
        kavConfig = {keyboardVerticalOffset: 60};
        scrollViewConfig = {contentContainerStyle: {flex: 1}}
    }

    return(
        <KeyboardAvoidingView
            behavior={ios? 'padding': 'height'}
            style={styles.container}
            {...kavConfig}
        >
        <ScrollView
            style={styles.scrollView}
            bounces={false}
            showsVerticalScrollIndicator={false}
            {...scrollViewConfig}
        >
            {children}

            </ScrollView>
        </KeyboardAvoidingView>
    ) 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
  });

export default CustomKeyboardView