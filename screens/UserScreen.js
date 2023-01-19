import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function UserScreen({navigation, route}) {
        
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [exist, setExist] = useState(false);

	let nickname = route.params.paramKey;
	const navig = useNavigation();
	//let playerId = "0f14db6f-5fb8-4537-a771-49b7787e093b";

	const getData = async () => {

		try {
	
			// get first data
			const response = await fetch(`https://open.faceit.com/data/v4/players?nickname=${nickname}`, {
			method: 'GET',
			headers: {
				'accept': 'application/json',
				'Authorization': 'Bearer e2a920ef-9c10-4b02-a02b-a62a4c8b6658',
			}
			});

			
				const json = await response.json();
				//console.log("GAMES => ", json);
				
				if(json.errors) {
					setError(nickname);
				} else if(json.data === null) {
					setError(nickname);
				} else {
					setData(json);
						
				}

			
		}catch (err) {
			setError(err.message);
		}
		
	};


	useEffect(() => {
		getData();
	}, []);


	if(error) {
		navigation.navigate('Error', {paramKey: error});
	}



async function addItem(key, value) {
	try {
        // Retrieve the current array from AsyncStorage
        const existingArray = await AsyncStorage.getItem(key);
        let currentArray = existingArray ? JSON.parse(existingArray) : [];
		
		if(!currentArray.includes(value)) {
			currentArray.push(value);
		}

        await AsyncStorage.setItem(key, JSON.stringify(currentArray));
		checkData();

    } catch (error) {
        console.log(error);
    }
}

async function checkData() {
	try {

        const existingArray = await AsyncStorage.getItem('testovacka');
        let currentArray = existingArray ? JSON.parse(existingArray) : [];

		console.log(currentArray)

		if(currentArray.includes(data.nickname) || currentArray.includes(nickname)) {
			setExist(true)
		} else {
			setExist(false);
		}

    } catch (error) {
        console.log(error);
    }
}

async function removeItem(item) {
	try {

		const arrayString = await AsyncStorage.getItem('testovacka');
		let array = JSON.parse(arrayString);
		
		const index = array.indexOf(item);
		console.log(index)
		array.splice(index, 1);
		
		await AsyncStorage.setItem('testovacka', JSON.stringify(array));
		checkData();

	} catch (error) {
        console.log(error);
    }
}

useEffect(() => {
	checkData();
	const unsubscribe = navig.addListener('focus', checkData);
	return unsubscribe;
}, []);



	

  return (
    <SafeAreaView style={styles.all}>
		<ScrollView contentContainerStyle={{ height:'auto', width:'100%'}}>
        <View>
			
            <Image source={data.cover_image ? {uri: data.cover_image } : require('../assets/defaultBackground.png')} style={styles.backgroundImg} />
                
            <Image source={data.avatar ? {uri: data.avatar } : require('../assets/defaultProfile.jpeg')} style={styles.profileImg} />
                
        </View>

        <View style={styles.topContent}>

            <Text style={styles.topContentText}>{data ? data.nickname : ''} <Text style={styles.country}>{data ? data.country : ''}</Text></Text>
			
			<Text 
			  	style={{
					fontSize: 16,
					color: '#fff',
					textTransform: 'uppercase', 
					marginBottom: 0, 
					marginTop: 15
				}}> {data.memberships ? data.memberships : "memberships"}
			</Text>
        </View>

		<View style={styles.steam}>
		<Text 
			  	style={{
					fontWeight: '500',
					fontSize: 18,
					color: '#f50',
					textTransform: 'uppercase', 
					marginBottom: 20, 
					marginTop: 0
				}}>
			Steam
			</Text>
			<Text 
			  	style={{
					fontSize: 14,
					color: '#fff',
					textTransform: 'uppercase', 
					marginBottom: 20, 
					marginTop: 0
				}}>{data.steam_nickname ? 'Nickname: ' : 'User not found'}
					<Text
						style={{
							fontWeight: '500',
							fontSize: 14,
							color: '#fff',
							textTransform: 'none', 
							marginBottom: 20, 
							marginTop: 0
						}}> {data.steam_nickname ? data.steam_nickname : null}
					</Text>
			</Text>

			<Text 
			  	style={{
					fontSize: 14,
					color: '#fff',
					textTransform: 'uppercase', 
					marginBottom: 20, 
					marginTop: 0
				}}>{data.steam_id_64 ? 'Steam ID' : null}
					<Text
						style={{
							fontWeight: '500',
							fontSize: 14,
							color: '#fff',
							textTransform: 'none', 
							marginBottom: 20, 
							marginTop: 0
						}}> {data.steam_id_64 ? data.steam_id_64 : null}
					</Text>
			</Text>

			<Text 
			  	style={{
					fontSize: 14,
					color: '#fff',
					textTransform: 'uppercase', 
					marginBottom: 20, 
					marginTop: 0
				}}>{data.new_steam_id ? 'Steam New Id:' : null}
					<Text
						style={{
							fontWeight: '500',
							fontSize: 14,
							color: '#fff',
							textTransform: 'none', 
							marginBottom: 20, 
							marginTop: 0
						}}> {data.new_steam_id ? data.new_steam_id : null}
					</Text>
			</Text>

			<Text 
			  	style={{
					fontSize: 14,
					color: '#fff',
					textTransform: 'uppercase', 
					marginBottom: 20, 
					marginTop: 0
				}}>{data.platforms ? 'steam:': null}
					<Text
						style={{
							fontWeight: '500',
							fontSize: 14,
							color: '#fff',
							textTransform: 'none', 
							marginBottom: 20, 
							marginTop: 0
						}}> {data.platforms ? data.platforms.steam : null}
					</Text>
			</Text>


		</View>


         
<View style={styles.content}>
		  	<Text style={styles.games}>Games</Text>

		  	{data.games ? Object.keys(data.games).map(game => (

                <View key={game} style={styles.gameCard}>
                    <Text style={{fontSize: 20, color: '#fff', textTransform: 'uppercase', marginBottom: 10}}>{game}</Text>
                    <Text 
						style={styles.game}
					>Nickname:
						<Text
							style={{
								fontWeight: '500',
								color: '#fff',
								textTransform: 'none', 
								marginBottom: 20, 
								marginTop: 0
							}}> {data.games[game].game_player_name}
						</Text>
					</Text>
					<Text 
						style={styles.game}
					>Region:
						<Text
						style={{
							fontWeight: '500',
							color: '#fff',
							textTransform: 'none', 
							marginBottom: 20, 
							marginTop: 0
						}}> {data.games[game].region}
						</Text> 
					</Text>

					<Text
						style={styles.game}
					>Faceit Elo: 
					<Text
						style={{
							fontWeight: '500',
							color: '#fff',
							textTransform: 'none', 
							marginBottom: 20, 
							marginTop: 0
						}}> {data.games[game].faceit_elo}	
						</Text>
					</Text>

					<Text 
						style={styles.game}
					>Skill Level: 
					<Text
						style={{
							fontWeight: '500',
							color: '#fff',
							textTransform: 'none', 
							marginBottom: 20, 
							marginTop: 0
						}}> {data.games[game].skill_level}
						</Text>
					</Text>

				</View>
			)) : ''}

				
						{exist == false ?

						<TouchableOpacity 

							style={styles.matches}
							onPress={() => addItem('testovacka', data.nickname)}
						><Text style={styles.btn}>Add to list</Text>
						</TouchableOpacity>

						: 

						<TouchableOpacity 

							style={styles.matches}
							onPress={() => removeItem(data.nickname)}
						><Text style={styles.btn}>Remove from list</Text>
						</TouchableOpacity>}

			 
              
			</View>
      
          </ScrollView>
      </SafeAreaView>
  )
}

