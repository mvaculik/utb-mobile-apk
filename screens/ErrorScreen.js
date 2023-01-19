import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView, Button } from 'react-native';
import { useState, useEffect } from 'react';

function ErrorScreen({navigation, route}) {
    let error = route.params.paramKey;

  return (
    <View style={styles.all}>

        <Text 
            style={{
                color: '#fff',
                fontSize: '22px',
                fontWeight: '700',
                textAlign: 'center',
                marginTop: 50,
                marginBottom: 0
            }}
        >User
        </Text>

        <Text 
            style={styles.errorMsg}
        >{error}
        </Text>

        <Text 
            style={{
                color: '#fff',
                fontSize: '22px',
                fontWeight: '700',
                textAlign: 'center',
                marginTop: 25,
                marginBottom: 0
            }}
        >not found
        </Text>

        <Text>
            
        </Text>

        <TouchableOpacity 
            style={styles.btn} 
            onPress={() => navigation.navigate('Home')}
        >
            <Text  
                style={styles.btnText} 
            >TRY AGAIN</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ErrorScreen

var styles = StyleSheet.create({

	all: {
		backgroundColor: '#181818',
		height: '100%'
	},

    errorMsg: {
        color: '#f50',
		fontSize: '28px',
		fontWeight: '700',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 0
    },

    btn: {
        position: 'absolute',
        bottom: 50,
		textTransform: 'uppercase',
		width: '100%',
		textAlign: 'center',
		padding: 30
    },

    btnText: {
        color: '#f50',
		fontSize: '22px',
		fontWeight: '700',
        textAlign: 'center',
    },

})