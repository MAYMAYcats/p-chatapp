// GroupChatHeader.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChatList } from '../app/screens/chat/ChatList';
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { BottomTabNavigator } from '../navigation/BottomTabNavigator';
import LoadFonts from '../app/fonts';

const ChatHeader = ({groupName, groupImage}) => {

  //console.log("groupImage? ", groupImage)

  const navigation = useNavigation()
  const handlePress = () => {
      console.log("Handle Pressed")
      try{
        //router.replace('/setting/profile');
        console.log('Navigating to GroupList');
        navigation.navigate('BottomTabNavigator', { screen: 'ChatList'});

        //navigation.navigate('ChatList')
        //router.push('./grouplist');
        console.log('Navigation executed');
      }catch(error){
        console.log(error);
      }
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Feather style={styles.backButton} name="chevron-left" />
      </TouchableOpacity>
      <View style={styles.groupInfo}>
        <Image source={{ uri: groupImage }} style={styles.groupImage} />
        <Text style={styles.groupName}>{groupName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF', // Example background color
    fontFamily: 'ABCMonumentGrotesk',
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
    color: '#333333', // Example color
  },
  groupInfo:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupImage:{
    width: 32,
    height: 32,
    borderRadius: 20,
    marginRight: 8,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black', // Example color
  },
});

export default ChatHeader;