import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebase/config';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100vw',
        padding: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    message: {
        color: 'red',
        fontSize: 20,
    },
    grey: {
        backgroundColor: 'rgb(230, 230, 230)',
        borderRadius: '15px',
        margin: '3%',
        color: 'white',
        padding: 3,
    },
    loading: {
        marginTop: 250,
        alignItems: 'center',
        fontSize: 17,
        color: 'white',
        width: 350,
    },
    blue: {
        backgroundColor: '#008b8b',
        borderRadius: '15px',
        margin: '3%',
        color: 'white',
        width: 85,
        padding: 3,
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
    text: {
        color: '#008b8b',
        fontSize: 15,
        width: '100%',
        marginTop: '2%',
    },
    title: {
        fontSize: 50,
        color: '#008b8b',
        fontWeight: 'bold',
        margin: 5,
    },
    error: {
        color: 'red',
        marginTop: '1%',
        fontSize: 12,
    }
});

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            error: '',
            loading: true,
            required: '',
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('TabContainer');
            }
            this.setState({
                loading: false,
            })
        })
    }

    onSubmit() {
        this.state.email == '' || this.state.password == '' ?
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
            <>
                {this.state.loading ? <ActivityIndicator style={styles.loading} color='#008b8b' size='large' /> : <View style={styles.container}>
                    <Text style={styles.title}>Logueo</Text>
                    <TextInput
                        style={styles.field}
                        keyboardType='email-address'
                        placeholder='Mail'
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
                    {
                        this.state.email == '' || this.state.password == '' ?
                            <Text style={styles.grey}>Loguearme</Text>
                            :
                            <TouchableOpacity onPress={() => this.onSubmit()}>
                                <Text style={styles.blue}>Loguearme</Text>
                            </TouchableOpacity>

                    }



                    <Text style={styles.message}>{this.state.error}</Text>
                    <Text style={styles.message}>{this.state.required}</Text>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.text}> No tenes una cuenta? Crea una!</Text>
                    </TouchableOpacity>
                </View>}

            </>
        )
    }
}
export default Login;