import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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

    deletePost() {
        db.collection('Posts').doc(this.props.dataPost.id).delete()
    }


    irComentarios() {
        this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id, post: this.props.dataPost.data })
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Usuario', { usuario: this.props.dataPost.data.owner })}><Text style={styles.user}> {this.props.dataPost.data.owner}</Text></TouchableOpacity>
                <Image style={styles.image} source={{ uri: this.props.dataPost.data.photo }} resizeMode='cover' />

                <View style={styles.likeCom}>
                    {

                        this.state.myLike ?
                            <View style={styles.likeCom}>
                                <TouchableOpacity>
                                    <Text onPress={() => this.dislike()}> {this.state.likes} <AntDesign name="heart" size={24} color="red" /> </Text>
                                </TouchableOpacity>
                            </View> :
                            <View style={styles.likeCom}>
                                <TouchableOpacity style={styles.likes} >
                                    <Text onPress={() => this.like()}> {this.state.likes} <AntDesign name="hearto" size={24} color="black" /> </Text>
                                </TouchableOpacity>
                            </View>


                    }
                    <View style={styles.likeCom}>
                        <TouchableOpacity style={styles.likes}>
                            <Text onPress={() => this.irComentarios()}>{this.props.dataPost.data.comentarios.length} <AntDesign name="message1" size={24} color="black" /></Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View >
                    <Text style={styles.text} >{this.props.dataPost.data.textoPost}</Text>
                </View>

                <View style={styles.cajacomentarios}>
                    <FlatList
                        data={this.props.dataPost.data.comentarios.slice(0, 4)}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={({ item }) => <Text style={styles.containerComentario}>{item.text}</Text>}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        border: '1px solid #008b8b ',
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    image: {
        height: 350,
    },

    likeCom: {
        marginTop: 5,
        marginBottom: 5,
        paddingHorizontal: 0,
        flexDirection: 'row',
    },

    likes: {
        width: 49,
        textAlign: 'right',
    },
    user: {
        padding: 0,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#008b8b ',
        margin: 10

    },
    cajacomentarios: {
        alignItems: 'flex-start',
        backgroundColor: 'whitesmoke'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
        fontFamily: 'Arial'
    },

    containerComentario: {
        fontSize: 15,
        paddingVertical: 1,
        paddingHorizontal: 1,
        fontFamily: 'Baskerville',

    },
})

export default Post;

