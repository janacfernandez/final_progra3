import React, { Component } from 'react';
import { View,Text,  TouchableOpacity,  Image, Button } from 'react-native';
import { auth, db, storage } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';


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
            })}).catch(e => console.log('el error es'+ e.message))
    
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

      render(){
        return (
            <View >
                <View >
                    <TouchableOpacity onPress={() => this.pickImage()}>
                    <Text> Select an Image</Text> </TouchableOpacity>
                    {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                </View>
                <View>

                                    <TouchableOpacity onPress={() => this.savePhoto()}>
                                        <Text>Aceptar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.clearPhoto()}>
                                        <Text >Rechazar</Text>
                                    </TouchableOpacity>
                                </View>

            </View>
        );
      }

    }
export default Images; 