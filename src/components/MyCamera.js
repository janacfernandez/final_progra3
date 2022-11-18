import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { View, StyleSheet, ActivityIndicator, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { auth, db, storage } from '../firebase/config';

const styles = StyleSheet.create({
    cameraBody: {
        height: '100vh',
        width: '100vw',
        position: 'absolute'
    },
    preview: {
        height: 300,
        width: 300
    },
    buttonArea: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    botones: {
        backgroundColor: 'green',
        fontSize: 20,
        borderRadius: 5,
        margin: 10
    },
    shootButton: {
        alignItems: 'center'
    }
})


class MyCamera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permission: false,
            showCamera: true,
            photo: ''
        }
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permission: true,
                })
            })
            .catch(e => console.log(e))

    }

    takePicture() {
        this.metodosDeCamera.takePictureAsync()
            .then(photo => {
                this.setState({
                    photo: photo.uri, //Es una uri interna temporal de la foto.
                    showCamera: false
                })
            })
    }

    savePhoto() {
        fetch(this.state.photo) // me permite acceder el contenido de un archivo
            .then(res => res.blob()) // el metodo blob me permite tener la representacion binaria de mi imagen         
            .then(image => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image) // subo a firebase el archivo
                    .then(() => {
                        ref.getDownloadURL()
                            .then(url => {
                                this.props.onImageUpload(url);
                            })
                            .catch(e => console.log(e))
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }

    clearPhoto() {
        this.setState({
            showCamera: true
        })
    }

    render() {

        return (
            <>
                {this.state.permission ?
                        this.state.showCamera === false
                            ?
                            <View>
                                <Image style={styles.preview}
                                    source={{ uri: this.state.photo }}
                                />
                                <View style={styles.buttonArea}>
                                    <TouchableOpacity onPress={() => this.savePhoto()}>
                                        <Text style={styles.botones} >Aceptar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.clearPhoto()}>
                                        <Text style={styles.botones}>Rechazar</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            :

                            <View>
                                <Camera
                                    style={styles.cameraBody}
                                    type={Camera.Constants.Type.front}
                                    ref={metodosDeCamera => this.metodosDeCamera = metodosDeCamera}
                                />
                                <TouchableOpacity
                                    style={styles.shootButton}
                                    onPress={() => this.takePicture()}>
                                    <Text style={styles.botones} >Shoot</Text>
                                </TouchableOpacity>
                            </View>
                        :
                        <Text>
                            You need permission to take a picture
                        </Text>
                }
            </>
        )
    }
}


export default MyCamera;