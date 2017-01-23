import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Badge from './Badge';

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
  },
  rowContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#e4e4e4',
      marginHorizontal: 10
  },
  rowTitle: {
      color: '#48BBEC',
      fontSize: 16
  },
  rowContent: {
      fontSize: 19
  }
});

export default class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired
  }

  getRowTitle = (user, item) => {
    item = (item === 'public_repos') ? item.replace('_', ' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  render() {
    const { userInfo } = this.props;
    let topicArr = ['company', 'location', 'folowers', 'folowing', 'email', 'bio', 'public_repos'];
    let list = topicArr.map((item, index) => {
      if(!userInfo[item]) {
        return <View key={index}/>
      } else {
        return (
          <View style={styles.rowContainer} key={index}>
            <Text style={styles.rowTitle}>
              {this.getRowTitle(userInfo, item)}
            </Text>
            <Text style={styles.rowContent}>
              {userInfo[item]}
            </Text>
          </View>
        )
      }
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo}/>
        {list}
      </ScrollView>
    );
  }
}
