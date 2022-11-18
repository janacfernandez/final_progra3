import React, { Component, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Button } from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        border: '1px solid #008b8b ',
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    imagen: {
        height: 350,
    },

    containerLikeCommDel: {
        marginBottom: 30,
        paddingHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    likes: {
        width: '49%',
        justifyContent: 'flex-start',
        textAlign: 'right',
        text: {
            paddingRight: 4
        }
    },
    user: {
        padding: 0,
        textAlign: 'center',
        text: {
            fontWeight: 'bold'
        }
    },

})

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            myLike: false,
            likes: 0,
            loading: true,
            comentario: '',
        }
    }
    componentDidMount() {
        if (this.props.dataPost.data.likes) {
            this.setState({
                likes: this.props.dataPost.data.likes.length,
                myLike: this.props.dataPost.data.likes.includes(auth.currentUser.email),
            })
        }
    }
    like() {
        db.collection('Posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    likes: this.props.dataPost.data.likes.length,
                    myLike: true
                })
            })
            .catch(e => console.log(e));

    }

    dislike() {
        db.collection('Posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    likes: this.props.dataPost.data.likes.length,
                    myLike: false
                })
            })
            .catch(e => console.log(e));

    }

    deletePost() {
        db.collection('Posts').doc(this.props.dataPost.id).delete()
    }



    render() {
        return (
            <View style={styles.container}>
                {
                    auth.currentUser.email === this.props.dataPost.data.owner ?
                        <TouchableOpacity onPress={() => this.deletePost()}>
                            <Entypo name="cross" size={24} color="#008b8b" />
                        </TouchableOpacity> :
                        <View >
                        </View>

                }
                <TouchableOpacity style={styles.user}>
                    <Text> {this.props.dataPost.data.owner}</Text>
                </TouchableOpacity>

                <Image style={styles.imagen} source={{ uri: this.props.dataPost.data.photo }} resizeMode='contain' />

                <View style={styles.containerLikeCommDel}>
                    {
                        this.state.myLike ?
                            <TouchableOpacity style={styles.likes} onPress={() => this.dislike()}>
                                <Text>{this.state.likes}</Text><Text><AntDesign name="heart" size={24} color="red" /></Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.likes} onPress={() => this.like()}>
                                <Text>{this.state.likes}</Text><Text><AntDesign name="hearto" size={24} color="black" /></Text>
                            </TouchableOpacity>

                    }
                </View>
                <Text>{this.props.dataPost.data.textoPost}</Text>
            </View>
        )
    }
}

export default Post;