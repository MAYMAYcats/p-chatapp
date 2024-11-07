import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image'
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { ChatScreen } from './ChatScreen';
import { auth, db } from '@/src/config';
import { useEffect } from 'react';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, Timestamp, orderBy, query } from 'firebase/firestore';
import { useState } from 'react';
import formatDate from '@/src/components/FormatDate';

interface ChatItemProps {
    item: {
        id:string;
        rooms:{
            roomId: string;
            message: any[]
        }
    }
    router: any;
    index: number;
}


const ChatItem: React.FC<ChatItemProps> = ({ router, item, index }) => {
    const navigation = useNavigation();
    const [lastMessage, setLastMessage ] = useState(undefined)
    const openChatRoom = () =>{
        console.log('item id:', item.id)
        navigation.navigate('ChatScreen', { id: item.id })
        //router.push({pathname: '/screens/chat/ChatScreen', params:{id: item.id}})
    }


    // Subscribe to message updates
    useEffect(() => {
        const unsubscribe = subscribeToMessages();
        return () => unsubscribe();
    }, []);
    
    const subscribeToMessages = () => {
        try {
        const userDocRef = doc(db, 'groups', item.id);
        const messageCollectionRef  = collection(userDocRef, 'messages');
        return onSnapshot(query(messageCollectionRef, orderBy('createdAt', 'desc')), (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => doc.data());
            setLastMessage(fetchedMessages[0]? fetchedMessages[0]:null);
        });
        } catch (error) {
        console.error('Error subscribing to messages:', error);
        }
    };

    const renderTime = () => {
        if(lastMessage){
            let date = lastMessage?.createdAt;
            return formatDate(date)
            //return 'Time'//date.toDate()//formatDate(new Date(date?.seconds * 1000))
            
        }
    }

    const formatDate1 = (timestamp: { seconds: number, nanoseconds: number }): string => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        const day: number = date.getDate();
        const monthNames: string[] = ["January", "February", "March", "April", "May", "June", 
                                      "July", "August", "September", "October", "November", "December"];
        const month: string = monthNames[date.getMonth()];
        const formattedDate: string = `${day} ${month}`;
        return formattedDate;
    };
    

    const renderLastMessage = () => {
        if(typeof lastMessage == 'undefined') return 'Loading...'
        if(lastMessage){
            if(auth.currentUser?.uid == lastMessage?.userId)
                return "You: " + lastMessage?.text;
            return lastMessage?.text;
        }else{
            return 'Say Hi!'
        }
    }
    return (
        <View style={styles.chatItemContainer}>
            <TouchableOpacity onPress={openChatRoom} style={styles.chatItemBox}>

                <Image source={item?.profileImage} style={styles.image}/>
                
                
                <View style={styles.chatTitle}>
                    <View style={styles.nameTime}>
                        <Text style={styles.groupName}>{item?.fullName}</Text>
                        <Text style={styles.time}>
                            {renderTime()}
                        </Text>
                    </View>
                    <Text style={styles.lastMessage}>
                        {renderLastMessage()}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    chatItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        //backgroundColor: 'yellow'
    },
    chatItemBox: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatTitle: {
        marginLeft: 7,
        flex: 1,
    },
    nameTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    groupName: {
        fontWeight: '800',
    },
    time: {
        //alignSelf: 'flex-end', // Changed from 'flex-start' to 'flex-end'
    },
    lastMessage: {

    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    }
});

export default ChatItem;