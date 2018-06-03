import React, { Component } from 'react';
import { InputGroup, ListItem, Button, Text, Container, Header, Content, Form, Item, Input } from 'native-base';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import { SQLite } from 'expo';

import Utilities from '../class/utilities'
import Setting from '../config/setting'

import RegInput from './registerInput'
import EmailInput from './emailInput'
import PasswordInput from './passwordInput'
import UsernameInput from './usernameInput'

const db = SQLite.openDatabase('mydb.db');

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: {
                value: "",
                validation: true,
            },
            lastname:  {
                value: "",
                validation: true,
            },
            email:  {
                value: "",
                validation: true,
            },
            username:  {
                value: "",
                validation: true,
                checkExist: true,
            },
            password:  {
                value: "",
                validation: true,
            },
        }

        this._updateInputText = this._updateInputText.bind(this);
    }

    _validateValues() {
        let returnVal = true;
        let newState = {
            value: "",
            validation: false
        };
        if (this.state.firstname.value == "") {
            this.setState({firstname:newState});
            returnVal = false;
        }
        if (this.state.lastname.value == "") {
            this.setState({lastname:newState});
            returnVal = false;
        }
        if (this.state.username.value == "") {
            newState = {
                value: "",
                validation: false,
                checkExist: true,
            };
            this.setState({username:newState});
            returnVal = false;
        }
        if (Utilities.ValidationHelper.validatePassword(this.state.password.value) == false) {
            newState = {
                value: this.state.password.value,
                validation: false
            };
            this.setState({password:newState});
            returnVal = false;
        }
        if (Utilities.ValidationHelper.validateEmail(this.state.email.value) == false) {
            newState = {
                value: this.state.email.value,
                validation: false
            };
            this.setState({email:newState});
            returnVal = false;
        }
        
        return returnVal;
    }

    _onRegister() {
        
        // Validate layout
        if (this._validateValues() == false) return;

        // Validate DB
        db.transaction(tx => {
            tx.executeSql(
              'select * from users where username = ?;',
                  [this.state.username.value],
              (_, { rows: { _array } }) => this._checkExistingUser(_array),
            );
          });
    }

    _checkExistingUser(array) {
        if (array.length > 0) {
            let newState = {
                value: this.state.username.value,
                validation: false,
                checkExist: false,
            };
            this.setState({username:newState});
            //this.setState({userNameCheck:false});
        } else
        {
            let newState = {
                value: this.state.username.value,
                validation: true,
                checkExist: false,
            };
            this.setState({username:newState});
            //this.setState({userNameCheck:true});
            this._insertUser();
        }
    }

    _insertUser() {        
        // Insert DB
        db.transaction(
            tx => {
                tx.executeSql('insert into users (username, password, firstname, lastname, email) ' 
                    + 'values (?, ?, ?, ?, ?)'
                    ,[this.state.username.value, this.state.password.value, this.state.firstname.value, this.state.lastname.value, this.state.email.value]);
            },
            null,   // error
            this._navigateToLogin()    // success
        );
    }

    _navigateToLogin() {

        // Update state
        let state = {
            value: this.state.username.value,
            validation: true,
            checkExist: true,
        };
        this.setState({username:state});

        // Navigate
        Alert.alert(
            "Signed up successfully",
            "You can login with your user name and password now!",
            [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Login', {})},
            ],
            { cancelable: false }
        );
    }

    _updateInputText(title, value) {
        let newState = {
            value: value,
            validation: value == "" ? false : true
        };
        if (title == Setting.Constants.FIRST_NAME) {
            this.setState({firstname:newState});
        }
        else if (title == Setting.Constants.LAST_NAME)
            this.setState({lastname:newState});
        else if (title == Setting.Constants.EMAIL)
            this.setState({email:newState});
        else if (title == Setting.Constants.USER_NAME) {
            let state = {
                value: value,
                validation: value == "" ? false : true,
                checkExist: true,
            };
            this.setState({username:state});
        }
        else if (title == Setting.Constants.PASSWORD)
            this.setState({password:newState});
    }

    render() {
        return (
            <View style={styles.container}>
                <RegInput
                    title={Setting.Constants.FIRST_NAME}
                    data={this.state.firstname}
                    updateInputText={this._updateInputText}/>

                <RegInput
                    title={Setting.Constants.LAST_NAME}
                    data={this.state.lastname}
                    updateInputText={this._updateInputText}/>

                <EmailInput
                    title={Setting.Constants.EMAIL}
                    data={this.state.email}
                    updateInputText={this._updateInputText}/>

                <UsernameInput
                    title={Setting.Constants.USER_NAME}
                    data={this.state.username}
                    updateInputText={this._updateInputText}/>

                <PasswordInput
                    title={Setting.Constants.PASSWORD}
                    data={this.state.password}
                    updateInputText={this._updateInputText}/>

                <Button style={styles.button}
                    onPress={this._onRegister.bind(this)}>
                    <Text>Sign up</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    button: {
        marginTop: 15,
        width: 300,
        alignSelf: 'center',
        justifyContent: "center",
      },
});
