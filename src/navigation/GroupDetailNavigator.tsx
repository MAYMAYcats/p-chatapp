import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProcessBarNavigator from './ProcessBarNavigator'; // Assuming ProcessBarNavigator is defined elsewhere
import { SetGroup } from '../app/screens/initialset/SetGroup';
import { SetGroupDetail } from '../app/screens/initialset/SetGroupDetail';
import { Main } from '../app/screens/main/Main';
import { ChatScreen } from '../app/screens/chat/ChatScreen';
import ChatHeader from '../components/ChatHeader';
import { ChatList } from '../app/screens/chat/ChatList';
const Stack = createStackNavigator();

export default function GroupDetailNavigator () {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="SetGroup"
          component={SetGroup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetGroupDetail"
          component={SetGroupDetail}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
  );
};


        /*
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatHeader"
          component={ChatHeader}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false }}
        />
        */