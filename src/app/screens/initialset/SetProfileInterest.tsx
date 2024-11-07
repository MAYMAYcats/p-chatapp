import React, { useState, useEffect } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { auth, db } from "@/src/config";
import MainButton from "@/src/components/MainButton";
import { useNavigation } from '@react-navigation/native';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import * as Font from 'expo-font';
import LoadFonts from '../../fonts'


const interestIcons: {[key: string]: any} = {
    'Music': require('../../../../assets/images/Music.png'),
    'Fashion': require('../../../../assets/images/Fashion.png'),
    'Games': require('../../../../assets/images/Games.png'),
    'Pet': require('../../../../assets/images/Pet.png'),
    'Travelling': require('../../../../assets/images/Travelling.png'),
    'Technology': require('../../../../assets/images/Technology.png'),
    'Beauty': require('../../../../assets/images/Beauty.png'),
    'Food': require('../../../../assets/images/Food.png'),
    'Comedy': require('../../../../assets/images/Comedy.png'),
    'Skincare': require('../../../../assets/images/Skincare.png'),
    'Wellness': require('../../../../assets/images/Wellness.png'),
    'Bag': require('../../../../assets/images/Bag.png'),
    'Accessories': require('../../../../assets/images/Accessories.png'),
    'Architecture': require('../../../../assets/images/Architecture.png'),
    'Art': require('../../../../assets/images/Art.png'),
    'Sport': require('../../../../assets/images/Sport.png'),
    'Film': require('../../../../assets/images/Film.png'),
    'Drama': require('../../../../assets/images/Drama.png'),

}


const interests = [
    'Music', 'Fashion', 'Games', 'Pet', 'Travelling', 'Technology', 'Beauty', 'Food', 
    'Comedy', 'Skincare', 'Wellness', 'Bag', 'Accessories', 'Architecture', ' Art',
    'Sport', 'Film', 'Drama'
];

export const SetProfileInterest: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      const ref = doc(db, `users/${auth.currentUser.uid}`);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && data.interests) {
          setSelectedInterests(data.interests);
        }
      }
    };

    fetchProfile();
  }, []);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const saveProfile = async () => {
    const ref = doc(db, `users/${auth.currentUser.uid}`);
    await setDoc(
      ref, 
      {
        interests: selectedInterests, 
      },
      { merge: true } // Ensure merge is true to preserve existing fields
    );
    navigation.navigate('SetGroup');
  };

  const handlePress =() => {
    navigation.navigate('SetGroup');
  }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <View style = {styles.boxContainer}>
        <Text style={styles.title}>Choose Topics of Interest</Text>
        <View style={styles.descriptionContainer}>
            <Text style={styles.titleDescription}>
              Select from a wide variety of interests that match your passions and preferences.
            </Text>
        </View>
        <View style={styles.interestContainer}>
          {interests.map((interest) => (
            <TouchableOpacity
                key={interest}
                onPress={() => toggleInterest(interest)}
                style={{ 
                  padding: 10,
                  //marginHorizontal: 8,
                  //marginBottom: 16,
                  backgroundColor: selectedInterests.includes(interest) ? '#252525' : 'transparent',
                  borderRadius: 100,
                  flexDirection: 'row',
                  borderWidth: 1,
                  height: 40,
                }}
            >
              <Image
                  source={interestIcons[interest]}
                  style={styles.interestImage} // Adjust size as needed
              />
              <Text style={{ color: 'white' }}>{interest}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.continueBtn}>
            <MainButton label="Continue" fontcolor='#ffffff' bgcolor='black' onPress={saveProfile} />
          </View>
          <View  style={styles.laterBtn}>
              <MainButton label = 'Set Up Later' fontcolor = '#8697AC' bgcolor ='#ffffff' onPress={handlePress}/>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C995E0'
  },
  boxContainer: {
    margin: 24,
    flex: 1,
    flexDirection: 'column'
    //justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: 'black',
    fontFamily: 'ABCMonumentGrotesk',
  },
  descriptionContainer: {
    marginTop: 16,
  },
  titleDescription:{
    color: '#ffffff'
  },
  interestContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    //borderWidth: 2,
    paddingVertical: 0,
    paddingHorizontal: 0,
    columnGap: 8,
    rowGap: 8,
  },
  interestBox:{

  },
  interestImage:{
    width: 20, 
    height: 20, 
    marginRight: 5
  },
  buttonStyle:{
    margin: 16,
  },
  btnContainer:{
    flexDirection: 'column',
    flex:1,
    marginTop: 30
  },
  continueBtn:{
      marginTop: 0,
  },
  laterBtn:{
      marginTop: 70,
  },
});
