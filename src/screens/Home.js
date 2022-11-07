import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import TabContainter from '../components/TabContainer';
import { auth, db } from '../firebase/config';


class Home extends Component {
    constructor(){
        super();
        this.state = {
            description: "",
            posteos: [],
        }
    }  

    render(){
           
        return(     
            <View>
               <Text>HOME</Text>
            </View>       
        )
    }
}

export default Home;