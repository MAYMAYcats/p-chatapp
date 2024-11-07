import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import LoadFonts from '../app/fonts'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface Props{
    label: string
    bgcolor: string
    fontcolor: string
    onPress?: () => void
}

const MainButton =(props: Props): JSX.Element => {
    const { label, onPress, bgcolor, fontcolor } = props
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: bgcolor}]}>
                <Text style={[styles.buttonLabel, {color: fontcolor}]}>{label}</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',

    },
    button: {
        borderRadius: 70,
        alignSelf: 'center',
        justifyContent: 'center', // center button content vertically
        marginBottom: 24,
        width: wp(85),
        height: 56
    },
    buttonLabel: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 16,
        lineHeight: 32,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 70,
        fontFamily: 'ABCMonumentGrotesk',
        fontWeight: '900'
    }
})

export default MainButton