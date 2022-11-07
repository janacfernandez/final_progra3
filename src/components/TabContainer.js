import {Component} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Register from '../screens/Register';

class TabContainer extends Component {
    constructor(){
        super();
    }
    render(){
        const Tab = createBottomTabNavigator();
        return(
            <Tab.Navigator>
                <Tab.Screen name = 'Home' component = {Home} options={{ headerShown: false }}/>
                <Tab.Screen name = 'Profile' component = {Profile} options={{ headerShown: false }}/>
            </Tab.Navigator>
        )
    }
}

export default TabContainer;