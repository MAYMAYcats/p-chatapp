import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View } from "react-native";

const GroupProfile = (): JSX.Element => {
  return (
    <View>
        <Text>
          GroupProfile page
        </Text>
    </View>
  )
}

export default GroupProfile