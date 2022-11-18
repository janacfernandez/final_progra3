import {Component} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import PostForm from '../screens/PostForm';
import { FontAwesome } from '@expo/vector-icons';
import Images from './Images'

class TabContainer extends Component {
    constructor(){
        super();
    }
    render(){
        const Tab = createBottomTabNavigator();
        return(
            <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
                <Tab.Screen name = 'Home' component = {Home} options={{ headerShown: false, tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}/>
                <Tab.Screen name = 'Post' component={PostForm} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="camera" size={24} color="black"/>}} />
                <Tab.Screen name = 'Profile' component = {Profile} options={{ headerShown: false, tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }}/>

            </Tab.Navigator>
        )
    }
}

export default TabContainer;