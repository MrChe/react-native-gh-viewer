import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import Badge from './Badge';
import Web from './Web';

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  rowContainer: {
      flexDirection: 'column',
      flex: 1,
      padding: 10,
      borderColor: '#e4e4e4',
      marginHorizontal: 10
  },
  name: {
      color: '#48BBEC',
      fontSize: 18,
      paddingBottom: 5
  },
  stars: {
      color: '#48BBEC',
      fontSize: 14,
      paddingBottom: 5
  },
  description: {
      fontSize: 14,
      paddingBottom: 5
  }
});

export default class Repositories extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired
  }

  openPage(url) {
    console.log('****url*********', url);
    this.props.navigator.push({
      component: Web,
      title: 'Web View',
      passProps: { url }
    })
  }

  render() {
    const { repos } = this.props;
    const list = repos.map((item, index) => {
      const desc = repos[index].description ?
        <Text style={styles.description}>
          {repos[index].description}
        </Text>
        : <View/>;
        return (
          <View style={styles.rowContainer} key={index}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, repos[index].html_url)}
              underlayColor='transparent'
            >
              <Text style={styles.name}>
                {repos[index].name}
              </Text>
            </TouchableHighlight>
            <Text style={styles.stars}>
              Stars: {repos[index].stargazers_count}
            </Text>
            {desc}
          </View>
      );
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    );
  }
}
