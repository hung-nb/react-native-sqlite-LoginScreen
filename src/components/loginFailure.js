import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Text, Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class Failure extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    let success = this.props.success;
    if (success == false)
      return (
        <Text style={styles.text}>Incorrect username or password!</Text>
      )
    else
      return null;
  }
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'red',
    marginBottom: 10,
  },
});
