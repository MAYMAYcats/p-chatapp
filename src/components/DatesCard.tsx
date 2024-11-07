
// components/DatesCard.tsx
import React from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ChatScreen } from "../app/screens/chat/ChatScreen";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Picker } from 'emoji-mart';
//import { Link, router, useRouter } from "expo-router";



export interface DatesCardProps {
  fullName: string;
  about: string;
  profileImage: string;
  uid: string;
  interests: string[];
  description: string;
  fee:string;
  location:string;
}

const DatesCard: React.FC<DatesCardProps> = ({
    fullName,
    about,
    profileImage,
    uid,
    interests,
    description,
    fee,
    location,
  }) => {
  
  const navigation = useNavigation();
  //console.log("interests:", interests)

  return (
    <TouchableWithoutFeedback> 
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: profileImage }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.dashLine} />
        <View style={styles.roundedRect}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{fullName}</Text>
          </View>
          <View >
            <Text style={styles.descriptionText}>🖋️ {description}</Text>
          </View>
          <View >
            <Text style={styles.descriptionText}>💰 {fee}</Text>
          </View>
          <View >
            <Text style={styles.descriptionText}>📍 {location}</Text>
          </View>
          <View style={styles.interestContainer}>
            {interests.map((item, index) => (
              <Text key={index} style={styles.interestText}>
                {item}
              </Text>
            ))}
          </View>
        </View>



        <View style={styles.heart}>
          <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { id: uid })}>
            <FontAwesome name="heart" size={35} color="#C995E0" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>

  );
};   
      {/*
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
      />
      */}


const styles = StyleSheet.create({
  container: {
    flex:1,
    //backgroundColor: 'orange',
    //width: wp(90),
    //height: hp(100),
    //borderRadius: 24,
  },
  imageContainer:{
    backgroundColor: '#ffffff',
    width: wp(90),
    height: hp(54),
    borderRadius: 15,
  },
  image: {
    width: wp(80),//Dimensions.get("window").width * 0.8,
    height: hp(50), //Dimensions.get("window").height * 0.9,
    marginTop: 15,
    borderRadius: 15,
    alignSelf: 'center',
  },
  dashLine:{
    width: wp(85),
    height: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C995E0',
    //marginVertical: 10,
    alignSelf: 'center',
  },
  roundedRect: {
    width: wp(90), // Adjust width as needed
    height: hp(25), // Adjust height as needed
    backgroundColor: '#ffffff', // Adjust background color as needed
    borderRadius: 15, // Adjust border radius as needed
   },
   nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    marginTop: 7,
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  descriptionText: {
    color: "black",
    paddingLeft: 10,
    paddingVertical: 2,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    //height: hp(50),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    paddingLeft: 16,
    //justifyContent: "flex-start",
    //alignItems: "flex-start",
  },
  orgText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    marginRight: 8,
  },
  interestContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  interestText: {
    //backgroundColor: "#e0e0e0",
    //borderRadius: 15,
    //paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    fontSize: 14,
    color: "black",
  },
  heart: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C995E0',
  },
});

export default DatesCard;

//       <Link href={`/screens/chat/groupchat?id=${uid}`} asChild>

