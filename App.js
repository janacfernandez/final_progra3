import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabContainer from './src/components/TabContainer';
import Profile from './src/screens/Profile';
import Comentarios from './src/screens/Comentarios';
import SearchResults from './src/components/SearchResults';
import Search from './src/screens/Search';
import Login from './src/screens/login';
import Register from './src/screens/register'; 


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Log In' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='Usuario' component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name='TabContainer' component={TabContainer} options={{ headerShown: false }} />
        <Stack.Screen name='Comentarios' component={Comentarios} options={{ headerShown: false }} />
        <Stack.Screen name='Search' component={Search} options={{ headerShown: false }} />
        <Stack.Screen name='SearchRes' component={SearchResults} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

