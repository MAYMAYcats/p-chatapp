// Main Navigator 
import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
/* navigator */
//import { SignStackNavigator } from "./SignStackNavigator";

/* screens */
import { SignScreen } from "../app/screens/auth/SignScreen";
import { ProfileNameScreen } from "../app/screens/initialset/SetProfileName";
import ProcessBarNavigator from "./ProcessBarNavigator";
import { SetGroupDetail } from "../app/screens/initialset/SetGroupDetail";
import GroupDetailNavigator from "./GroupDetailNavigator";
import RoomStackNavigator from "./RoomStackNavigator";
import { ChatScreen } from "../app/screens/chat/ChatScreen";
import { Main } from "../app/screens/main/Main";
import { ChatList } from "../app/screens/chat/ChatList";
import DatesCard from "../components/DatesCard";
import ChatHeader from "../components/ChatHeader";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { SettingScreen } from "../app/screens/setting/SettingScreen";
import { SignUp } from "../app/screens/auth/SignUp";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native";
import { SetUserProfile } from "../app/screens/setting/SetUerProfile";
import { SetGroupProfile } from "../app/screens/setting/SetGroupProfile";


/* contexts */
const Stack = createStackNavigator();

export const AppNavigator = () => {
  const user = null;
  const navigation = useNavigation();

  
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SignScreen">
        <Stack.Screen name="SignScreen" component={SignScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="ProcessBarNavigator" component={ProcessBarNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="GroupDetailNavigator" component={GroupDetailNavigator} />
        <Stack.Screen
          name="SetGroupDetail"
          component={SetGroupDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="RoomStackNavigator" component={RoomStackNavigator}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="SettingScreen" component={SettingScreen}/>
        <Stack.Screen name="SetUserProfile" component={SetUserProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="SetGroupProfile" component={SetGroupProfile} options={{ headerShown: false }}/>
       
        <Stack.Screen name="ChatList" component={ChatList}/>
        <Stack.Screen name="DatesCard" component={DatesCard}/>
        <Stack.Screen name="ChatHeader" component={ChatHeader}/>
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  headerContainer:{
    backgroundColor: '#C995E0'
  },
  backButton: {
    //marginLeft: 16,
    //padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#007AFF", // Adjust color as needed
  },
});