import React, { Component } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text, TextInput, Platform, LayoutAnimation, UIManager, CheckBox } from 'react-native';
import Header from '../components/header';
import Post from '../components/post';
import Default from '../styles/default';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RangeSlider from 'react-native-range-slider'
import Menu, { MenuItem } from 'react-native-material-menu';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Map from '../components/mapView';

const INITIAL_STATE = {
    search: null,
    isFilterVisible: true,
    openFilter: false,
    mapViewer: false,
    posts: [
        {
            id: Math.random(),
            nickname: 'Henrique Negri',
            email: 'henrique@realdrive.tech',
            image: require('../../assets/imgs/ap1.png'),
            type: 'Apartamento',
            street: 'Rua Sinimbú',
            district: 'Lourdes',
            city: 'Caxias do Sul',
            metreage: '200',
            numRooms: '4',
            rentValue: '800',
            value: '1.130',
            favorite: false,
            visible: true,
            comments: [],
            imagesSlider: [
                'https://i.imgur.com/UYiroysl.jpg',
                'https://i.imgur.com/UPrs1EWl.jpg',
                'https://i.imgur.com/MABUbpDl.jpg'
            ]
        },
        {
            id: Math.random(),
            nickname: 'João Otário',
            email: 'otario.vv@gmail.com',
            image: require('../../assets/imgs/ground.jpg'),
            type: 'Terreno',
            street: 'Rua Júlio de Castilhos',
            district: 'São Pelegrino',
            city: 'Caxias do Sul',
            metreage: '300',
            numRooms: '',
            value: '150.900',
            favorite: false,
            visible: true,
            comments: [],
            imagesSlider: [
                'https://i.imgur.com/UYiroysl.jpg',
                'https://i.imgur.com/UPrs1EWl.jpg',
                'https://i.imgur.com/MABUbpDl.jpg'
            ]
        },
        {
            id: Math.random(),
            nickname: 'Paula Tejando',
            email: 'paulinha@gmail.com',
            image: require('../../assets/imgs/home.jpg'),
            type: 'Casa',
            street: 'Rua Matteo Gianella',
            district: 'Santa Catarina',
            city: 'Caxias do Sul',
            metreage: '200',
            numRooms: '4',
            rentValue: '1.100',
            value: '1.300',
            favorite: false,
            visible: true,
            comments: [],
            imagesSlider: [
                'https://i.imgur.com/UYiroysl.jpg',
                'https://i.imgur.com/UPrs1EWl.jpg',
                'https://i.imgur.com/MABUbpDl.jpg'
            ]
        }
    ]
}

