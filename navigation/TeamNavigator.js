import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import TeamScreen from '../src/components/screens/TeamScreen';


const TeamStack = createStackNavigator({
  Teams: TeamScreen,
  
}
);

export default createAppContainer(TeamStack);
