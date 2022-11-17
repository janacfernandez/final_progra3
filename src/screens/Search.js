import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
/* import SearchResults from '../components/SearchResults'; */
import { db } from '../firebase/config';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            search: false,
            users: [],
            filteredUsers: [],
            usersError: ''
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

    evitarSubmit(e) {
        e.preventDefault()
        this.setState({ usersError: '' });

        let textToFilter = this.state.value.toLowerCase();

        if (this.state.value === '') {
            this.setState({ requiredField: 'No podes mandar un formulario vacio' })
        }
        else {
            console.log(this.state.users)
            this.setState({ requiredField: '' })

            const filteredUsers = this.state.users?.filter((user) => user.data.user.toLowerCase().includes(textToFilter));

            console.log(filteredUsers)

            if (filteredUsers.length === 0) return this.setState({ usersError: 'Perdón, ese usuario no existe', filteredUsers: [] })


            this.setState({ filteredUsers: filteredUsers })
        }
    }


    controlChanges(e) {
        this.setState({ value: e.target.value })
    }

    clear() {
        this.setState({
            dataSearch: [],
            search: false,
            value: '',
        })
    };


    render() {
        return (
            <View>
                <Text style={styles.title}> Busca lo que quieras </Text>
                <TextInput keyboardType='default'
                    placeholder='Search '
                    onChangeText={text => this.setState({ value: text })}
                    value={this.state.value}
                    onChange={(e) => this.controlChanges(e)}
                />


                <TouchableOpacity onPress={(e) => this.evitarSubmit(e)}>
                    <Text styles={styles.button}> Enviar </Text>
                </TouchableOpacity>

                <Text style={styles.error}>{this.state.requiredField}</Text>

                <TouchableOpacity onPress={() => this.clear()}>
                    <Text> Limpiar búsqueda </Text>
                </TouchableOpacity>

                <Text>{this.state.usersError}</Text>

                <FlatList
                    data={this.state.filteredUsers}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Text>{item.data.user}</Text>}
                />


            </View>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: '8%',
    },
    button: {
        backgroundColor: '#008b8b',
        borderRadius: '15px',
        marginTop: '5%',
        margin: '2%',
        padding: '1%',
        textAlign: 'center',
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
        marginTop: '1%',
        textAlign: 'center',
        fontSize: 12,
    },
})



export default Search; 