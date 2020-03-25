import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Post extends Component {

    state = {
        favorite: this.props.favorite
    }

    setFavorite = () => {
        this.setState({ favorite: !this.state.favorite});
        this.props.callWhereUpdate(this.state.favorite);
    }

    render() {

        return (
            <View style={styles.container}>
                <Image source={this.props.image} style={styles.image} />
                <View style={styles.descriptionContainer}>
                    <Text style={styles.subtitle}>{this.props.type}</Text>
                    <Text style={styles.title}>{this.props.street}</Text>
                    <Text style={styles.subtitle}>{this.props.district}, {this.props.city}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.description}>
                            <Icon name='ruler-combined' style={[styles.image, styles.imageColorSubtitle]} size={16} />
                            <Text style={styles.subtitle}>{this.props.metreage} m²</Text>
                        </View>
                        {
                            !this.props.numRooms ? null :
                            <View style={[styles.description, { marginLeft: 30 }]}>
                                <Icon name='bed' style={[styles.image, styles.imageColorSubtitle]} size={16} />
                                <Text style={styles.subtitle}>{this.props.numRooms} dorms</Text>
                            </View>
                        }
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.subtitle}>Aluguel R$ {this.props.rentValue}</Text>
                            <Text style={[styles.title, { color: 'green' }]}>Total R$ {this.props.value}</Text>
                        </View>

                        <TouchableOpacity style={[styles.circleIcon, { marginRight: 10 }]} 
                            onPress={this.setFavorite}>
                            {
                                this.state.favorite
                                    ? <Icon name='heart' style={[styles.image, { color: 'red' }]} size={20} />
                                    : <Icon name='heart' style={styles.image} size={20} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    image: {
        maxWidth: "100%",
        maxHeight: Dimensions.get('window').width * 3 / 4,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    imageColorSubtitle: {
        color: '#868e96',
    },
    descriptionContainer: {
        flex: 1,
        padding: 10,
        borderWidth: 0.5,
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#d6d7da',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        marginLeft: 5,
        marginTop: 8,
        marginBottom: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444'
    },
    subtitle: {
        color: '#868e96',
        marginLeft: 5,
    },
    description: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5,
        color: '#868e96'
    },
    circleIcon: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Post;