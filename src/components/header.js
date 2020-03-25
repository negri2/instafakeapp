import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Header extends Component {

    logout = () => {
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                    <Icon name='bars' style={styles.image} size={20} />
                </TouchableOpacity>

                <Text style={styles.title}>Manager</Text>

                <View style={styles.rightContainer}>
                    <Icon name='sort' style={styles.image} size={20} />
                    <Icon name='filter' style={[styles.image, { marginLeft: 10 }]} size={20} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d3d8db'
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        color: '#555',
        marginRight: 15,
    },
    title: {
        color: '#000',
        fontFamily: 'shelter',
        height: 32,
        fontSize: 28,
        alignItems: 'flex-end',
        borderColor: '#333',
    }
});

export default Header;
