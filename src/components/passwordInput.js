import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { InputGroup, Input, Text, Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import Setting from '../config/setting'

export default class EmailInput extends Component {
  constructor(props) {
    super(props);
  }

  _updateParentState(text) {
    this.props.updateInputText(this.props.title, text);
  }

  render() {
    return(
      <View>
        {
            this.props.data.validation == true ?
                null
                :
                <Text style={styles.invalidPassword}>Password must have at least 6 characters</Text>
        }
        <InputGroup>
            <FontAwesome 
                name='lock'
                style={styles.icon}
              />
            <Input 
                style={
                    this.props.data.validation == true ?
                        styles.input
                        :
                        styles.input_failure
                }
                placeholder={
                  this.props.data.validation == true ?
                      this.props.title
                      :
                      this.props.title
                }
                placeholderTextColor={
                  this.props.data.validation == true ?
                      '#606060'
                      :
                      'white'
                }
                secureTextEntry={true}
                onChangeText={(text) => this._updateParentState(text)}
                value={this.props.data.value}
            />
        </InputGroup>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
        marginLeft: 20,
        marginBottom: 8,
  },
  icon: {
    marginLeft: 15,
    fontSize: 20,
    color: 'blue'
  },
  input: {
        marginLeft: 10,
        marginRight: 30,
        marginBottom: 10,
        height: 42,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 8,
  },
  input_failure: {
        marginLeft: 10,
        marginRight: 30,
        marginBottom: 10,
        height: 42,
        backgroundColor: 'red',
        borderRadius: 8,
  },
  invalidPassword: {
        marginLeft: 50,
        fontSize: 14,
        color: 'red'
  }
});
