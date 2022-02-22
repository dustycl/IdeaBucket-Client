import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
  FlatList,
} from 'react-native';
import { CardSection, Input } from '../common';
import ListItem from '../common/ListItem';
import { Button, Icon } from 'react-native-elements'
import * as WebBrowser from 'expo-web-browser';
import { sendInstallationId } from '../../actions';

class TeamScreen extends Component {
  static navigationOptions = {
    title: 'Your Workspaces',
    header: null
  };

componentDidMount(){
  const queryString = require('query-string');
  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial url is: ' + url);
      const output = queryString.parseUrl(url);
      const team_id = output.query.team_id;
      const user_id = output.query.user_id;
      const installationId = Expo.Constants.installationId;
      this.props.sendInstallationId(installationId, user_id, team_id);
    }
  }).catch(err => console.error('An error occurred', err));
  console.log(this.props.team_info)
}

  render() {
    return (
      <View>

      </View>
    );
  }

}


const mapStateToProps = (state) => {
  const { team_info } = state.auth;
  return { team_info };
};

export default connect(mapStateToProps, {sendInstallationId} )(TeamScreen);
