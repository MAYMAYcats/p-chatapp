import React, { useEffect, useState } from "react"
import { FlatList, View, Text, Dimensions, SafeAreaView,
    TouchableOpacity, Image, StyleSheet, InteractionManagerStatic } from "react-native";
import Carousel from "react-native-snap-carousel";
import DatesCard from "@/src/components/DatesCard";
import { router, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { BellIcon } from "react-native-heroicons/outline";
const { width, height } = Dimensions.get("window");
import { StatusBar } from "expo-status-bar";
import { app, auth, db  } from "@/src/config";
import { doc, getDocs, getDoc, setDoc, collection, addDoc, onSnapshot, Timestamp, orderBy, query } from 'firebase/firestore';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const Main: React.FC = () => {
    const router = useRouter();
    const [groups, setGroups] = useState<any[]>([]); 
  
    // Fetch group information
    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                if (!auth.currentUser) {
                    console.error('User is not authenticated.');
                    return;
                }
                const querySnapshot = await getDocs(collection(db, 'groups'))
                const groupsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    fullName: doc.data().fullName,
                    about: doc.data().about,
                    profileImage: doc.data().profileImage,
                    interests:doc.data().interests || [],
                    description: doc.data().description,
                    fee: doc.data().fee,
                    location: doc.data().location,
                }))     
                setGroups(groupsData)
            } catch(error){
                console.error('Error fetching data: ', error)
            }
        }
        fetchGroupData();
    }, []);

    // Function to shuffle array randomly
    const shuffleArray = (array: any[]) => {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Carousel
                    
                    data={groups}
                    renderItem={({ item }) => (
                        <DatesCard 
                            fullName={item.fullName}
                            about={item.about}
                            profileImage={item.profileImage}
                            uid={item.id}
                            interests={item.interests}
                            description={item.description}
                            fee={item.fee}
                            location={item.location}
                        />
                    )}
                    firstItem={1}
                    inactiveSlideScale={0.86}
                    inactiveSlideOpacity={0.6}
                    sliderWidth={wp(100)}
                    sliderHeight={hp(100)}
                    itemWidth={wp(80)}
                    slideStyle={{ alignItems: "center" }}
                    itemHeight={hp(60)} // Adjust item height to fit your design
                    layout="tinder" // Stack layout for vertical swipe
                    loop={true} // Enable continuous looping
                    enableMomentum={true} // Enable momentum for smooth swiping
                    containerCustomStyle={styles.carouselContainer}
                    //autoplay // Enable autoplay
                    //autoplayInterval={3000} //
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#C995E0'
    },
    imageItem: {
      resizeMode: 'cover',
      marginVertical: 20
    },
    carouselContainer: {
        //backgroundColor: '#C995E0',
        //borderRadius: 10,
        padding: 0,
    },
    footer:{},
    footerText: {}
})