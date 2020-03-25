import React, { Component } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text, TextInput, Platform } from 'react-native';
import Header from '../components/header';
import Post from '../components/post';
import Icon from 'react-native-vector-icons/FontAwesome5';

const INITIAL_STATE = {
    posts: [
        {
            id: Math.random(),
            nickname: 'João Otário',
            email: 'otario.vv@gmail.com',
            image: require('../../assets/imgs/ground.jpg'),
            type: 'Terreno',
            street: 'Rua Sinimbú',
            district: 'Lourdes',
            city: 'Caxias do Sul',
            metreage: '300',
            numRooms: '',
            value: '150.900',
            favorite: true,
            comments: [],
        }
    ]
}

export default class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    filterPlace = (term) => {

        if (!term || term === '') {
            this.setState(state => {
                const list = state.posts.map((item, index) => {
                    item.visible = true;
                    return item;
                });

                return {
                    list,
                };
            });

            return;
        }

        this.setState(state => {
            const list = state.posts.map((item, index) => {
                if (item.type.toLowerCase().indexOf(term.toLowerCase()) > -1) {
                    item.visible = true;
                }
                else if (item.street.toLowerCase().indexOf(term.toLowerCase()) > -1) {
                    item.visible = true;
                }
                else if (item.district.toLowerCase().indexOf(term.toLowerCase()) > -1) {
                    item.visible = true;
                }
                else if (item.city.toLowerCase().indexOf(term.toLowerCase()) > -1) {
                    item.visible = true;
                } else {
                    item.visible = false;
                }
                return item;
            });

            return {
                list,
            };
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <Icon style={styles.searchIcon} name="search" size={20} color="#636364" />
                    <TextInput
                        style={styles.input}
                        placeholder="pesquise um lugar..."
                        underlineColorAndroid="transparent"
                        onChangeText={(search) => this.filterPlace(search)}
                    />
                    <Text value={this.state.search} />
                </View>
                <FlatList contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <Post key={item.id} {...item} />} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingRight: 13,
        paddingBottom: 5,
        paddingLeft: 13,
    },
    searchIcon: {
        padding: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        height: 40,
        width: '90%',
        backgroundColor: '#fff',
        color: '#424242',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
})