import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import TabContainer from './src/components/TabContainer';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'Register' component = {Register} options={{ headerShown: false }}/>
        <Stack.Screen name = 'LogIn' component = {Login} options={{ headerShown: false }}/>
        <Stack.Screen name = 'TabContainer' component = {TabContainer} options={{ headerShown: false }}/>
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

// auth.onAuthStateChanged( user => {
// 	if (user) this.setsTATE({
//     LOGGEDiN: TRUE
//   })
// })
