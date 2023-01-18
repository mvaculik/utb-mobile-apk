import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';


function HomeScreen({navigation}) {
    
  const [firstData, setFirstData] = useState([]);
  const [secondData, setSecondData] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let nickname = "kamijuny";
  let playerId = "0f14db6f-5fb8-4537-a771-49b7787e093b";

  const handlePress = async () => {
    setLoading(true);
    try {

		// get first data
        const responseFirstData = await fetch(`https://open.faceit.com/data/v4/players?nickname=${nickname}`, {
          method: 'GET',
          headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer e2a920ef-9c10-4b02-a02b-a62a4c8b6658',
          }
        });

		const fData = await responseFirstData.json();
			//console.log("fData => ", fData);
		setFirstData(fData);


		// get second data
		const responseSecondData = await fetch(`https://open.faceit.com/data/v4/players/${playerId}`, {
			method: "GET",
			headers: {
			  "accept": "application/json",
			  "Authorization": "Bearer e2a920ef-9c10-4b02-a02b-a62a4c8b6658"
			}
        });

		const sData = await responseSecondData.json();
        	console.log("sData => ", sData);
		setSecondData(sData);



    } catch (error) {
        setError(error);
    }
    setLoading(false);
	
  };




  return (
	<SafeAreaView style={styles.all}>
		<View>
				<Image source={{uri: secondData.cover_image }} style={styles.backgroundImg} />
						
				<Image source={{uri: firstData.avatar }} style={styles.profileImg} />
						
		</View>
		<View style={styles.topContent}>
					<Text style={styles.topContentText}>{firstData ? firstData.nickname : ''}</Text>
		</View>
		<View style={styles.content}>
			<ScrollView>
					<TouchableOpacity onPress={handlePress}>
						<Text>{loading ? 'Loading...' : 'GET DATA'}</Text>
						</TouchableOpacity>

					
							
					
					

					
			</ScrollView>
		</View>
	</SafeAreaView>
  )
}

export default HomeScreen



var styles = StyleSheet.create({

	all: {
		backgroundColor: '#181818'
	},

	backgroundImg: {
		width: 400,
		height: 200,
		resizeMode: 'cover', // or 'stretch'
		borderBottomWidth: 10,
    	borderBottomColor: '#a2c',
		opacity: '0.6'
	},

	profileImg: {
		width: 150,
		height: 150,
		resizeMode: 'cover', // or 'stretch'
		borderRadius: 75,
		overflow: 'hidden',
		alignSelf: 'center',
		position: 'absolute',
		zIndex: 100,
		top: 110,
		borderWidth: 2,
		borderColor: '#000',

	},
  
	topContent: {
		position: 'relative',
		zIndex: -1,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: 3,
    	borderTopColor: '#f50',
		backgroundColor: '#181818',
		height: 130
	},
  
	topContentText: {
		color: '#fff',
		fontSize: '22px',
		fontWeight: '500',
		paddingTop: 50,
	},

	content: {
		position: 'relative',
		zIndex: -1,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: 2,
    	borderTopColor: '#404040',
		backgroundColor: '#1f1f1f',
		height: '100%'
	}
  });