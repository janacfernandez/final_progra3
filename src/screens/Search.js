import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { db } from '../firebase/config';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            search: false,
            dataSearch: [],
        }
    }

    evitarSubmit(e) {
        e.preventDefault()
        db.collection('datosusuarios').onSnapshot(
            docs => {

                let info = [];

                docs.forEach(doc => {
                    info.push({ id: doc.id, data: doc.data() })
                })
                this.setState({ dataSearch: info, search: true })
            }
        )
    }


    controlChanges(e) {
        this.setState({ value: e.target.value })
    }

    filterUser() {
        let textToFilter = this.state.value.toLowerCase();

        let username = this.state.dataSearch.data.user;
        this.setState({
            dataSearch: username.filter((user) => user.toLowerCase().includes(textToFilter))
        })
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
                <Text> Busca lo que quieras </Text>
                <TextInput keyboardType='default'
                    placeholder='Search '
                    onChangeText={text => this.setState({ value: text })}
                    value={this.state.value}
                    onChange={(e) => this.controlChanges(e)}
                />

                {this.state.value == '' ?
                    <Text> No podes mandar un formulario vacio </Text>
                    :
                    <TouchableOpacity onPress={(e) => this.evitarSubmit(e)}>
                        <Text> Enviar </Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress={() => this.clear()}>
                    <Text> Limpiar búsqueda </Text>
                </TouchableOpacity>

                {this.state.dataSearch.length === 0 ?
                    <Text> Perdón, el usuario no existe </Text>
                    :
                    <FlatList
                        data={this.state.dataSearch}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Text>{item.data.user}</Text>}
                    />
                }

            </View>
        )
    }
}


export default Search; 