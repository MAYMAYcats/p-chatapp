import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface HeaderProps {
    title: string;
    onLogout?: () => void;
    showLogout?: boolean;
  }
  
  const Header: React.FC<HeaderProps> = ({ title, onLogout, showLogout}) => {
    
    if(showLogout){
      return (
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.headerRight}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }else{
      return (
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        </View>
      );  
    }



  };
  

const styles = StyleSheet.create({
  header: {
      backgroundColor: '#ffffff',//'#C995E0',
      height: 42,
      justifyContent: 'center',
      

  },
  headerInner: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C995E0',
    marginLeft: 15,
  },
  logoutButton:{
    justifyContent: 'flex-end',
    marginRight: 15,

  },
  headerRight: {
    color: 'grey'
  },

})

export default Header