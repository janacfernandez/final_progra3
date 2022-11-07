import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import TabContainter from '../components/TabContainer';
import { auth, db } from '../firebase/config';


class Profile extends Component {
    constructor(){
        super();
    }  

    render(){    
        return(         
            <View>
               <Text>Profile</Text>
            </View>       
        )
    }
}

export default Profile;