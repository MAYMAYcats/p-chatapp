import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

interface Props{
    label: string
    onPress?: () => void
}

const ContinueBtn =(props: Props): JSX.Element => {
    const { label, onPress } = props
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    button: {
        height: 56,
        width : 319,
        backgroundColor: '#e9446a',
        borderRadius: 30,
        alignSelf: 'center',
        marginBottom: 24
    },
    buttonLabel: {
        fontSize: 16,
        lineHeight: 56,
        color: '#ffffff',
        //paddingVertical: 8,
        //paddingHorizontal: 24,
        alignSelf: 'center'
    }
})

export default ContinueBtn