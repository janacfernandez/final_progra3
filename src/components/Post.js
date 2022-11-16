import React, {Component} from "react";
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from "firebase";
import { FlatList } from "react-native-web";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            posteos: [],
            loading: true,
            comentario: ''
        }
    }

    onComentar(){
        db.collection('Posts')
        .doc(this.props.id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({owner: auth.currentUser.email, text: this.state.comentario, author: auth.currentUser.email, createdAt: Date.now()})
        })
        .catch((e)=>{
            console.log(e)
        })
}

    render(){
        const styles = StyleSheet.create({
            image: {
                height: 200,
            },
            field: {
                borderColor: '#dcdcdc',
                borderWidth: 1,
                borderRadius: 2,
                padding: 3,
                marginBottom: 8
            },
        })

        return(
            <View>
                <Image style={styles.image} source={{ uri: this.props.photo }} resizeMode='contain' />
                <Text>{this.props.post}</Text>
                <TextInput
                            style={styles.field}
                            keyboardType='default'
                            placeholder='Comentar'
                            onChangeText={text => this.setState({ comentario: text })}
                            value={this.state.comentario}/>

                <TouchableOpacity onPress = {()=>this.onComentar()}><Text>Comentar</Text></TouchableOpacity>

                <FlatList data={this.props.comentarios} keyExtractor={item => item.createdAt.toString()} renderItem={({item})=> <Text>{item.text}</Text>}/>
            </View>
        )
    }
}

export default Post;