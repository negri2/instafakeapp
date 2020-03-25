import {Alert} from 'react-native';

const server  = 'https://api-address/api';


function showError(err) {
    Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${err}`);
}

export {server, showError};