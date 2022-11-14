import React, { Component } from 'react'
import { View, Image, StyleSheet, TextInput, FlatList } from 'react-native';
import Post from '../components/Post';
import { auth, db } from '../firebase/config';
import Search from './Search';


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
        console.log(auth.currentUser)
    }

    onComentar(){
        db.collection('Comentarios').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            comentario: this.state.comentario,
        })
        .then(()=> { 
            this.props.navigation.navigate('Home')  
})
        .catch(e => console.log(e)) 
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
            list: {
                width: '100%',
                flex: 1
            },

        })

        return (
            <>
                {this.state.loading ? <Image style={styles.loading} source={require('../images/Loading_icon.gif')}></Image> : 
                
                <View style={styles.list}>
                    <Search />
                    <FlatList 
                    data={this.state.posts} 
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item})=> <Post dataPost={item}/>}
                    />
                </View>

                // <View style={styles.flatlist}>

                    
                //     <FlatList data={this.state.posteos} keyExtractor={item => item.id.toString()}
                //         renderItem={({ item }) => <><Image style={styles.image} source={{ uri: item.data.photo }} resizeMode='contain' /><Text>{item.data.post}</Text> <TextInput
                //             style={styles.field}
                //             keyboardType='default'
                //             placeholder='Comentar'
                //             onChangeText={text => this.setState({ comentario: text })}
                //             value={this.state.comentario}/>
                //             <TouchableOpacity onPress = {()=>this.onComentar()}></TouchableOpacity>
                //             </>}
                //     />
                // </View>
                }
            </>



        )
    }
}

export default Home;