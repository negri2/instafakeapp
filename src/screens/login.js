import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Default from '../styles/default';

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    login = () => {
        this.props.navigation.navigate('Profile');
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='Email' style={styles.input}
                    autoFocus={true} keyboardType='email-address'
                    value={this.state.email} onChangeText={email => this.setState(email)} />
                <TextInput placeholder='Senha' style={styles.input}
                    secureTextEntry={true} value={this.state.password}
                    onChangeText={password => this.setState(password)} />
                <TouchableOpacity onPress={this.login}
                    style={Default.buttom}>
                    <Text style={Default.buttomText}>Login</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Text style={styles.textRegister}>Não tem uma conta?</Text>
                    <Text style={styles.linkRegister}
                        onPress={() => { }}>Cadastre-se</Text>
                </View>
                {/* <TouchableOpacity onPress={() => { }}
                    style={Default.buttom}>
                    <Text style={Default.buttomText}>Cadastrar-se</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: 3,
    },
    textRegister: {
        color: '#000',
        fontSize: 16
    },
    linkRegister: {
        color: '#0454a2',
        fontSize: 16,
        marginLeft: 5
    }
})