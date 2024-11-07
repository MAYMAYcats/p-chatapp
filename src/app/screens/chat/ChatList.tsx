/*  */
import { Redirect, router, Link } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator,  } from "react-native";
import Button from "@/src/components/Button";
import { StatusBar } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ChatItem from "./ChatItem";

import { useState } from "react";
import { useRouter } from "expo-router";
import { auth, db } from "@/src/config";

import { doc, getDoc, setDoc, getDocs, collection, addDoc, onSnapshot, Timestamp, orderBy, query, where } from 'firebase/firestore';
import { useLocalSearchParams } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListHeader from "@/src/components/ListHeader";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatListHeader from "@/src/components/ChatListHeader";
import Header from "@/src/components/Header";

export const ChatList: React.FC = () => {

    const router = useRouter();
    const [groups, setGroups] = useState<any[]>([]);
    const { id } = useLocalSearchParams(); // Retrieve the passed ID
    const [loading, setLoading] = useState(true); // State to manage loading indicator
  

    useEffect(() => {

        //console.log("id", id)
        const fetchGroupData = async () => {
            try {
                if (!auth.currentUser) {
                    console.error('User is not authenticated.');
                    return;
                }

                const groupsRef = collection(db, 'groups');
                const querySnapshot = await getDocs(groupsRef);

                let groupsData: any[] = [];

                for (const doc of querySnapshot.docs) {
                    const groupData = doc.data();
                    const groupId = doc.id;

                    //console.log("every groupId", groupId)

                    // Fetch messages for the current room
                    const messagesRef = collection(db, `groups/${groupId}/messages`);
                    const messagesSnapshot = await getDocs(messagesRef);
                    const roomMessages: any[] = [];

                    messagesSnapshot.forEach(messageDoc => {
                        roomMessages.push({
                            id: messageDoc.id,
                            ...messageDoc.data()
                        });
                    });

                    // Check if user ID exists in messages of the current room
                    const userParticipated = roomMessages.some(message => message.userId === auth.currentUser.uid);

                    //console.log("userParticipated", userParticipated)
                    if (userParticipated) {
                        groupsData.push({
                            id: groupId,
                            ...groupData,
                            rooms: [
                                ...(groupData.rooms || []),
                                {
                                    groupId,
                                    messages: roomMessages
                                }
                            ]
                        });
                        //break; // Break out of loop once found in this group
                    }
                    
                }

                setGroups(groupsData);
                setLoading(false); // Stop loading in case of error
                //console.log('Groups where user participated:', groupsData);
            } catch (error) {
                console.error('Error fetching group data:', error);
                setLoading(false); // Stop loading in case of error
            }
        };

        fetchGroupData();
    }, [id]);


    if (loading) {
        return (
            <View style={[styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#C995E0" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Chat List"} showLogout={false}/>
           {/* <ChatListHeader /> */}
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={groups}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <ChatItem router={router} item={item} index={index} />
                    )}
                />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loadingContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
         
    },
    container: {
        flex: 1,
        //backgroundColor: 'orange',
        //marginTop: 0,  
        position: 'absolute'
        //
    },
    testContainer:{
        
        paddingTop:0,
        //backgroundColor: 'red'
    },
    listContainer: {
        position: 'relative',
        width: wp(100),
 
    },
});