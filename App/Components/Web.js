import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  WebView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f6f6ef',
      flexDirection: 'column'
  },
});

export default class Web extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView source={{uri: this.props.url}} />
      </View>
    );
  }
}
