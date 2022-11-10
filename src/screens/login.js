import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            error: [],
            required: '',
        }
    }


    onSubmit() {
        //Colocar el método de registración de Firebase
        this.state.email == '' || this.state.password == '' || this.state.user == '' ?
            this.setState({ required: 'Tenes que completar el campo de email, usuario y contraseña para enviar este formulario' })
            :
            auth.signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(response => {
                    console.log(response);
                    console.log(`El email ingresado es: ${this.state.email}`);
                    console.log(`La contraseña ingresada es: ${this.state.password}`);
                    this.setState({ loggedIn: true })
                    this.props.navigation.navigate('TabContainer');
                })
                .catch(err => { this.setState({ error: err.message }) })
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Logueo</Text>
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
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text>Loguearme</Text>
                </TouchableOpacity>

                <Text style={styles.message}>{this.state.error}</Text>
                <Text style={styles.message}>{this.state.required}</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.text}> No tenes una cuenta? Crea una!</Text>
                </TouchableOpacity>
            </View>

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

export default Login;