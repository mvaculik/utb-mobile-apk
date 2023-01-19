import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView, TextInput, Button } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { AsyncStorage, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';



function HomeScreen({navigation}) {

	const navig = useNavigation();
	
	const [user, setUser] = useState();
	const [data, setData] = useState([])


	useEffect(() => {
		getItem();
		const unsubscribe = navig.addListener('focus', getItem);
		return unsubscribe;
	}, []);



	async function getItem() {
		try {
			// Retrieve the current array from AsyncStorage
			const existingArray = await AsyncStorage.getItem('testovacka');
			let currentArray = existingArray ? JSON.parse(existingArray) : [];

			setData(currentArray);

			return data;

		} catch (error) {
			console.log(error);
		}
	}

	console.log(data);


  return (
	
		<View style={styles.content}>
		
					<TextInput
						style={styles.input}
						placeholder="Search user"
						placeholderTextColor='#f50'
						onChangeText={setUser}
						value={user}
						/>
					<TouchableOpacity 
						style={styles.btn}
						onPress={() => navigation.navigate('User', {paramKey : user})}
						><Text>Search</Text>
					</TouchableOpacity>

			<ScrollView>	

					<View style={styles.savedProfiles}>
						{data.map((item) => 
							<TouchableOpacity 
								style={styles.gameCard}
								onPress={() => navigation.navigate('User', {paramKey : item})}
							>
								<Text
									style={styles.profileText}
								>{item} </Text>
							</TouchableOpacity>
						)}
					</View>
					
		</ScrollView>
					</View>
  )
}


export default HomeScreen



const styles = StyleSheet.create({
    input: {
		width: '100%',
        borderColor: '#f50',
        borderWidth: 1,
        padding: 15,
		color: '#f50'
    },

	content: {
		width: '100%',
		height: '100%',
		backgroundColor: '#161616',
		padding: 20,
		justifyContent: 'center',
	},

	savedProfiles: {
		width: '100%',
		backgroundColor: '#161616',
		justifyContent: 'center',
		marginTop: 50
	},

	gameCard: {
		width: '100%',
		backgroundColor: '#1f1f1f',
		padding: 20,
		marginBottom: 20,
	},

	profileText: {
		fontWeight: '500',
		fontSize: 16,
		color: '#fff',
		textTransform: 'none',
		textAlign: 'left' 
	},

	btn: {
		color: '#161616',
		fontSize: '18px',
		fontWeight: '700',
		letterSpacing: '1px',
		borderBottomColor: '#f50',
		borderbottomWidth: 2,
		marginBottom: 5,
		textTransform: 'uppercase',
		backgroundColor: '#f50',
		width: '100%',
		textAlign: 'center',
		padding: 15
	}
});