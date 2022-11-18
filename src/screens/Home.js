import React, { Component } from 'react'
import { View, Image, StyleSheet, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import Post from '../components/Post';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import Search from './Search';



class Home extends Component {
    constructor() {
        super();
        this.state = {
            description: "",
            posts: [],
            loading: true,
            comentario: ''
        }
    }

    componentDidMount() {
        db.collection('Posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posteos,
                        loading: false,
                    })
                })
            }
        )
    }

    irComentarios(){
        this.props.navigation.navigate('Comentarios')
    }

    render() {
        const styles = StyleSheet.create({
            image: {
                height: 200,
            },
            loading: {
                height: 200,
            },
            field: {
                borderColor: '#dcdcdc',
                borderWidth: 1,
                borderRadius: 2,
                padding: 3,
                marginBottom: 8
            },
            list: {
                width: '100%',
                flex: 1
            },
            loading:{
                marginTop: 50,
            }
        })

        return (
            <>
                {this.state.loading ? <Image style={styles.loading} source={require('../images/Loading_icon.gif')}></Image> : 
                
                <View style={styles.list}>
                    <Search />
                    <FlatList 
                    data={this.state.posts} 
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item})=> <Post dataPost={item} navigation={this.props.navigation}/> }
                    />
                </View>
                }
            </>
        )
    }
}

export default Home;