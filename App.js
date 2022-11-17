import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabContainer from './src/components/TabContainer';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Post from './src/components/Post';
import Comentarios from './src/screens/Comentarios'

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Log In' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='TabContainer' component={TabContainer} options={{ headerShown: false }} />
        {/* <Stack.Screen name='Post' component={Post} options={{ headerShown: false }} /> */}
        <Stack.Screen name='Comentarios' component={Comentarios} options={{ headerShown: false }} />
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

