import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import api from '../Utils/api';
import Dashboard from './Dashboard';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#48BBEC',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
  },
  button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
  },
});

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false,
    }
  }

  _handleChange = (event) => {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  _handleSubmit = () => {
    this.setState({
      isLoading: true
    });
    // console.log('******state*******', this.state.username);
    api.getBio(this.state.username).then((res) => {
      if( res.message === 'Not Found' ) {
        this.setState({
          error: 'User not found',
          isLoading: false
        })
      } else {
        this.props.navigator.push({
          title: res.name || "Select an Option",
          component: Dashboard,
          passProps: {
            userInfo: res
          }
        });
        this.setState({
          isLoading: false,
          error: false,
          username: ''
        })
      }
    });
  }

  render() {
    const showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Search for a Github User </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this._handleChange}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this._handleSubmit}
          underlayColor="white"
        >
          <Text style={styles.buttonText}> SEARCH </Text>
        </TouchableHighlight>
        <ActivityIndicator
         animating={this.state.isLoading}
         color="#111"
         size="large"></ActivityIndicator>
        {showErr}
      </View>
    );
  }
}
