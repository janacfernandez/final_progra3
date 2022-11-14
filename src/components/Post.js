import React, {Component} from "react";
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';

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
            </View>
        )
    }
}

export default Post;