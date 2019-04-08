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
  Image,
  TouchableOpacity,
} from 'react-native';
import { CardSection, Input } from '../common';
import ListItem from '../common/ListItem';
import { Button, Icon } from 'react-native-elements'
import { WebBrowser } from 'expo';
import { sendInstallationId, teamInfo, projectNameChanged, projectDescriptionChanged, readProjects, createProject, updateProject, deleteProject } from '../../actions';



class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Table',
    headerRight: (
        <Button
          icon={{
            name: "add",
            size: 30,
            color: '#00c5cd'
          }}
          type="clear"
        />
      )
  };

  constructor () {
    super()
    this.state = {
      isOpen: false
    }
  }

projectName(project_name) {
  this.props.projectNameChanged(project_name);
}

projectDescription(project_description) {
  this.props.projectDescriptionChanged(project_description);
}

createProject() {
  const { project_name, project_description, access_token, team_id, username } = this.props
  this.props.createProject(project_name, project_description, access_token, team_id, username);
}

updateProject() {
  const { project_name, project_description, access_token, username, team_id } = this.props
  this.props.updateProject(project_name, project_description, access_token, username, team_id);
}

deleteProject() {
  const { project_name, access_token, username } = this.props
  this.props.deleteProject(project_name, access_token, username);
}

buttonPressed() {
  console.log(this.props.team_info.workspace_logo);
  return <Image
    style={{width: 50, height: 50}}
    source={{uri: this.props.team_info.workspace_logo}}
  />;
}

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
}

renderRow(project) {
  return <ListItem project={project.item} />;
}

  render() {
    return (
        <View style={styles.container}>
          <Input
              placeholder="First Name"
              style={{backgroundColor:'#fff'}}
            />
          <Input
            placeholder="Last Name"
            style={{backgroundColor:'#fff'}}
          />
          <Input
            placeholder="Phone Number"
            style={{backgroundColor:'#fff'}}
          />
          <Input
            placeholder="Amount ($)"
            style={{backgroundColor:'#fff'}}
          />
          <Button style={{width: 400, height: 200}}>Create Account</Button>
        </View>

    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00c5cd',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(255,255,255, 1)',
    lineHeight: 28,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

SettingsScreen.propTypes = {

};



const mapStateToProps = (state) => {
  const { project_name, project_description, team_id, access_token, username, project_list, team_info } = state.auth;
  return { project_name, project_description, team_id, access_token, username, project_list, team_info };
};

export default connect(mapStateToProps,{ sendInstallationId, teamInfo, projectNameChanged, projectDescriptionChanged, readProjects, createProject, updateProject, deleteProject })(SettingsScreen);
