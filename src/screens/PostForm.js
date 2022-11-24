import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth, db } from "../firebase/config";
import MyCamera from "../components/MyCamera";
import Images from "../components/Images";


class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*datosusarios: null, */
            textoPost: '',
            photo: '',
            camera: false,
            user: '',
            gallery: false,
            elegirFoto: true
        }
    }

    componentDidMount() {
        db.collection('datosusuarios').onSnapshot(
            docs => {
                docs.forEach(doc => {
                    const data = doc.data();
                    if (data.owner === auth.currentUser.email) {
                        this.setState({ datosUsario: data })
                    }
                });
            }
        )
    }

    onSubmit() {
        db.collection('Posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            textoPost: this.state.textoPost,
            // user: auth.currentUser,
            photo: this.state.photo,
            comentarios: [],

        })
            .then(() => {
                this.props.navigation.navigate('Home')
                this.setState({
                    camera: false,
                    gallery: false,
                    elegirFoto: true
                })

            })
            .catch(e => console.log(e))
    }


    onImageUpload(url) {

        this.setState({
            photo: url,
            camera: false,
            gallery: false,
            elegirFoto: false,
            textoPost: '',
        })

    }

    render() {
        return (
            <>
                {
                    this.state.camera
                        ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} stlye={styles.camera} />
                        :
                        this.state.gallery ?
                            <Images onImageUpload={(url) => this.onImageUpload(url)} stlye={styles.camera} />
                            :
                            <View style={styles.container}>

                                {this.state.elegirFoto ?

                                    < >
                                        <TouchableOpacity>
                                            <Text style={styles.botones} onPress={() => {
                                                this.setState({
                                                    gallery: true
                                                })
                                            }}> Open Gallery</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity>
                                            <Text style={styles.botones} onPress={() => {
                                                this.setState({
                                                    camera: true
                                                })
                                            }}> Open Camera</Text>
                                        </TouchableOpacity>

                                    </>
                                    :
                                    <>
                                        <Image style={styles.imagen} source={{ uri: this.state.photo }} />

                                        <TextInput style={styles.form}
                                            keyboardType='default'
                                            placeholder='Escriba Aquí...'
                                            onChangeText={(text) => this.setState({ textoPost: text })}
                                            value={this.state.textoPost} />

                                        <TouchableOpacity style={styles.button} onPress={() => { this.onSubmit(); this.props.navigation.navigate('Home') }}>
                                            <Text style={styles.buttonPost}> Subir Post</Text>
                                        </TouchableOpacity>
                                    </>
                                }

                            </View>
                }
            </>

        );
    }

}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1

    },
    form: {
        border: '2px solid #008b8b',
        marginBottom: 7,
        padding: 10,
        margin: 10,
        width: 350
    },
    imagen: {
        height: 350,
        width: 350,
        marginBottom: 20,
        marginTop: 20,

    },
    button: {
        fontSize: 25,
        color: 'white',
        backgroundColor: '#008080',
        fontWeight: 'bold',
        padding: 5,
        marginBottom: 5
    },

    botones: {
        fontWeight: 'bold',
         margin: 20,
         fontSize: 25, 
         color: '#008080'
    }

});

export default PostForm;