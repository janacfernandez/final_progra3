import { Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, { Component } from 'react';
import { auth} from '../firebase/config';

const styles = StyleSheet.create({
    texto: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    imagen: {
        height: 70,
        width: 70,
        borderRadius: 30,
        borderColor: 'white',
        alignSelf: 'center',
    },
    padre: {
        flexDirection: 'column',
    }

});

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

/*     goToProfile(user) {
        this.props.navigation.navigate('Ir atrás', { user: user })
    } */


    render() {
        return (
            <TouchableOpacity onPress={() => this.user()}> <View style={styles.padre}>  <Image source={this.props.user.img} style={styles.imagen} />


                {this.props.user.owner == auth.currentUser.email ?
                    <Text style={styles.texto} onPress={() => this.props.navigation.navigate("Profile")}> Mail: {this.props.user.owner}</Text>
                    :
                    <Text style={styles.texto} onPress={() => this.goToProfile(this.props.user.owner)}> Mail: {this.props.user.owner}</Text>
                }


                <Text style={styles.texto}> Usuario: {this.props.user.user} </Text> </View>
            </TouchableOpacity>
        )
    }
}

export default SearchResults;