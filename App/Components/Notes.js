import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ListView,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import api from '../Utils/api';
import Badge from './Badge';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonRemove: {
    height: 60,
    backgroundColor: '#f25959',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#e4e4e4',
    flex: 10,
    justifyContent: 'center'
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowWrap: {
    flexDirection: 'row'
  }
});

export default class Notes extends Component {

  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    let objNotes = {};
    for( let k in this.props.notes) {
      objNotes[k] = {
        key: k,
        value: this.props.notes[k]
      }
    }
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(objNotes),
      note: '',
      error: ''
    }

    console.log(this.props.notes);
  }

  handleChange(e) {
    this.setState({
      note: e.nativeEvent.text
    })
  }

  handleSubmit() {
    const note = this.state.note;
    this.setState({
      note: ''
    });
    api.addNote(this.props.userInfo.login, note)
      .then((data) => {
        api.getNotes(this.props.userInfo.login)
          .then((data) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          });
      })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error})
      });
  }

  // handleRemoveNote(key) {
  //   console.log(key);
  //   api.removeNote(key).then((res1) => {
  //     console.log(res1);
  //     api.getNotes(this.props.userInfo.login)
  //       .then((res2) => {
  //
  //         console.log('res2:', res2);
  //
  //       });
  //   })
  // }

  renderRow(rowData) {
    console.log(rowData);
    return (
      <View style={styles.rowWrap}>
        <View style={styles.rowContainer}>
          <Text> {rowData.value} </Text>
        </View>
        <TouchableHighlight
            style={styles.buttonRemove}
            // onPress={this.handleRemoveNote.bind(this, rowData.key)}
            underlayColor="#f4a8a8">
              <Text style={styles.buttonText}>remove</Text>
          </TouchableHighlight>
      </View>
    )
  }
  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
            style={styles.searchInput}
            value={this.state.note}
            onChange={this.handleChange.bind(this)}
            placeholder="New Note" />
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
          <ListView
            enableEmptSections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            renderHeader={() => <Badge userInfo={this.props.userInfo}/>} />
        {this.footer()}
      </View>
    );
  }
}
