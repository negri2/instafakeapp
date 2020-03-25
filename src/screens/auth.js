import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Alert
} from 'react-native';
import AuthInput from '../components/authInput';
import axios from 'axios';
import { server, showError } from '../common';
import backgroundImage from '../../assets/imgs/login1.jpg';

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '03425419005',
        password: '12345',
        confirmPassword: '',
    }

    signinOrSignup = async () => {

        if (this.state.stageNew) {
            Alert.alert('Alerta', 'Usuário cadastrado.')
        } else {
            try {
                const res = await axios.post(`${server}/Auth/Token`, {
                    username: this.state.email,
                    password: this.state.password,
                });

                axios.defaults.headers.common['Accept'] = `application/json`;
                axios.defaults.headers.common['Content-Type'] = `application/json`;
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;

                const res2 = axios.get(`${server}/User/Login/App/V2/${this.state.email}/${this.state.password}`)

                this.props.navigation.navigate('Home');

            } catch (err) {
                //se status for diferente de 200 vai cair aqui
                Alert.alert('Alerta', 'Usuário não encontrado.');
                //showError(err);
            }
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage}
                style={styles.backgound}>
                <Text style={styles.title}>Manager</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome' style={styles.input}
                            value={this.state.name} onChangeText={name => this.setState({ name })} />
                    }

                    <AuthInput icon='at' placeholder='E-mail' style={styles.input}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })} />

                    <AuthInput icon='lock' secureTextEntry={true}
                        placeholder='Senha' style={styles.input} value={this.state.password}
                        onChangeText={password => this.setState({ password })} />

                    {this.state.stageNew &&
                        <AuthInput icon='asterisk' secureTextEntry={true}
                            placeholder='Confirmar Senha' style={styles.input} value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10, marginTop: 15, alignItems: 'center' }}
                        onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({

    backgound: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'shelter',
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: 'Lato',
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
        borderRadius: 3,
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        borderRadius: 3,
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 3
    },
    buttonText: {
        fontFamily: 'Lato',
        color: '#FFF',
        fontSize: 20
    }
})