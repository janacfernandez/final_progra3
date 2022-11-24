import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase/config';
import Search from './Search';

const styles = StyleSheet.create({
    image: {
        height: 200,
    },
    loading: {
        marginTop: 250,
    },
    field: {
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding: 3,
        marginBottom: 8
    },
    list: {
        width: '100%',
        flex: 1
    },
    loading:{
        marginTop: 250,
    }
})

class Home extends Component {
    constructor() {
        super();
        this.state = {
            description: "",
            posts: [],
            loading: true,
            comentario: ''
        }
    }

    componentDidMount() {
        db.collection('Posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posteos,
                        loading: false,
                    })
                })
            }
        )
    }

    irComentarios() {
        this.props.navigation.navigate('Comentarios')
    }

    render() {
       
        return (
            <>
                {this.state.loading ? <ActivityIndicator style={styles.loading} color='#008b8b' size='large' /> : 

                <View style={styles.list}>
                    <Search navigation = {this.props.navigation} />
                    <FlatList 
                    data={this.state.posts} 
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item})=> <Post dataPost={item} navigation={this.props.navigation}/> }
                    />
                </View>
                }
            </>
        )
    }
}

export default Home;