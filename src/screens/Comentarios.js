import React, { Component } from 'react'
import { View, Image, StyleSheet, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';


class Comentarios extends Component {
    constructor() {
        super();
        this.state = {
            comentarios:[],
            comentario: "",
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
            console.log(e)
        })
}

    render() {
        const styles = StyleSheet.create({
            field: {
                borderColor: '#dcdcdc',
                borderWidth: 1,
                borderRadius: 2,
                padding: 3,
                marginBottom: 8
            },
        })
        return (
            <>

                <View>
                    <AntDesign onPress={()=>this.props.navigation.navigate('Home')} name="doubleleft" size={24} color="black" />

                    <FlatList
                        data={this.state.comentarios}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={({ item }) => <Text>{item.text}</Text>}
                    />

                    <TextInput
                        style={styles.field}
                        keyboardType='default'
                        placeholder='Comentar'
                        onChangeText={text => this.setState({ comentario: text })}
                        value={this.state.comentario} />
                    <TouchableOpacity onPress={() => this.onComentar()}><Text>Comentar</Text></TouchableOpacity>
                </View>
            </>
        )
    }
}

export default Comentarios;