import React from 'react';
import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './screens/feed';
import Favorite from './screens/favorite';
import Profile from './screens/profile';
import Auth from './screens/auth'
import AuthOtherPlatform from './screens/authOtherPlatform'

const MenuRoutes = {
    Feed: {
        name: 'Feed',
        screen: Feed,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='search' size={30} color={tintColor} />
        }
    },
    Favorite: {
        name: 'Favorite',
        screen: Favorite,
        navigationOptions: {
            title: 'Favoritos',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='heart' size={25} color={tintColor} />
        }
    },
    Profile: {
        name: 'Profile',
        screen: Profile,
        navigationOptions: {
            title: 'Meu acesso',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='user' size={30} color={tintColor} />
        }
    },
}

const MenuNavigator = createDrawerNavigator(MenuRoutes);

const loginOrProfileRouter = createSwitchNavigator(
    {
        Home: MenuNavigator,
        Auth: AuthOtherPlatform
    }, {
        initialRouteName: 'Auth'
    })

export default loginOrProfileRouter;