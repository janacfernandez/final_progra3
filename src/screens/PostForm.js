import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth, db } from "../firebase/config";
import MyCamera from "../components/MyCamera";
import Images from "../components/Images";

const styles = StyleSheet.create({
    container:{
      flex:1,
      width: '50%',
      height: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto'
  },
    form:{
      border: '2px solid #008b8b',
      marginBottom: '7px',
      padding: '10px',
      width: '350px'
  },
    imagen:{
      height: '350px',
      width: '350px',
      marginBottom: '20px',
      marginTop: '20px' 
   },
   button:{
    fontSize: '25px',
    color: 'white',
    backgroundColor: '#008080',
    fontWeight: 'bold',
    padding: '5px'
  },
  
  });

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
                    gallery:false,
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
            elegirFoto: false

        })

    } 

    render() {
        return (
            <>
                {
                    this.state.camera
                        ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)}  stlye={styles.camera}/>
                        :
                        this.state.gallery ? 
                     <Images onImageUpload={(url) => this.onImageUpload(url)}  stlye={styles.camera}/>
                     :
                         <View style={styles.container}>

                        { this.state.elegirFoto ? 
                         <>
                            <TouchableOpacity onPress={()=> {this.setState( {
                                gallery: true
                            })}}> 
                                <Text> Open Gallery</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> {this.setState( {
                                camera: true
                            })}}> 
                                <Text> Open Camera</Text>
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

                            <TouchableOpacity  style={styles.button} onPress={() => { this.onSubmit(); this.props.navigation.navigate('Home') }}>
                                <Text style={styles.button}> Subir Post</Text>
                            </TouchableOpacity>
                            </>
                        }

                        </View>
                }
            </>

        );
    } 

}

export default PostForm; 
