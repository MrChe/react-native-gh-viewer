/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Main from './App/Components/Main';
import Dashboard from './App/Components/Dashboard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#111'
  },
});

export default class githubNotetaker extends Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        renderScene={(route, navigator) => {
          switch (route.name) {
            case 'Dashboard':
              return (
                <Dashboard
                  navigator={navigator}
                  {...route}
                />
              )
              break;
            default:
            return (
              <Main
                navigator={navigator}
              />
            )
              break;
          }
        }}
        initialRoute={{
          name: 'Main',
          title: 'GithubNotetaker',
        }}
      />
    );
  }
}



AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
