import { CurrentRenderContext } from '@react-navigation/native';
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, FlatList } from 'react-native';
import TabContainter from '../components/TabContainer';
import { auth, db } from '../firebase/config';
import Search from './Search';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            description: "",
            posteos: [],
            loading: true,
            comentario: ''
        }
    }

    componentDidMount() {
        db.collection('Posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteos: posts,
                        loading: false,
                    })
                })
            }
        )
        console.log(auth.currentUser)
    }

    render() {
        const styles = StyleSheet.create({
            image: {
                height: 200,
            },
            loading: {
                height: 200,
            },
            field: {
                borderColor: '#dcdcdc',
                borderWidth: 1,
                borderRadius: 2,
                padding: 3,
                marginBottom: 8
            },
            flatlist: {
                width: '100%',
                flex: 1
            },

        })


        return (
            <>
                {this.state.loading ? <Image style={styles.loading} source={require('../images/Loading_icon.gif')}></Image> : <View style={styles.flatlist}> <Search />
                    <FlatList data={this.state.posteos} keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <><Image style={styles.image} source={{ uri: item.data.photo }} resizeMode='contain' /><Text>{item.data.post}</Text> <TextInput
                            style={styles.field}
                            keyboardType='default'
                            placeholder='Comentar'
                            onChangeText={text => this.setState({ comentario: text })}
                            value={this.state.comentario}
                        /></>}
                    />
                </View>}
            </>



        )
    }
}

export default Home;