export default UserScreen



var styles = StyleSheet.create({

	all: {
		backgroundColor: '#181818',
		height: '100%'
	},

	backgroundImg: {
		width: 400,
		height: 200,
		resizeMode: 'cover', // or 'stretch'
		borderBottomWidth: 10,
		opacity: '0.6',
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
		backgroundColor: '#181818',

	},
  
	topContent: {
		position: 'relative',
		zIndex: -1,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: 3,
    	borderTopColor: '#f50',
		backgroundColor: '#181818',
		height: 'auto',
		padding: 10
	},
  
	topContentText: {
		color: '#fff',
		fontSize: '22px',
		fontWeight: '500',
		paddingTop: 60,
	},

	content: {
		alignItems: 'left',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#1f1f1f',
	},

	country: {
		fontSize: 12,
		color: '#ccc',
		textTransform: 'uppercase',
	},

	games: {
		color: '#f50',
		fontSize: '25px',
		fontWeight: '500',
		borderBottomColor: '#f50',
		borderbottomWidth: 2,
		width: 350,
		marginBottom: 25,
		marginTop: 10
	},

	gameCard: {
		width: 350,
		backgroundColor: '#161616',
		padding: 20,
		marginBottom: 20,
		borderTopWidth: 4,
    	borderTopColor: '#404040',
	},

	game: {
		color: '#ccc',
		fontSize: '15px',
		fontWeight: '500',
		borderBottomColor: '#f50',
		borderbottomWidth: 2,
		marginBottom: 5,
		textTransform: 'uppercase'
	},

	steam: {
		backgroundColor: '#1f1f1f',
		margin: 20,
		padding: 20
	},

	matches: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 0,
		paddingRight: 0,
		backgroundColor: '#1f1f1f',
		marginTop: 30,
		marginBottom: 30
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