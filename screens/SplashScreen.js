import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

function SplashScreen({navigation}) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logoFaceit.png')} style={styles.logo} />
            <ActivityIndicator size="large" color="#f50" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#181818'
    },
    logo: {
        width: '75%',
        height: 50,
        marginBottom: 60
    }
});

export default SplashScreen;