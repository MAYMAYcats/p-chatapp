import { View, Text, TextInput, StyleSheet } from 'react-native'

import Header from '../../components/Header'
import CircleButton from '@/src/components/CircleButton'

const Edit = (): JSX.Element => {
    return(
        <View style={styles.container}>
            <Header />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}value='Shopping List'/>
            </View>
            <CircleButton>
                <Text> Create </Text>
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'blue'
    },
    inputContainer:{
        paddingVertical: 32,
        paddingHorizontal: 27,
        
    },
    input:{

    }
})

export default Edit