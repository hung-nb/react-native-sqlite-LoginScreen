import React from 'react'
import { Text, StyleSheet } from 'react-native'
import {SwitchNavigator, StackNavigator} from 'react-navigation';

import Login from '../components/login';
import Register from '../components/register';
import Forget from '../components/forgetAccount';
import Welcome from '../components/welcome';

export const SignedIn = StackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            header: null
          }
    },
});

export const SignedOut = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
          header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
          title: 'Sign up',
        }
    },
    Forget: {
      screen: Forget,
      navigationOptions: {
        title: 'Reset account',
      }
  },
});

export const MainNavigator = (signedIn = false) => {
    return SwitchNavigator(
      {
        SignedIn: {
          screen: SignedIn
        },
        SignedOut: {
          screen: SignedOut
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    );
  };