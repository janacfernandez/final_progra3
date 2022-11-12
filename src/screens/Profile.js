import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import TabContainter from '../components/TabContainer';
import { auth, db } from '../firebase/config';


class Profile extends Component {
    constructor(){
        super();
    }  

    logOut(){
        auth.signOut()
        this.props.navigation.navigate('Log In')
    }

    render(){    
        return(         
            <View>
               <Text>Profile</Text>
               <TouchableOpacity onPress={() => this.logOut()}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
            </View>       
        )
    }
}

export default Profile;