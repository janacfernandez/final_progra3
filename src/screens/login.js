import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            error: [],
            loading: true,
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            console.log(user.email)
            if (user){
                this.props.navigation.navigate('TabContainer');
            }
            this.setState({
                loading: false,
            })
        })
    }

        onSubmit() {
            //Colocar el método de registración de Firebase
            auth.signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(response => {
                    console.log(response);
                    console.log(`El email ingresado es: ${this.state.email}`);
                    console.log(`La contraseña ingresada es: ${this.state.password}`);
                    this.setState({ loggedIn: true })
                    this.props.navigation.navigate('TabContainer');
                })
                .catch(error => console.log(error))
        }


        render() {
            return (
                <>
                {this.state.loading ? <Image style={styles.loading} source={require('../images/Loading_icon.gif')}></Image> : <View style={styles.container}>
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.text}> No tenes una cuenta? Crea una!</Text>
                    </TouchableOpacity>
                </View>}
                
                </>
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

export default Login;