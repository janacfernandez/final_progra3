import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import Post from '../components/Post';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            usuarioState: '',
            posteosUsuario: [],
        };
    }  
    
    logOut(){
        auth.signOut();
        this.props.navigation.navigate('Log In');
    }

    componentDidMount(){
        let usuario = '';

        if(this.props.route.params != undefined){
            usuario = this.props.route.params.usuario;
        }

        else{
                usuario = auth.currentUser.email;
        };

        db.collection('datosusuarios')
        .where('owner', '==', usuario)            
        .onSnapshot(docs => {
            docs.forEach(doc=>{
                this.setState({
                    usuarioState: doc.data(),
                })
        })
        });
        
        db.collection('Posts')
        .where('owner', '==', usuario)
        .onSnapshot(docs => {
            let posteos = [];
            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            this.setState({
            posteosUsuario: posteos,
        });
        });

        // db.collection('datosusuarios')
        //     .where('owner', '==', usuario)            
        //     .onSnapshot(docs => {
        //         let informacionUsuario = []
        //         docs.forEach(doc=>{
        //             informacionUsuario.push({
        //                 data: doc.data()
        //             })
        //     })
        //         this.setState({
        //             usuarioState: informacionUsuario,
        //         }) 
        //     });
            
    }
    
        
    render(){
        const styles = StyleSheet.create({
            image: {
                borderRadius:15,
                marginTop:50,
                height: 100,
            },
        })

        console.log(this.state.usuarioState)

        return(

            <View>

                <AntDesign onPress={()=>this.props.navigation.pop()} name="doubleleft" size={24} color="black" />
                <AntDesign onPress={()=>this.props.navigation.navigate('Home')} name="home" size={24} color="black" />

            {this.state.usuarioState.owner == auth.currentUser.email ?

            <TouchableOpacity onPress={() => this.logOut()}><Text>Log Out</Text></TouchableOpacity> :

            <></>

            }

            <Text>{this.state.usuarioState.user}</Text>
            {this.state.usuarioState.img == undefined ? <Image style={styles.image} source={require('../images/defaultProfile.png')}/>:
            <Image style={styles.image} source={{ uri: this.state.usuarioState.img }} resizeMode='contain' />
            }
            
            <Text>{this.state.usuarioState.owner}</Text>
            <Text>{this.state.usuarioState.bio}</Text>
            <Text>{this.state.posteosUsuario.length} posteos subidos.</Text>
            

            <FlatList 
                    data={this.state.posteosUsuario} 
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item})=> <Post dataPost={item} navigation={this.props.navigation}/> }
            />

            </View>            
        )  
    }
}

export default Profile;