import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './screens/HomeScreen';
import UserPage from './screens/UserScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          title: 'First screen',
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="User"
        component={UserPage}
        options={{
          title: 'Profile',
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#181818',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
