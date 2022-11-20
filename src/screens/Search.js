import { Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db } from "../firebase/config";
import SearchResults from '../components/SearchResults'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: false,
            value: '',
            users: [],
            filteredUsers: [],
            usersError: '',
        }
    }

    componentDidMount() {
        db.collection('datosusuarios').onSnapshot(
            docs => {
                let info = [];
                docs.forEach(doc => {
                    info.push({ id: doc.id, data: doc.data() })
                })
                this.setState({ users: info })
            }
        )
    }
    preventSubmit(e) {
        e.preventDefault()
        this.setState({ usersError: '' });

        let textToFilter = this.state.value.toLowerCase();

        if (this.state.value === '') {
            this.setState({ requiredField: 'No es válido enviar un formulario vacio, intentelo de nuevo' })
        } else {
            console.log(this.state.users)
            this.setState({ requiredField: '' })
            const filteredUsers = this.state.users?.filter((user) => user.data.user?.toLowerCase().includes(textToFilter));
            console.log(filteredUsers)
            if (filteredUsers.length === 0) return this.setState({ usersError: 'El usuario no existe, intenta algo diferente', filteredUsers: [] })
            this.setState({ filteredUsers: filteredUsers })
        }

    }

    controlChanges(e) {
        this.setState({ value: e.target.value })
    }


    render() {

        return (
            <View style={styles.div}>
                <Text style={styles.title}> Busca lo que desees </Text>

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='Filtrar resultado'
                    onChangeText={text => this.setState({ value: text })}
                    value={this.state.value}
                    onChange={(e) => this.controlChanges(e)}
                />
                <Text style={styles.error}>{this.state.requiredField}</Text>
                <TouchableOpacity onPress={(e) => this.preventSubmit(e)}>
                    <Text style={styles.button}> Buscar </Text>
                </TouchableOpacity>

                <Text style={styles.error}>{this.state.usersError}</Text>

                <FlatList
                    data={this.state.filteredUsers}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <TouchableOpacity> <SearchResults style={styles.results} navigation={this.props.navigation} user={item.data} />  </TouchableOpacity>}
                />


            </View>

        )
    }
}

const styles = StyleSheet.create({
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '2%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)',
    },
    div: {
        display: 'flex',
        alignItems: 'center',
        margin: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#008b8b',
        margin: '3%',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#008b8b',
        borderRadius: '15px',
        margin: '2%',
        padding: '1%',
        fontSize: 15,
        color: 'white',
    },
    text: {
        fontSize: 50,
        color: '#008b8b',
        height: 100,
        margin: 5,
    },
    error: {
        color: 'red',
        marginTop: '3%',
        textAlign: 'center',
        fontSize: 15,
    },
})



export default Search; 