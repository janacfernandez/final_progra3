import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'LogIn' component = {Login}/>
        <Stack.Screen name = 'Register' component = {Register}/>
        <Stack.Screen name = 'TabContainer' component = {TabContainer}/>
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
