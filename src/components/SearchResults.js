/* import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import { auth} from '../firebase/config';

const styles = StyleSheet.create({
    image: {
        height: 70,
        width: 100,  
        borderRadius:110,      
        alignSelf: 'center',       
        flex: 1,
        marginRight: 10,
    },
    resultsContainer:{
        display: 'flex',
        flexDirection: 'row',    
        padding: 30,
        alignItems:'center',
        backgroundColor: 'rgb(243, 237, 235)',
        borderRadius: 10,
        margin: 20
    },
    info:{
        flex:3
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bio:{
        fontSize: 20,
        color: 'rgb(153, 153, 153)',
    }
})

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    goToProfile(user) {
        this.props.navigation.navigate('OtherProfile', {user: user})
    }    

    render(){
        console.log(this.props.userInfo)
        return(
            <View style={styles.resultsContainer}>
                <Image source={{uri: this.props.userInfo.data.profilePicture}} style={styles.image}/>
                <View style= {styles.info}>

                {this.props.userInfo.data.owner == auth.currentUser.email ?
                    <Text style={styles.name} onPress={() =>this.props.navigation.navigate("Profile")}>{this.props.userInfo.data.owner}</Text>
                    :
                    <Text style={styles.name} onPress={() =>this.goToProfile(this.props.userInfo.data.owner)}>{this.props.userInfo.data.owner}</Text>
                }
                
                <Text style={styles.bio}>{this.props.userInfo.data.user}: {this.props.userInfo.data.bio}</Text>
                </View>                               
                
            </View>
        )
    }

}

export default SearchResults  */