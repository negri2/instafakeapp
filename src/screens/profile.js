import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Gravatar } from 'react-native-gravatar';
import Default from '../styles/default';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Profile extends Component {
    logout = () => {
        this.props.navigation.navigate('Auth')
    }

    render() {
        const options = { email: 'henrique@brainov.com', secure: true }

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.headerContainer}>
                    <View>
                        <Text style={styles.nickname}>Henrique</Text>
                        <Text style={styles.subtitle}>Visualizar e editar perfil</Text>
                    </View>
                    <Gravatar options={options} style={styles.avatar} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={{fontSize: 16}}>Meus aluguéis</Text>
                    <Icon name="home" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={{fontSize: 16}}>Faturamento</Text>
                    <Icon name="dollar-sign" size={20} style={{marginRight: 5}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={{fontSize: 16}}>Configurações</Text>
                    <Icon name="cog" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={{fontSize: 16}}>Envie o seu feedback</Text>
                    <Icon name="paper-plane" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={this.logout}>
                    <Text style={{fontSize: 16}}>Sair</Text>
                    <Icon name="sign-out-alt" size={20} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 75,
    },
    nickname: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,
    },
    headerContainer: {
        marginTop: Platform.OS === 'ios' ? 50 : 30,
        marginBottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingVertical: 20,
        borderTopWidth: 0.7,
        borderColor: '#d6d7da',
    }
})