import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { storage } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';

class Images extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }
    pickImage() {
        // No permissions request is necessary for launching the image library
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }).then(image => {
            this.setState({
                image: image.uri
            })
        }).catch(e => console.log('el error es' + e.message))

    };

    savePhoto() {
        fetch(this.state.image) // me permite acceder el contenido de un archivo
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
            image: ''
        })
    }

    render() {
        return (
            <>
                {this.state.image != ''

                    ?
                    <View style={styles.buttonArea}>
                        {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 350, height: 350, marginTop: 40, }} />}
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => this.savePhoto()}>
                                <Text style={styles.button}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.clearPhoto()}>
                                <Text style={styles.button}>Rechazar</Text>
                            </TouchableOpacity>
                        </View>

                    </View> :
                    <View >
                        <TouchableOpacity onPress={() => this.pickImage()}>
                            <Text style={styles.butt}  > Select an Image <Entypo name="folder-images" size={24} color="#008b8b" /></Text></TouchableOpacity>
                    </View>
                }
            </>
        );
    }

}
export default Images;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonArea: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#008b8b',
        fontSize: 20,
        borderRadius: 5,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        color: 'white',
    },
    butt: {
        textAlign: 'center',
        color: '#008b8b',
        justifyContent: 'center',
        marginTop: 225,
        textAlign: 'center',
        alignItems: 'center'
    }
});
