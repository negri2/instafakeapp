import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker } from 'react-native-maps';
import { Alert } from 'react-native'

export default class Map extends Component {

    state = {
        region: null
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => { //sucesso
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0229,
                        longitudeDelta: 0.0133
                    }
                })
            },
            () => {
                alert('Erro ao carregar localização atual')
            },
            {
                timeout: 10000,
                enableHighAccuracy: true, //location way GPS
                //maximumAge: 1000,
            }
        )
    }

    handleLocationChange = (region) => {
        //buscar aluguéis na nova região
        this.setState({ region })
    }

    render() {
        const { region } = this.state;

        return (
            <MapView
                style={{ flex: 1, width: '100%', height: '100%' }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                loadingEnabled={true}
                region={region}
                onRegionChangeComplete={this.handleLocationChange}>
            </MapView >
        )
    }
}