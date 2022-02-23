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
  KeyboardAvoidingView,
  Modal,
  TouchableHighlight
} from 'react-native';
import { CardSection, Input } from '../common';
import ListItem from '../common/ListItem';
import { Button, Icon } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import { firstChanged, lastChanged, phoneChanged, amountChanged, sendInstallationId, teamInfo, projectNameChanged, projectDescriptionChanged, readProjects, createNewAccount, updateProject, deleteProject } from '../../actions';



class HomeScreen extends Component {

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = {
    title: 'MyTab',
    headerRight: (
        <Button
          icon={{
            name: "add",
            size: 30,
            color: '#00c5cd'
          }}
          type="clear"
        />
      ),
    headerLeft: (
        <Button
          icon={{
            name: "menu",
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
      isOpen: false,
      modalVisible: false
    }
  }

projectName(project_name) {
  this.props.projectNameChanged(project_name);
}

onFirstNameChange(text) {
    this.props.firstChanged(text);
  }

onLastNameChange(text) {
    this.props.lastChanged(text);
  }

onPhoneNumberChange(text) {
    this.props.phoneChanged(text);
  }

onAmountChange(text) {
    this.props.amountChanged(text);
  }

projectDescription(project_description) {
  this.props.projectDescriptionChanged(project_description);
}

createNewAccount() {
  const { first_name, last_name, phone_number, amount } = this.props
  this.props.createNewAccount(first_name, last_name, phone_number, amount);
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
        <KeyboardAvoidingView style={{backgroundColor:'#00c5cd', flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',}} behavior="padding" enabled>
          <View style={{ alignSelf: 'center', flex:1, justifyContent:'center'}}>
            <Modal
               animationType="slide"
               transparent={true}
               visible={this.state.modalVisible}
               onRequestClose={() => {
                 Alert.alert('Modal has been closed.');
               }}>
               <View style={{backgroundColor:'rgba(0,0,0,0.65)', flex:1, justifyContent:'center', alignItems:'center'}}>
                 <View style={{backgroundColor:'rgba(255,255,255,1)', alignSelf:'center', justifyContent:'center', alignItems:'center', width:'90%', height:'45%', borderRadius:6}}>
                   <Text style={{fontSize:20,fontWeight: 'bold', marginBottom:20}}>Check before submitting!</Text>
                   <Text style={{fontSize:16}}>First Name: {this.props.first_name}</Text>
                   <Text style={{fontSize:16}}>Last Name: {this.props.last_name}</Text>
                   <Text style={{fontSize:16}}>Phone Number: {this.props.phone_number}</Text>
                   <Text style={{fontSize:16}}>Amount: ${this.props.amount}</Text>
                   <View style={{borderTopWidth:1, width:'85%', borderColor:'rgba(112,112,112,0.35)', marginTop:'7%', marginBottom:'5%'}}>
                   </View>
                   <View style={{flexDirection: 'row', justifyContent:'space-around', width:'65%'}}>
                    <View>
                       <Button
                         title="Cancel"
                         buttonStyle={{backgroundColor: 'red', width: 100, height: 50}}
                         onPress={() => {
                           this.setModalVisible(!this.state.modalVisible);
                         }}
                       />
                     </View>
                     <View>
                       <Button
                         title="Confirm"
                         buttonStyle={{borderColor: 'green', borderWidth:1, width: 100, height: 50}}
                         titleStyle={{color:'green'}}
                         type="outline"
                         onPress={() => {
                           this.createNewAccount();
                         }}
                       />
                     </View>
                   </View>
                 </View>
               </View>
             </Modal>

            <CardSection style={{backgroundColor:'rgba(224, 0, 48, 0)', width:'90%', height:'14%', borderBottomWidth: 0}}>
              <Input
                label="First Name"
                placeholder="Megulo"
                onChangeText={this.onFirstNameChange.bind(this)}
                value={this.props.first_name}
                style={{backgroundColor:'#fff'}}
              />
            </CardSection>
            <CardSection style={{backgroundColor:'rgba(224, 0, 48, 0)', width:'90%', height:'14%', borderBottomWidth: 0}}>
              <Input
                label="Last Name"
                placeholder="Abebe"
                onChangeText={this.onLastNameChange.bind(this)}
                value={this.props.last_name}
                style={{backgroundColor:'#fff'}}
              />
            </CardSection>
            <CardSection style={{backgroundColor:'rgba(224, 0, 48, 0)', width:'90%', height:'14%', borderBottomWidth: 0}}>
              <Input
                label="Phone Number"
                placeholder="(555) 555-5555"
                onChangeText={this.onPhoneNumberChange.bind(this)}
                value={this.props.phone_number}
                style={{backgroundColor:'#fff'}}
              />
            </CardSection>
            <CardSection style={{backgroundColor:'rgba(224, 0, 48, 0)', width:'90%', height:'14%', borderBottomWidth: 0}}>
              <Input
                label="Amount ($)"
                placeholder= "$0.00"
                onChangeText={this.onAmountChange.bind(this)}
                value={this.props.amount}
                style={{backgroundColor:'#fff'}}
              />
            </CardSection>
            <Button
              title="Create Account"
              buttonStyle={{height:65, marginTop:40}}
              onPress={() => {
                this.setModalVisible(true);
              }}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#58CCC4', 'rgba(44,144,137,1)','#194D49'],
                start: { x: 0.5, y: 0 },
                end: { x: 0.5, y: 1 },
              }}
            />
          </View>
        </KeyboardAvoidingView>
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

HomeScreen.propTypes = {

};



const mapStateToProps = (state) => {
  const { project_name, first_name, last_name, phone_number, amount, project_description, team_id, access_token, username, project_list, team_info } = state.auth;
  return { project_name, first_name, last_name, phone_number, amount, project_description, team_id, access_token, username, project_list, team_info };
};

export default connect(mapStateToProps,{ sendInstallationId, teamInfo, projectNameChanged, firstChanged, lastChanged, phoneChanged, amountChanged, projectDescriptionChanged, readProjects, createNewAccount, updateProject, deleteProject })(HomeScreen);
