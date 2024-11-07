import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


interface MessageItemProps {
  message: {
    userId: string;
    text: string;
    profileImage: string;
    senderName: string;
    createdAt: string;
    imageUri?: string
  };
  currentUser: {
    uid: string;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({message, currentUser})=>  {
   const createdAt = message.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  if(currentUser?.uid === message?.userId){
    //console.log("my profile", message.profileImage)
    return (
        <View style={styles.mychatContainer}>
          <View style={styles.mychatBackground}>
            <Text style={styles.timeLine}> { createdAt } </Text>
            <View style={styles.mychatMsg}>
              {message.imageUrl ? (
                <Image source={{ uri: message.imageUrl }} style={styles.image} />
              ) : (
                <Text style={styles.mychatText}>{message?.text}</Text>
              )}
            </View>
          </View>
        </View>
      )
    }else{
      return (
        <View style={styles.yourchatContainer}>
          <View style={styles.yourchatBackground}>
          <Image source={{uri:message.profileImage}} style={styles.userImage}/>
            <View style={styles.yourchatMsg}>
            {message.imageUrl ? (
              <Image source={{ uri: message.imageUrl }} style={styles.image} />
            ) : (
              <>
              <Text style={styles.yourchatText}> {message?.text} </Text>
              <Text style={styles.senderName}>{message.senderName}</Text>
              </>
            )}
            </View>
          </View>
        </View>
    )
    }
}

const styles = StyleSheet.create({
  mychatContainer: {
    //flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 3,
    marginRight: 3,
    alignItems: 'flex-end'
  },
  mychatBackground:{
    flexDirection: 'row',
    /*
    
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'flex-start',
    maxHeight: 400,
    backgroundColor: 'yellow'
    //height: 44
    */
  },
  timeLine:{
    //position: 'absolute',
    //marginLeft: 8,
    verticalAlign: 'bottom',
    fontSize: 12,
    color: 'grey',
    //backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    //flex:1,
  },
  yourtimeLine:{
    verticalAlign: 'bottom',
    fontSize: 12,
    color: 'grey',
    //backgroundColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //flex:1,
  },
  mychatMsg: {
    flexDirection: 'row',
    padding: 12,
    minHeight: 44,
    maxHeight: 400,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  mychatText:{
    color: '#C995E0',
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
    flexWrap: 'wrap'
  },
  yourchatContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 3,
    marginLeft: 3,
    //backgroundColor: 'yellow'
  },
  yourchatBackground:{
    flexDirection: 'row',
    //alignItems: 'flex-start',
    //height: 44,
    //flexDirection: 'row',
    //width: wp(80),
    //backgroundColor: 'purple'
  },
  userImage:{
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    marginLeft: 8
  },
  yourchatMsg: {
    flexDirection: 'row',
    padding: 12,
    minHeight: 44,
    maxHeight: 400,
    borderRadius: 5,
    backgroundColor: '#C995E0',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    flexShrink: 1,

  },
  senderName:{
    color: '#F5ECE6',
    fontWeight: '800'
  },
  yourchatText:{
    color: '#F5ECE6',
    fontSize: hp(2)
  },
  image: {
    width: 100, // Adjust dimensions as per your UI requirement
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default MessageItem;

