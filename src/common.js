import {Alert} from 'react-native';

const server  = 'https://monitoramento.realdrive.com.br/api';


function showError(err) {
    Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${err}`);
}

export {server, showError};