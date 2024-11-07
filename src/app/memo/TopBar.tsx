import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { router } from 'expo-router'

import CircleButton from '../../components/CircleButton'
import { Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons'
/*
const handlePress = (): void => {
    router.push('memo/edit')
}
*/

const TopBar = (): JSX.Element => {
    return(
        <View style={styles.container}>
            <FontAwesome5 name='fire' size = {40}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        flex: 1,
        backgroundColor: '#ffffff'
    }
})


export default TopBar