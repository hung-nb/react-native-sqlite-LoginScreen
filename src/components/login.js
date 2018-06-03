import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import { Header, Body, Title, Text, Button, Container, Content, List, ListItem, InputGroup, Input, Icon } from 'native-base';
import { SQLite } from 'expo';

import Failure from './loginFailure'

const db = SQLite.openDatabase('mydb.db');

export default class Login extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      username: '',
      password: '',
      success: true,
    };
  }

  componentWillMount () {
    // DB access
    db.transaction(tx => {
    tx.executeSql(
        'create table if not exists users ' 
        + '(id integer primary key not null, ' 
        + 'username text, password text, firstname text, lastname text, email text);' 
        );
    });

    // Refresh page
    this.subs = [
      this.props.navigation.addListener('willBlur', () => {
        this.setState({
          username: '',
          password: '',
          success: true,
        });
      }),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
        sub.remove();
    });
  }
  
  _onLogin() {
    db.transaction(tx => {
      tx.executeSql(
        'select * from users where username = ? and password = ?;',
            [this.state.username, this.state.password],
        (_, { rows: { _array } }) => this._navigateToHome(_array),  // Success
      );
    });
  }

  _onSignUp() {
    this.props.navigation.navigate('Register', {});
  }

  _navigateToHome(array) {
    if (array.length > 0) {
      this.setState({success: true});
      this.props.navigation.navigate('Welcome', array[0]);
    }
    else
      this.setState({success: false});
  }

  _openForgetAccount() {
    this.props.navigation.navigate('Forget');
  }
  
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Failure success={this.state.success} />
          <List>
            <ListItem noBorder>
              <InputGroup>
                <Icon style={styles.icon} name='ios-person' />
                <Input style={styles.input} placeholder='User name' onChangeText={(text) => this.setState({username:text})}/>
              </InputGroup>
            </ListItem>          
            <ListItem noBorder>
              <InputGroup>
                <Icon style={styles.icon} name='ios-unlock' />
                <Input style={styles.input} placeholder='Password' secureTextEntry={true}
                  onChangeText={(text) => this.setState({password:text})}/>
              </InputGroup>
            </ListItem>
            <ListItem noBorder>
              <Text style={styles.forget1}>Forgot user name, password? </Text>
              <Text style={styles.forget2}
                        onPress={() => this._openForgetAccount()}>
                        Tab here
              </Text>
            </ListItem>
            <Button style={styles.button}
              onPress={this._onLogin.bind(this)}>
              <Text>Log in</Text>
            </Button>
            <Button style={styles.button}
              onPress={this._onSignUp.bind(this)}>
              <Text>Sign up</Text>
            </Button>            
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Dimensions.get('window').height / 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    marginTop: 15,
    width: 300,
    alignSelf: 'center',
    justifyContent: "center",
  },
  input: {
    height: 42,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 8,
  },
  forget1: {
    fontSize: 14,
  },
  forget2: {
    fontSize: 14,
    color: 'blue'
  },
});