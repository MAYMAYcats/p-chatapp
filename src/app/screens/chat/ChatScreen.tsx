import React, { useState, useEffect, useRef, cloneElement, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, FlatList, SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, Timestamp, orderBy, query } from 'firebase/firestore';
import { auth, db, storage } from '@/src/config';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '@/src/components/CustomKeyboardView';
import { MessageList } from '@/src/components/MessageList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getRoomId } from '@/src/utils/commons';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '@/src/components/Button';
import { router } from 'expo-router';
import { useRouter } from 'expo-router';
import ChatHeader from '@/src/components/ChatHeader';
import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Header from '@/src/components/Header';

interface Message {
  userId: string;
  text: string;
  profileImage: string;
  senderName: string;
  createdAt: Timestamp;
}

export const ChatScreen: React.FC = () => {

  const navigation = useNavigation()
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [createdAt, setCreatedAt] = useState<string>(''); // State to hold createdAt value
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [thumbs, setThumbs] = useState('')

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const flatListRef = useRef<FlatList | null>(null);
  const textRef = useRef<string>('');
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef(null)

  const [userData, setUserData] = useState({
    profileImage: null,
    fullName: '',
    about: ''
  });

  const [groupData, setGroupData] = useState({
    profileImage: null,
    fullName: '',
    about: ''
  });


  useEffect(()=> {
    updateScrollView();
  },[])

  const updateScrollView = () => {
    setTimeout(()=> {
      scrollViewRef?.current?.scrollToEnd({animated: true})
    }, 100)
  }

  // Fetch group information
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User is not authenticated.');
          return;
        }
        const groupDocRef = doc(db, `groups/${id}`);
        const docSnap = await getDoc(groupDocRef)
        //console.log('ID of this chat:', id)

        if (docSnap.exists()) {
          const groupInfo = docSnap.data();
          if (groupInfo) {
            setGroupData({
              profileImage: groupInfo.profileImage || '',
              fullName: groupInfo.fullName || '',
              about: groupInfo.about || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };
    fetchGroupData();
  }, [id]);
  
  // Fetch current user's profile information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User is not authenticated.');
          return;
        }

        //console.log('Fetching my id? ', auth.currentUser.uid)
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData) {
            setUserData({
              profileImage: userData.profileImage || null,
              fullName: userData.fullName || '',
              about: userData.about || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  // Subscribe to message updates
  useEffect(() => {
    const unsubscribe = subscribeToMessages();
    return () => unsubscribe();
  }, [id]);
  
  const subscribeToMessages = () => {
    try {
      const userDocRef = doc(db, 'groups', id);
      const messageCollectionRef  = collection(userDocRef, 'messages');
      return onSnapshot(query(messageCollectionRef, orderBy('createdAt', 'asc')), (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(fetchedMessages);
      });
    } catch (error) {
      console.error('Error subscribing to messages:', error);
    }
  };
  
  
  const handleSendMessage = async () => {

    let message = newMessage.trim();
    if (!message) {
      console.error('No message');
      return;
    }

    try {
      if (!auth.currentUser) {
        console.error('User is not authenticated.');
        return;
      }

      const uid = auth.currentUser.uid;
      const userDocRef = doc(db, 'groups', id);
      const messageCollectionRef = collection(userDocRef, 'messages');
      textRef.current=""
      if(inputRef) inputRef?.current?.clear()

      const newDoc = await addDoc(messageCollectionRef, {
        userId: uid,
        text: message,
        profileImage: userData.profileImage,
        senderName: userData.fullName,
        createdAt: Timestamp.fromDate(new Date())
      });

      setNewMessage('');
      if (inputRef.current) {
        inputRef.current.clear();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      //Alert.alert('Message', message);
    }
  };

  /*  Image   */
  const pickImage = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync()
    if (granted) {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing:true,
        aspect: [4,3],
        quality: 1,

      }).then((result) => {
        if(!result.canceled){
          uploadImageToStorage(result);
        }else{
          alert('canceled')
        }
      })
    }
  }

  // Upload image to Firebase Storage
  const uploadImageToStorage = async (result: any) => {
    const uid = auth.currentUser?.uid;
    let roomId = getRoomId(id);

    try {
      //console.log("roomId?", roomId)
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      //console.log("blob", blob)

      const imageName = result.assets[0].fileName;
      const Path = `groups/${roomId}/images`
      //console.log("Path", Path)
      const storageRef = ref(storage, `groups/${id}/messages`);
      await uploadBytesResumable(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      console.log("Image uploaded to:", downloadURL)
      await sendMessageWithImage(downloadURL);
      
      //return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Send message with image URL
  const sendMessageWithImage = async (imageUrl: string) => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        console.error('User is not authenticated.');
        return;
      }
      //console.log("id? ", id, "uid?", uid)
      const roomId = getRoomId(id);
      const userDocRef = doc(db, 'groups', id);
      const messageCollectionRef = collection(userDocRef, 'messages');

      await addDoc(messageCollectionRef, {
        userId: uid,
        text: '', // Optionally include text or leave empty
        profileImage: userData.profileImage,
        senderName: userData.fullName,
        createdAt: Timestamp.fromDate(new Date()),
        imageUrl: imageUrl // Add imageUrl to the message data
      });
    } catch (error) {
      console.error('Error sending message with image:', error);
      Alert.alert('Error', 'Failed to send message with image.');
    }
  }



  return (
    <SafeAreaView style={styles.container}>

      <ChatHeader groupName={groupData.fullName} groupImage={groupData.profileImage} />


    
      <KeyboardAvoidingView style={styles.boardContainer} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios'? 50:0 }>
{/* Chat Messages */}
        <View style={styles.chatMessage}>
          <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={auth.currentUser}/>
        </View>
{/* Bottom input */}
        <View style={styles.inputContainer}>
          <View style={styles.SendContainer}>
            <TextInput
              ref={inputRef}
              onChangeText={(value) => { setNewMessage(value); }}
              style={styles.messageInput}
              placeholder="Type message"
              value={newMessage}
              autoFocus={true}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={pickImage}>
              <Feather name="paperclip" size={hp(2.7)} color="#C995E0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage} disabled={newMessage ===''}>
              <Feather name="send" size={hp(2.7)} color="#C995E0" />
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
    //backgroundColor: 'rgba(201, 149, 224, 0.3)'
  },
  boardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    //backgroundColor: 'yellow',
    //padding: 1,
    //marginTop: 3
  },
  chatMessage:{
    flex:1,
    //flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(201, 149, 224, 0.3)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 10,
    //marginBottom: 20
  },
  chatBox: {
    flex: 1,
    justifyContent: 'flex-end'
    //justifyContent: 'space-between'
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    //width: 343,
    //paddingVertical: hp(1),
    //marginBottom: hp(1),
    //justifyContent: 'center'
  },
  SendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 2,
    borderRadius: 20,
    margin: 5,
    width: 343,
    //marginHorizontal: 10,
    //marginBottom: 10,
  },
  messageInput: {
    fontSize: hp(2),
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    //margin: 10

  },
  sendBtn: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    marginRight: 5,
    borderRadius: 50
  }
});
  
 