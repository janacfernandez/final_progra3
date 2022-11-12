import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            user: '',
            bio: '',
            registered: false,
            required: '',
        }
    }

    onSubmit() {
        this.state.email == '' || this.state.password == '' || this.state.user == ''?
        this.setState({required: 'Tenes que completar el campo de email, usuario y contraseña para enviar este formulario'})
        :
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                console.log(response);
                console.log(`El email ingresado es: ${this.state.email}`);
                console.log(`La contraseña ingresada es: ${this.state.password}`);
                console.log(`El usuario ingresado es: ${this.state.user}`);
                console.log(`La biografía ingresada es: ${this.state.bio}`);
                db.collection('datosusuarios').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    user: this.state.user, 
                    bio: this.state.bio,
                })
                    .then(() => { this.props.navigation.navigate('Log In'); })
            })
            .catch(error => console.log(error))
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
                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text>Registrarme</Text>
                </TouchableOpacity>

                <Text  style={styles.message}>{this.state.required}</Text>

                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Text style={styles.text}> Ya tenes una cuenta? Logueate!</Text>
                </TouchableOpacity>
            </View >

        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 10
    },
    title: {
        marginBottom: 20
    },
    message: {
        color: 'red',
        fontSize: 20,
    },
    field: {
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding: 3,
        marginBottom: 8

    }
})

export default Register;
