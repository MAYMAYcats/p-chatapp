import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from '../navigation/AppNavigator';
import { StyleSheet, View, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoadFonts from '../app/fonts'

export default function Index() {

  return (
    <LoadFonts>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style = "light" />
        <AppNavigator />
      </GestureHandlerRootView>
    </LoadFonts>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
