import {MenuOption} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet } from 'react-native';

interface MenuItemProps {
    text: string;
    action: (value: any) => void;
    value: any;
  }

  
export const MenuItem = ({text, action, value, icon})=>{
//export const MenuItem = ()=>{
    return(
        <MenuOption onSelect={()=> action(value)}>
            <View style={styles.menuItem}>
                <Text style={styles.menuText}>{text}</Text>
                {icon}
            </View>

        </MenuOption>
    )
}

const styles = StyleSheet.create({
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: hp(1), // Example of using responsive height
      paddingHorizontal: hp(2), // Example of using responsive height
    },
    menuText:{
        fontSize: hp(1.8),
        color: "#737373",
    }
  });
  