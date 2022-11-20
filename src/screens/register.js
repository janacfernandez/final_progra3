import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db, auth } from '../firebase/config';
import MyCamera from '../components/MyCamera';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            user: '',
            bio: '',
            img: '',
            registered: false,
            required: '',
            error: '',
            showCamera: true,
        }
    }


    onSubmit() {
        this.state.email == '' || this.state.password == '' || this.state.user == '' ?
            this.setState({ required: 'Tenes que completar el campo de email, usuario y contraseña para enviar este formulario' })
            :
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(response => {
                    console.log(response);
                    console.log(`El email ingresado es: ${this.state.email}`);
                    console.log(`La contraseña ingresada es: ${this.state.password}`);
                    console.log(`El usuario ingresado es: ${this.state.user}`);
                    console.log(`La biografía ingresada es: ${this.state.bio}`);
                    this.setState({ registered: true })
                    db.collection('datosusuarios').add({
                        owner: auth.currentUser.email,
                        createdAt: Date.now(),
                        user: this.state.user,
                        bio: this.state.bio,
                        img: this.state.img,
                    })
                        .then(() => { this.props.navigation.navigate('Log In'); })
                })
                .catch(err => { this.setState({ error: err.message }) })
    }

    onImageUpload(url) {
        this.setState({ showCamera: false, img: url })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <TextInput
                    style={styles.field}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Usuario'
                    onChangeText={text => this.setState({ user: text })}
                    value={this.state.user}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Mini biografía'
                    onChangeText={text => this.setState({ bio: text })}
                    value={this.state.bio}
                />
                {
                    this.state.showCamera === true ?
                        <MyCamera style={styles.camera} onImageUpload={(url) => this.onImageUpload(url)} />
                        :
                        <Image style={styles.img} source={{uri: this.state.img }} />
                }


                {this.state.email == '' || this.state.password == '' || this.state.user == '' ?
                    <Text style={styles.grey}> Registrarme</Text>
                    :
                    <TouchableOpacity onPress={() => this.onSubmit()}>
                        <Text style={styles.blue} >Registrarme</Text>
                    </TouchableOpacity>}


                <Text style={styles.message}>{this.state.error}</Text>
                <Text style={styles.message}>{this.state.required}</Text>

                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                    <Text style={styles.text}> Ya tenes una cuenta? Logueate!</Text>
                </TouchableOpacity>
            </View >

        )
    }

}

const styles = StyleSheet.create({
    grey: {
        backgroundColor: 'rgb(230, 230, 230)',
        borderRadius: '15px',
        margin: '3%',
        color: 'white',
        padding: 3,
    },
    blue: {
        backgroundColor: '#008b8b',
        borderRadius: '15px',
        margin: '3%',
        padding: 3,
        fontSize: 17,
        color: 'white',
        width: 350,
    },
    message: {
        color: 'red',
        marginTop: '1%',
        fontSize: 12,
    },
    field: {
        width: '100%',
        fontSize: 17,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '15px',
        padding: '1%',
        color: 'rgb(153, 153, 153)'
    },
    title: {
        fontSize: 50,
        color: '#008b8b',
        margin: 5,
        fontWeight: 'bold',
    },
    text: {
        color: '#008b8b',
        fontSize: 15,
        width: '100%',
        marginTop: '2%',
    },
    container: {
        flex: 1,
        width: '100vw',
        padding: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    camera: {
        width: '50%',
        height: '50%',
        borderRadius: 400,
        marginBottom: 5,
        flex: 1,
        margin: 30
    },
    img: {
        width: '100px',
        height: '200px',
    }
})

export default Register;
