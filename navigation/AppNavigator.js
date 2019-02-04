import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthFlow from './AuthFlow';

export default createAppContainer(createSwitchNavigator(
  {
    Main: MainTabNavigator,
  },
  {
    initialRouteName:'Main'
  }
  ));
