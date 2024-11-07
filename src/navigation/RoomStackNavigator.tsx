import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignScreen } from "../app/screens/auth/SignScreen";
import { NavigationContainer } from '@react-navigation/native';

import { Welcome } from "../app/screens/initialset/Welcome";
import { ChatScreen } from "../app/screens/chat/ChatScreen";
import { ChatList } from "../app/screens/chat/ChatList";
import { SetGroup } from "../app/screens/initialset/SetGroup";

const Stack = createStackNavigator();


export default function RoomStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
             name = "Welcome"
             component = {Welcome}
             options = {{headerShown: false}}
            />
            <Stack.Screen
             name = "ChatScreen"
             component = {ChatScreen}
             options = {{headerShown: false}}
            />
            <Stack.Screen
             name = "ChatList"
             component = {ChatList}
             options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}