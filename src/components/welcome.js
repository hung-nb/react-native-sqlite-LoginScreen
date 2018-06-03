import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Content, Text, Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.navigation.state.params.firstname
    }
  }

  _onSignOut() {
    this.props.navigation.navigate('Login', {});
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button style={styles.button}
              onPress={this._onSignOut.bind(this)}>
              <Text>Sign out</Text>
            </Button>
          </Right>
        </Header>
        <View style={styles.content}>
          <Text>Welcome {this.state.firstname}</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    header: {
      marginTop: 20,
    },
    button: {
      width: 120,
      height: 35,
      alignSelf: 'center',
      justifyContent: "center",
    },
});