export default class Feed extends Component {

    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this.state = INITIAL_STATE;
    }

    _listViewOffset = 0;
    _menu = null;

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

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    _onScroll = (event) => {
        const CustomLayoutLinear = {
            duration: 300,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
        }

        const currentOffset = event.nativeEvent.contentOffset.y
        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
            ? 'down'
            : 'up'

        const isButtonVisible = direction === 'up'
        if (isButtonVisible !== this.state.isFilterVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({ isFilterVisible: isButtonVisible })
        }

        this._listViewOffset = currentOffset
    }

    openFilter = () => {
        const CustomLayoutLinear = {
            duration: 300,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
        }

        LayoutAnimation.configureNext(CustomLayoutLinear);
        this.setState({ openFilter: !this.state.openFilter });
    }

    updatePost = favorite => {
        this.setState({ favorite });
    }

    changeVisualization = () => {
        this.setState({ mapViewer: !this.state.mapViewer })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.mapViewer
                        ? <Map />
                        : <FlatList contentContainerStyle={styles.listContainer}
                            showsVerticalScrollIndicator={false}
                            data={(this.state.posts || []).filter(i => i.visible === true)}
                            keyExtractor={item => `${item.id}`}
                            onScroll={this._onScroll}
                            renderItem={({ item }) =>
                                <Post key={item.id} {...item} callWhereUpdate={this.updatePost} />
                            }>
                        </FlatList>
                }
                <View style={styles.searchSection}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={this.props.navigation.toggleDrawer}>
                        <Icon style={styles.searchIcon} name="bars" size={16} color="#636364" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquise um lugar..."
                        underlineColorAndroid="transparent"
                        onChangeText={(search) => this.filterPlace(search)}
                    />
                    <Text value={this.state.search} />
                </View>
                {
                    this.state.isFilterVisible ?
                        <View style={styles.floatButtoms}>
                            <TouchableOpacity
                                style={{ marginLeft: 15, flexDirection: "row" }}
                                activeOpacity={0.7}
                                onPress={this.showMenu}>
                                <Menu ref={this.setMenuRef} button={<Text />}>
                                    <MenuItem onPress={this.hideMenu}>Maior valor</MenuItem>
                                    <MenuItem onPress={this.hideMenu}>Menor valor</MenuItem>
                                </Menu>
                                <Icon name="sort" size={16} color="#512da8" />
                                <Text style={{ marginLeft: 5 }}>Ordenar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: "row", borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#d6d7da', paddingHorizontal: 20 }}
                                activeOpacity={0.7}
                                onPress={this.openFilter}>
                                <Icon name="filter" size={16} color="#512da8" />
                                <Text style={{ marginLeft: 5 }}>Filtrar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginRight: 15 }}
                                activeOpacity={0.7}
                                onPress={this.changeVisualization}>
                                {
                                    this.state.mapViewer
                                        ? <View style={{ flexDirection: "row" }}>
                                            <Icon name="list" size={16} color="#512da8" />
                                            <Text style={{ marginLeft: 5 }}>Lista</Text>
                                        </View>
                                        : <View style={{ flexDirection: "row" }}>
                                            <Icon name="map" size={16} color="#512da8" />
                                            <Text style={{ marginLeft: 5 }}>Mapa</Text>
                                        </View>
                                }
                            </TouchableOpacity>
                        </View>
                        : null
                }
                {
                    this.state.openFilter
                        ? <View style={styles.filterContainer}>
                            <Text style={styles.filterTitle}>Tipo</Text>
                            <View style={styles.filterRow}>
                                <Text>Apartamento</Text>
                                <CheckBox />
                            </View>
                            <View style={styles.filterRow}>
                                <Text>Casa</Text>
                                <CheckBox />
                            </View>
                            <View style={styles.filterRow}>
                                <Text>Terreno</Text>
                                <CheckBox />
                            </View>
                            <Text style={styles.filterTitleBorderTop}>Metragem</Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Min.</Text>
                                <TextInput style={styles.inputFilter} keyboardType='numeric' />
                                <Text>Máx.</Text>
                                <TextInput style={styles.inputFilter} keyboardType='numeric' />
                            </View>
                            <Text style={styles.filterTitleBorderTop}>Valor</Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Min.</Text>
                                <TextInput style={styles.inputFilter} keyboardType='decimal-pad' />
                                <Text>Máx.</Text>
                                <TextInput style={styles.inputFilter} keyboardType='decimal-pad' />
                            </View>
                            <TouchableOpacity style={styles.buttonFilter}
                                onPress={this.openFilter}>
                                <Text style={styles.buttonText}>
                                    Filtrar
                                </Text>
                            </TouchableOpacity>
                        </View>
                        : null
                }
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
    searchSection: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 7,
        marginBottom: 5,
        marginLeft: 7,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },
    searchIcon: {
        padding: 12,
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    searchInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        height: 41,
        width: '100%',
        backgroundColor: '#fff',
        color: '#424242',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    listContainer: {
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    floatButtoms: {
        position: 'absolute',
        width: 300,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 20,
        backgroundColor: '#fff',
        borderWidth: 0.7,
        borderColor: '#512da8',
        borderRadius: 50
    },
    filterContainer: {
        position: 'absolute',
        width: '95%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        bottom: 0,
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: 0.7,
        borderColor: '#d6d7da',
        borderRadius: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },
    filterTitle: {
        fontSize: 20,
        paddingVertical: 10,
    },
    filterTitleBorderTop: {
        fontSize: 20,
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 10,
        borderTopWidth: 0.7,
        borderColor: '#d6d7da',
        width: '100%'
    },
    filterRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonFilter: {
        backgroundColor: '#080',
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 3,
        alignSelf: 'center'
    },
    buttonText: {
        fontFamily: 'Lato',
        color: '#FFF',
        fontSize: 20,
    },
    inputFilter: {
        flex: 1,
        marginHorizontal: 10,
        height: 35,
        backgroundColor: '#fff',
        borderWidth: 0.7,
        borderColor: '#d6d7da',
        color: '#424242',
        borderRadius: 5
    },
})