import {
    FlatList,
    Image,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { ListingType } from "../app/types/listingType";
  import Colors from "@/constants/Colors";
  import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
  import { Link } from "expo-router";
  
  type Props = {
    listings: any[];
    category: string;
  };
  
  const Listings = ({ listings, category }: Props) => {
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      console.log('Update Listing');
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false)
      }, 200);
    }, [category]);
  
    const renderItems: ListRenderItem<ListingType> = ({ item }) => {
      return (
        <Link href={`/listing/${item.id}`} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.thumbsup}>
                <FontAwesome
                  name="thumbs-up"
                  size={20}
                  color="000000"
                />
              </View>
              <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
              <View
                style={{ flexDirection: "row" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome5
                    name="map-marker-alt"
                    size={18}
                    color={Colors.primaryColor}
                  />
                  <Text style={styles.itemLocationTxt}>{item.location}</Text>
                </View>  
              </View>
              <Text style={styles.itemPriceTxt}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      );
    };
  
    return (
      <View>
        <FlatList
          data={loading ? [] : listings}
          renderItem={renderItems}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };
  
  export default Listings;
  
  const styles = StyleSheet.create({
    item: {
      backgroundColor: 'lightgrey',
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      marginRight: 20,
      width: 350,
    },
    image: {
      width: 300,
      height: 360,
      borderRadius: 10,
      marginBottom: 30,
    },
    thumbsup: {
      position: "absolute",
      top: 400,
      right: 30,
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: Colors.white,
    },
    itemTxt: {
      fontSize: 16,
      fontWeight: "600",
      color: Colors.black,
      marginBottom: 10,
    },
    itemLocationTxt: {
      fontSize: 12,
      marginLeft: 5,
    },
    itemPriceTxt: {
      fontSize: 12,
      fontWeight: "600",
      color: Colors.primaryColor,
    },
  });