import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import TeamListNavigator from './TeamNavigator';


export default createAppContainer(createSwitchNavigator(
  {
    Teams: TeamListNavigator,
    Main: MainTabNavigator,
  },
  {
    initialRouteName:'Main'
  }
  ));
