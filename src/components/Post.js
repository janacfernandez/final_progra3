import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from "react-native-web";


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            myLike: false,
            likes: 0,
            loading: true,
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

    irComentarios() {
        this.props.navigation.navigate('Comentarios', {id:this.props.dataPost.id, post: this.props.dataPost.data} )
    }

    render() {
        const styles = StyleSheet.create({
            image: {
                height: 200,
            },
            field: {
                borderColor: '#dcdcdc',
                borderWidth: 1,
                borderRadius: 2,
                padding: 3,
                marginBottom: 8
            },
            containerComentario: {
                margin: 3,
                border: '1px solid #008b8b ',
                backgroundColor: 'white',
                paddingVertical: 5,
                paddingHorizontal: 8,
            },
        })

        

        return (
            <View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Usuario', {usuario:this.props.dataPost.data.owner})}><Text> {this.props.dataPost.data.owner}</Text></TouchableOpacity>
                <Image style={styles.image} source={{ uri: this.props.dataPost.data.photo }} resizeMode='contain' />
                <Text onPress = {()=>this.irComentarios()}>{this.props.dataPost.data.comentarios.length} <AntDesign name="message1" size={24} color="black" /></Text>
                <Text>{this.props.dataPost.data.textoPost}</Text>

                <FlatList
                        data={this.props.dataPost.data.comentarios.slice(0,4)}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={({ item }) => <Text style = {styles.containerComentario}>{item.text}</Text>}
                />

                <Text>{this.state.likes}</Text>

                {
                    this.state.myLike ?
                        <TouchableOpacity onPress={() => this.dislike()}>
                            <Text><AntDesign name="heart" size={24} color="red" /></Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.like()}>
                            <Text><AntDesign name="hearto" size={24} color="black" /></Text>
                        </TouchableOpacity>
                }

            </View>
        )
    }
}

export default Post;