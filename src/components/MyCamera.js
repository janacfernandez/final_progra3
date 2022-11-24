import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { storage } from '../firebase/config';
import { Entypo } from '@expo/vector-icons';

class MyCamera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permission: false,
            showCamera: true,
            photo: '',
            error: '',
        }
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permission: true,
                })
            })
            .catch(e => this.setState({error: e.message}))

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
                            .catch(e => this.setState({error: e.message}))
                    })
                    .catch(e => this.setState({error: e.message}))
            })
            .catch(e => this.setState({error: e.message}))
    }

    clearPhoto() {
        this.setState({
            showCamera: true, 
            photo: '',
        })
    }

    render() {

        return (

            <>
            {this.state.error != '' ? <Text>Ocurrio el siguiente error {this.state.error}</Text> :
            <View  style={styles.container}>

            {
            this.state.permission ?
                this.state.showCamera === false?
                    <>
                        <Image style={styles.preview}
                            source={{ uri: this.state.photo }}
                        />
                        <View style={styles.cont}>
                            <TouchableOpacity onPress={() => this.savePhoto()}>
                                <Text style={styles.botones}>
                                    Aceptar
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.clearPhoto()}>
                                <Text style={styles.botones}>
                                    Rechazar
                                    </Text>
                            </TouchableOpacity>
                        </View>

                    </>
                    :
                    <View style={styles.container}>
                        <Camera
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.front}
                            ref={met => this.metodosDeCamera = met}
                        />
                        <TouchableOpacity
                            style={styles.shootButton}
                            onPress={() => this.takePicture()}>
                            <Entypo name="circle" size={50} color="black" />
                        </TouchableOpacity>
                    </View>
                :
                <Text>
                    You need permission to take a picture
                </Text>
            }
            </View>}
            </>
            
                )
    }
}
export default MyCamera;


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    cameraBody: {
        flex:7
    },
    preview: {
        marginTop: 40,
        height: 350,
        width: 350,
        alignSelf: 'center'
    },
    cont: {
        flex:1, 
        flexDirection: 'row',
        justifyContent: 'center'
    },

    botones: {
        backgroundColor: '#008b8b',
        fontSize: 20,
        borderRadius: 5,
        margin: 10,
        padding: 5, 
        textAlign: 'center',
        color: 'white',

    },
    shootButton: {
        flex:1,
        alignItems: 'center',
    }
});