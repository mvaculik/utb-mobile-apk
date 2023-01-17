import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

function UserScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserScreen