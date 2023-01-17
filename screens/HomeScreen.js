import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';



function HomeScreen({navigation}) {

  return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate("User")}>
        <Text>Go to Users</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen