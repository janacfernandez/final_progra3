/*  import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    evitarSubmit(e) {
        e.preventDefault();

    }

    obtenerDatos(e) {
        this.setState({
            value: e.target.value,
        }, () => this.props.filtrarUser(this.state.value))
    }

    render() {
        return (
            <View>
                <Text>Search</Text>
                <form onSubmit={(e) => this.evitarSubmit(e)} className='formFiltro'>
                    <input placeholder="Filtrar usuarios" onChange={(e) => this.obtenerDatos(e)} type="text" name="usuario" value={this.state.value} />
                </form>
            </View>
        )
    }
}


export default Search; */ 