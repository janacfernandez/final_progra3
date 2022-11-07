import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from "../firebase/config";

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }, 
})

class PostForm extends Component {
    constructor() {
        super();
        this.state = {
            /*datosusarios: null, */
            post: '',
            /*posts: null,
            description: '',
            url: '', */
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
            post: this.state.post,
            /*user: this.state.datosusarios?.user, */
        })
        .then(()=> this.props.navigation.navigate('Home'))
        .catch(e => console.log(e))
}

render() {
    return (
        <View style={styles.formContainer}>
        <Text>Agregar Post</Text>                
        

        <TextInput style={styles.input}
            keyboardType='default'
            placeholder='Escriba Aquí...'
            onChangeText={(text) => this.setState({ post: text })}
            value={this.state.post} />

        <TouchableOpacity onPress={() => this.onSubmit()} style={styles.button}>
            <Text style={styles.textButton}> Subir Post</Text>
        </TouchableOpacity>

    </View>

    );
}

}

export default PostForm; 
