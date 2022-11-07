import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            DNI: '',
            edad: ''
        }
    }

    onSubmit() {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                console.log(response);
                console.log(`El email ingresado es: ${this.state.email}`);
                console.log(`La contraseña ingresada es: ${this.state.password}`);
                console.log(`El DNI ingresado es: ${this.state.DNI}`);
                console.log(`La edad ingresada es: ${this.state.edad}`);
                db.collection('datosusuarios').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    DNI: this.state.DNI,
                    edad: this.state.edad,
                })
                    .then(() => { this.props.navigation.navigate('TabContainer'); })
            })
            .catch(error => console.log(error))
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <TextInput
                    style={styles.field}
                    keyboardType='default'
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
                    keyboardType='numeric'
                    placeholder='DNI'
                    onChangeText={text => this.setState({ DNI: text })}
                    value={this.state.DNI}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='numeric'
                    placeholder='Edad'
                    onChangeText={text => this.setState({ edad: text })}
                    value={this.state.edad}
                />
                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text>Registrarme</Text>
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
    field: {
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding: 3,
        marginBottom: 8

    }
})

export default Register;