import { Redirect, router,  } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { FlatList, ScrollView, Text, View } from "react-native";
import MessageItem from "./MessageItem";
import LoadFonts from "../app/fonts";
import { Timestamp } from "firebase/firestore";


// Define the types for the props
interface Message {
  userId: string;
  text: string;
  profileImage: string;
  senderName: string;
  createdAt: Timestamp;
  imageUri?: string;
}

interface MessageListProps {
  messages: Message[];
  currentUser: {
  userId: string;
  };
}


export const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {

  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to the end of ScrollView whenever messages change
/*
  useLayoutEffect(() => {//useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
*/

  useLayoutEffect(() => {
    // Ensure the effect runs after initial render and when messages change
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100); // Adjust delay as needed

    return () => clearTimeout(timer); // Cleanup
  }, [messages]);

  //console.log('Current user in MessageList', messages)

    return(

    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10,  paddingBottom: 10}}
    >

      {messages.map((messages, index) => (         
        <MessageItem message={messages} key={index} currentUser={currentUser} createdAt={messages.createdAt}/>
      ))}

    </ScrollView>
    )

}


