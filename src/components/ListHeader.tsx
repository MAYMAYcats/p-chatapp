import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChatList } from '../app/screens/chat/ChatList';
import { AntDesign, Feather } from '@expo/vector-icons';
import LoadFonts from '../app/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { auth, db, storage } from '@/src/config'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { Blurhash } from 'react-native-blurhash';
import Animated, { Easing } from 'react-native-reanimated';
import {MenuProvider} from 'react-native-popup-menu'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MenuItem } from "./CustomMenuItems";
import { SignScreen } from "../app/screens/auth/SignScreen";

const ios = Platform.OS = 'ios'
const ListHeader = () => {

    const {top} = useSafeAreaInsets()
    const navigation = useNavigation()
    const [image, setImage] = useState('');
    const [loading, setLoading] = React.useState<boolean>(true);


    const handleProfile = () => {
    }
  
    const handleLogout = async () => {
      try {
          await auth.signOut();
          // Navigate to login screen or any other appropriate screen after sign-out
          navigation.navigate('SignScreen'); // Replace 'Login' with your actual login screen route
      } catch (error) {
          console.error('Error signing out:', error);
      }
  };
  

    // Function to fetch existing profile image and set it in state on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                if (!auth.currentUser) {
                    console.error('User is not authenticated.');
                    return;
                }
                const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
                const docSnap = await getDoc(userDocRef);
                
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                
                    if (userData) {
                        if (userData.profileImage) {
                            setImage(userData.profileImage);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };
        fetchProfileData(); // Call the function on component mount
    }, []);

  return (
    <MenuProvider>
    <View style={[styles.container, {paddingTop: 10 }]}>
        <View>
            <Text style={styles.title}>Chat List</Text>
        </View>
        <View style={styles.photoContainer}>
          <Menu>
            <MenuTrigger customStyles={{
              triggerWrapper: {
              }
            }}>
              {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                      ) : (
                        <MaterialIcons name="person" size={hp(3)} color="#ccc" style={styles.personIcon}/>
              )}
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer:{
                  borderRadius: 10,
                  borderCurve: 'continuous',
                  marginTop: -20,
                  marginLeft: -20,
                  backgroundColor: 'white',
                  shadowOpacity: 0.2,
                  shadowOffset: {width: 0, height: 0},
                  width: 160
                }
              }}
            >
              <MenuItem 
                text="profile"
                action={handleProfile}
                value={null}
                icon={<Feather name="user" size={hp(2)} color="#737373" />}
              />
              <View style={styles.line}/>
              <MenuItem 
                text="Sign Out"
                action={handleLogout}
                value={null}
                icon={<AntDesign name="logout" size={hp(2)} color="#737373" />}
              />
            </MenuOptions>
          </Menu>
        </View>
    </View>
    </MenuProvider>
  );
};



const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#C995E0', // Example background color
    fontFamily: 'ABCMonumentGrotesk',
    borderBottomLeftRadius : 15,
    borderBottomRightRadius: 15,

  },
  title:{
    fontSize: hp(2.5),
    color: '#ffffff'
  },
  image: {
    width: hp(4.3),
    aspectRatio: 1,
    borderRadius: 100, // half of width and height
    borderWidth: 1,
    borderColor: 'white'
  },
  line:{
    borderBottomWidth: 0.6,
    borderBottomColor: 'grey',
    marginVertical: 0
  },
    photoContainer:{},
    backButton: {
      fontSize: 24,
      marginRight: 16,
      color: '#333333', // Example color
    },
    personIcon:{
          
    },
});

export default ListHeader;