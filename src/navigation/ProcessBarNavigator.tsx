// src/navigation/ProcessBarNavigator.tsx
import React from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';

import { ProfileNameScreen } from '../app/screens/initialset/SetProfileName';
import { SetProfilePhoto } from '../app/screens/initialset/SetProfilePhoto';
import { SetProfileInterest } from '../app/screens/initialset/SetProfileInterest';
import { SetGroup } from '../app/screens/initialset/SetGroup';
import { Welcome } from '../app/screens/initialset/Welcome';
import { createStackNavigator } from '@react-navigation/stack';
import RoomStackNavigator from './RoomStackNavigator';
import GroupDetailNavigator from './GroupDetailNavigator';

import Header from '../components/Header';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const CustomIndicator = ({ focused }: { focused: boolean }) => (
  <View style={{
    height: 4,
    backgroundColor: focused ? 'black' : 'white' // Selected and inactive colors
  }} />
);


const tabBarOptions: MaterialTopTabNavigationOptions = {
  tabBarLabel: () => null,
  tabBarIcon: () => null,
  tabBarStyle: {
    display: 'flex', 
    backgroundColor: '#C995E0' // Header Color
  },
  tabBarIndicatorStyle:{
    backgroundColor: 'black',
    height: 4,
  },
  tabBarActiveTintColor: 'black', // Example color, adjust as needed
  tabBarInactiveTintColor: 'red', // Example color, adjust as needed

};

const MainScreens = () => (
  <Tab.Navigator screenOptions={tabBarOptions}>
    <Tab.Screen name="SetProfileName" component={ProfileNameScreen} />
    <Tab.Screen name="SetProfilePhoto" component={SetProfilePhoto} />
    <Tab.Screen name="SetProfileInterest" component={SetProfileInterest} />
    <Tab.Screen name="SetGroup" component={SetGroup} />
    <Tab.Screen name="Welcome" component={Welcome} />
  </Tab.Navigator>
);

const SetProfileNameScreen= () => (
  <View style={{ flex: 1 }}>
    <Header title="Set Profile Name" onLogout={handleLogout} />
    <ProfileNameScreen />
  </View>
);

const handleLogout = () => {
  // Implement your logout logic here
  console.log('Logout logic');
  // Example: navigate to the login screen or clear user session
};

export default function ProcessBarNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreens" component={MainScreens} />
      <Stack.Screen name="GroupDetailNavigator" component={GroupDetailNavigator} />
      <Stack.Screen name="RoomStackNavigator" component={RoomStackNavigator} />
    </Stack.Navigator>
  );
}
