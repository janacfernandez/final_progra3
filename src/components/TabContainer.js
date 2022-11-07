import {Component} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

class TabContainer extends Component {
    constructor(){
        super();
    }
    render(){
        const Tab = createBottomTabNavigator();
        return(
            <Tab.Navigator>
                <Tab.Screen name = 'Home' component = {Home}/>
                <Tab.Screen name = 'Profile' component = {Profile}/>
            </Tab.Navigator>
        )
    }
}

export default TabContainer;