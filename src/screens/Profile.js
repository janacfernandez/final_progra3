import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Post from '../components/Post';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarioState: '',
            posteosUsuario: [],
        };
    }

    logOut() {
        auth.signOut();
        this.props.navigation.navigate('Log In');
    }

    componentDidMount() {

        let usuario = '';

        if (this.props.route.params != undefined) {
            usuario = this.props.route.params.usuario;
        }

        else {
            usuario = auth.currentUser.email;
        };

        db.collection('datosusuarios')
            .where('owner', '==', usuario)
            .onSnapshot(docs => {
                docs.forEach(doc => {
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
    }


    render() {
       
        return (
            <ScrollView style={styles.containerHome}>
                <View style={styles.containerH}>
                    <AntDesign onPress={() => this.props.navigation.navigate('Home')} name="home" size={24} color="white" />
                    {this.state.usuarioState.owner == auth.currentUser.email ?

                        <Entypo onPress={() => this.logOut()} name="log-out" size={23} color="white" /> :

                        <></>

                    }
                </View>

                <View >

                    <Text style={styles.title}>{this.state.usuarioState.user}</Text>

                    <View style={styles.container}>
                        {this.state.usuarioState.img == undefined ?
                            <Image style={styles.imagen} source={require('../images/defaultProfile.jpg')} resizeMode='cover' />
                            :
                            <Image style={styles.imagen} source={{ uri: this.state.usuarioState.img }} resizeMode='contain' />
                        }

                        <View style={styles.desc}>
                            <Text style={styles.texto}>{this.state.usuarioState.owner}</Text>
                            <Text style={styles.texto}>{this.state.usuarioState.bio}</Text>
                            <Text style={styles.texto} >{this.state.posteosUsuario.length} posteos subidos</Text>
                        </View>
                    </View>
                    <View>
                        <FlatList
                            data={this.state.posteosUsuario}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation} />}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({

    imagen: {
        height: 75,
        width: 75,
        margin: 5,
        marginLeft: 20

    },
    title: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5


    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
   
    desc: {
        justifyContent: 'flex-start',
        marginTop: 15,
        marginRight: 40,
    
    },
    texto: {
        color: 'white',

    },
    logout: {
        marginRight: 'auto'

    },
    containerHome: {
        backgroundColor: '#008b8b',

    },
    containerH: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        margin: 10,
        },

})

export default Profile;