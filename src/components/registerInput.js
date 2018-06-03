import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { InputGroup, Input, Text, Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { FontAwesome } from '@expo/vector-icons';

export default class RegInput extends Component {
  constructor(props) {
    super(props);
  }

  _updateParentState(text) {
    this.props.updateInputText(this.props.title, text);
  }

  render() {
    return(
      <View>
        {/* <Text style={styles.title}>{this.props.title}</Text> */}
        <InputGroup>
          <FontAwesome 
              name='user'
              style={styles.icon}
            />
            <Input 
                style={
                    this.props.data.validation == true ?
                        styles.input
                        :
                        styles.input_failure
                }
                // placeholder={
                //     this.props.data.validation == true ?
                //         null
                //         :
                //         'Please input...'
                // }
                // placeholderTextColor='white'
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
    marginLeft: 20,
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
});
