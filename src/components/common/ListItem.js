import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './CardSection';

class ListItem extends Component {
  onRowPress() {
    console.log('Project Pressed!')
  }

  render() {

    const { project_name, project_vote_count } = this.props.project;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <CardSection style={{backgroundColor:'rgba(255,255,255,0.9)', height: 70, width: '100%', alignSelf:'center', borderRadius: 4, marginBottom: 2}}>
          <View style={{flex:1, flexDirection: 'row' ,alignItems:'center', justifyContent:'space-between'}}>
            <Text style={styles.projectNameStyle}>
              { project_name }
            </Text>
            <Text style={styles.voteCountStyle}>
              { project_vote_count }
            </Text>
          </View>
        </CardSection>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  projectNameStyle: {
    fontSize: 20,
    color: '#00c5cd',
    marginLeft: 10
  },
  voteCountStyle: {
    fontSize: 20,
    color: '#00c5cd',
    marginRight: 15
  }
};

export default ListItem;
