import React, { Component } from 'react';
import { InputGroup, ListItem, Button, Text, Container, Header, Content, Form, Item, Input } from 'native-base';
import { Dimensions, Alert, TextInput, View, StyleSheet } from 'react-native';
import { SQLite } from 'expo';

import Utilities from '../class/utilities'
import Setting from '../config/setting'

const db = SQLite.openDatabase('mydb.db');

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: "",
                validation: true
            },
        }
    }

    _validateValue() {

        if (Utilities.ValidationHelper.validateEmail(this.state.email.value) == false) {
            let newState = {
                value: this.state.email.value,
                validation: false
            };
            this.setState({email:newState});
            return false;
        }

        return true;
    }

    _sendEmail() {
        if (this._validateValue())
        {
            Alert.alert(
                "Email sent",
                "Please check your registered email to reset your account!",
                [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('Login', {})},
                ],
                { cancelable: false }
            );
        }
    }

    _updateState(text) {
        let newState = {
            value: text,
            validation: text == "" ? false : true
        };
        this.setState({email:newState});
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.email.validation == true ?
                    null
                    :
                    <Text style={styles.invalidEmail}>Invalid email address</Text>
                }
                <InputGroup>
                    <Input 
                        style={styles.input}
                        placeholder="Enter your registered email address"
                        onChangeText={(text) => this._updateState(text)}
                        value={this.state.value}

                        style={
                            this.state.email.validation == true ?
                                styles.input
                                :
                                styles.input_failure
                        }
                        placeholderTextColor={
                            this.state.email.validation == true ?
                            null
                            :
                            'white'
                        }
                    />
                </InputGroup>
                <Button style={styles.button}
                    onPress={this._sendEmail.bind(this)}>
                    <Text>{Setting.Constants.RESET}</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#ecf0f1',
    },
    input: {
        marginLeft: 20,
        marginRight: 30,
        marginBottom: 10,
        height: 42,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 8,
    },
    input_failure: {
        marginLeft: 20,
        marginRight: 30,
        marginBottom: 10,
        height: 42,
        backgroundColor: 'red',
        borderRadius: 8,
    },
    button: {
        marginTop: 15,
        width: 300,
        alignSelf: 'center',
        justifyContent: "center",
      },
    invalidEmail: {
        marginLeft: 20,
        marginTop: -6,
        marginBottom: 8,
        fontSize: 14,
        color: 'red'
    }
});
