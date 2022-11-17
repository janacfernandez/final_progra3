import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth, db } from "../firebase/config";
import MyCamera from "../components/MyCamera";


const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    input: {
        height: 100,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton: {
        color: '#fff'
    },
})

class PostForm extends Component {
    constructor() {
        super();
        this.state = {
            /*datosusarios: null, */
            textoPost: '',
            photo: '',
            camera: true,
            user: ''
        }

    }
    /* componentDidMount() {
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
    } */

    onSubmit() {
        db.collection('Posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            textoPost: this.state.textoPost,
            // user: auth.currentUser,
            photo: this.state.photo,
        })
            .then(() => {
                this.props.navigation.navigate('Home')
                this.setState({
                    camera: true,
                    textoPost: ''
                })

            })
            .catch(e => console.log(e))
    }

    onImageUpload(url) {

        this.setState({
            photo: url,
            camera: false
        })

    }

    render() {
        return (

            <>
                {
                    this.state.camera
                        ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />
                        : <>
                            <Image style={styles.img} source={{ uri: this.state.photo }} />

                            <Text>Agregar Post</Text>
                            <TextInput style={styles.input}
                                keyboardType='default'
                                placeholder='Escriba Aquí...'
                                onChangeText={(text) => this.setState({ textoPost: text })}
                                value={this.state.textoPost} />

                            <TouchableOpacity onPress={() => { this.onSubmit(); this.props.navigation.navigate('Home') }}>
                                <Text style={styles.button}> Subir Post</Text>
                            </TouchableOpacity>

                        </>
                }
            </>

        );
    }

}

export default PostForm; 
