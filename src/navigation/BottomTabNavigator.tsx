import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons, Ionicons, Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { View, StyleSheet } from 'react-native'
import { Main } from '../app/screens/main/Main'
import { SettingScreen} from '../app/screens/setting/SettingScreen'
import { ChatList } from '../app/screens/chat/ChatList'
import { NavigationContainer } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Tab = createBottomTabNavigator()

export const BottomTabNavigator = () => {
    return (
        <View style={styles.menuContainer}>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                let iconName;

                if (route.name === 'SettingScreen') {
                    iconName = 'person-circle-outline';
                } else if (route.name === 'Main') {
                    iconName = 'heart';
                } else if (route.name === 'ChatList') {
                    iconName = 'message-circle';
                }

                return (
                    <View style={styles.tabBarIcon}>
                        {iconName === 'heart' && (
                            <Feather name={iconName} size={30} color={color} />
                        )}
                        {iconName === 'message-circle' && (
                            <Feather name={iconName} size={30} color={color} />
                        )}
                        {iconName === 'person-circle-outline' && (
                            <Ionicons name={iconName} size={30} color={color} />
                        )}
                    </View>
                )
                },
                
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#252525', // Change background color of the tab bar
                    height: 75, // Adjust the height of the tab bar
                    paddingBottom: 8,
                    borderRadius: 50,
                    marginBottom: 20,
                    width: wp(95),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                tabBarShowLabel: false, // Hide labels for tabs
            })}
        >
            <Tab.Screen 
                name="Main" 
                component={Main} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false
                }}
            />
            <Tab.Screen 
                name="ChatList" 
                component={ChatList}
                options={{
                    headerShown: false,
                    //tabBarShowLabel: false
                }} 
            />
            <Tab.Screen 
                name="SettingScreen" 
                component={ SettingScreen} 
                options={{
                    headerShown: false,
                    //tabBarShowLabel: false
                }}
            />
        </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        backgroundColor: '#C995E0',
    },
    tabBarIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
