import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignScreen } from "../app/screens/auth/SignScreen";
import { NavigationContainer } from '@react-navigation/native';

import { Welcome } from "../app/screens/initialset/Welcome";
import { SignUp } from "../app/screens/auth/SignUp";

const Stack = createStackNavigator();


export default function SignStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
             name = "SignUp"
             component = {SignUp}
             options = {{headerShown: false}}
            />
            <Stack.Screen
             name = "SignScreen"
             component = {SignScreen}
             options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}