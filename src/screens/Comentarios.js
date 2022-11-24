import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';

class Comentarios extends Component {
    constructor() {
        super();
        this.state = {
            comentarios:[],
            comentario: "",
            error: ''
        }
    }

    componentDidMount(){
        db.collection('Posts')
              .doc(this.props.route.params.id)
              .onSnapshot(doc => {
                  this.setState({
                      comentarios:doc.data().comentarios
                  })
              })
      }

    onComentar(){
        db.collection('Posts')
        .doc(this.props.route.params.id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({owner: auth.currentUser.email, text: this.state.comentario, createdAt: Date.now()})
        })
        .then(()=> {
            this.setState({
                comentario: '',
            })
        })
        .catch((e)=>{
            this.setState({
                error: e.message
            })
        })
}

    render() {
        const styles = StyleSheet.create({
            field: {
                borderColor: '#dcdcdc',
                borderWidth: 2,
                borderRadius: 2,
                padding: 3,
                marginBottom: 8
            },
            container: {
                margin: 3,
                border: '1px solid #008b8b ',
                backgroundColor: 'white',
                paddingVertical: 5,
                paddingHorizontal: 8,
            },
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
        })
        
        return (
            <>
            {this.state.error != '' ? <Text>Ocurrio el siguiente error {this.state.error}</Text> :
                <React.Fragment>
                <AntDesign onPress={()=>this.props.navigation.pop()} name="doubleleft" size={24} color="black" />
                <AntDesign onPress={()=>this.props.navigation.navigate('Home')} name="home" size={24} color="black" />

                {this.state.comentarios.length === 0 ? <Text>Aún no hay comentarios.</Text> :
                        <FlatList
                            data={this.state.comentarios.sort((a, b) => b.createdAt - a.createdAt)}
                            keyExtractor={item => item.createdAt.toString()}
                            renderItem={({ item }) => <><TouchableOpacity onPress={()=>this.props.navigation.navigate('Usuario', {usuario: item.owner})}><Text>{item.owner}</Text></TouchableOpacity><Text style = {styles.container}>{item.text}</Text></>}
                        />}
                <View>
                        <TextInput
                            style={styles.field}
                            keyboardType='default'
                            placeholder='Dejá tu comentario'
                            onChangeText={text => this.setState({ comentario: text })}
                            value={this.state.comentario} />

                        {this.state.comentario == '' ? <Text style={styles.grey}>Comentar</Text> : <TouchableOpacity onPress={() => this.onComentar()}><Text style = {styles.blue}>Comentar</Text></TouchableOpacity>}
                </View>
                </React.Fragment>}
            </>
        )
    }
}

export default Comentarios;