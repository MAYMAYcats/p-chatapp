import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Link } from 'expo-router'
import { type Memo } from '../types/memos'
import { FontAwesome, Feather } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


interface Props {
    memo: Memo
}

const GroupListItem = (props: Props): JSX.Element => {
    const { memo } = props
    const { bodyText } = memo
    //const userphoto = require('../../assets/images/group1.jpg')
    if(bodyText === null) {return null}
    return(
        <Link href='/chat/groupchat' asChild>
            <TouchableOpacity style={styles.groupContainer}>
                <View>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/group1.jpg')} />
                </View>
                <View style={styles.groupListContainer}>
                    <View>
                        <Text numberofLines={1} style={styles.groupTitle}>{bodyText}</Text>
                        <Text style={styles.lastMessage}>
                            Last Message
                        </Text>
                    </View>
                    <Text style={styles.groupDate}>2023/10/1</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}


const styles = StyleSheet.create({
    groupContainer: {
        flex:1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)'
    },
    image:{
        backgroundColor: '#ffffff',
        height: hp(6),
        aspectRatio: 1,
        borderRadius: 50,
    },
    groupListContainer: {
        marginLeft: 10,
        flex:1,
        gap: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupTitle: {
        fontSize: hp(1.8),
        fontWeight: 'bold',
        lineHeight: 32,
    },
    groupDate: {
        fontSize: hp(1.6),
        lineHeight: 16,
        color: '#848484'
    },
    lastMessage:{
        //flex:1,
        fontSize: hp(1.6),
        color: 'grey'
    }
})

export default GroupListItem