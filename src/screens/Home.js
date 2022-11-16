import React, { Component } from 'react'
import { View, Image, StyleSheet, TextInput, FlatList } from 'react-native';
import Post from '../components/Post';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            description: "",
            posteos: [],
            loading: true,
            comentario: ''
        }
    }

    componentDidMount() {
        db.collection('Posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteos: posts,
                        loading: false,
                    })
                })
            }
        )
        console.log(auth.currentUser)
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
        })


        return (
            <>
                {this.state.loading ? <Image style={styles.loading} source={require('../images/Loading_icon.gif')}></Image> : 
                
                <View style={styles.list}>
                    <FlatList data={this.state.posteos} keyExtractor={item => item.id.toString()} renderItem={({item})=> <Post post={item.data.post} id={item.id} photo = {item.data.photo} comentarios={item.data.comentarios}></Post> }/>
                </View>
                }
            </>
        )
    }
}

export default Home;