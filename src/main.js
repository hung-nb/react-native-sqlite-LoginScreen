import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

import { isSignedIn } from "./authentication";
import { MainNavigator } from './config/routes';

export default class App extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
    {
        this.setState({ signedIn: false, checkedSignIn: false })
    }
  }

  render() {
    const { 
        checkedSignIn, 
        signedIn } = this.state;
    
    const Layout = MainNavigator(signedIn);
    return <Layout />;
  };
}