import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { useState, useEffect } from 'react';


function HomeScreen({navigation}) {
    
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let nickname = "kamijuny";

  const handlePress = async () => {
    setLoading(true);
    try {
        const response = await fetch(`https://open.faceit.com/data/v4/players?nickname=${nickname}`, {
          method: 'GET',
          headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer e2a920ef-9c10-4b02-a02b-a62a4c8b6658',
          }
        });
        const data = await response.json();
        console.log(data);
        setData(data);
    } catch (error) {
        setError(error);
    }
    setLoading(false);
  };




  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={handlePress}>
              <Text>{loading ? 'Loading...' : 'GET DATA'}</Text>
            </TouchableOpacity>

            <View style={{ flex: 0.7, alignItems: 'left', justifyContent: 'center' }}>
              
                 
                      <Text></Text>
                      <Text>{data  ? data.nickname : ''}</Text>
                      <Image source={{ uri: data.avatar }} style={{ width: 50, height: 50 }} />
                      <Text></Text>
                
          
            </View>
    </View>
  )
}

export default HomeScreen