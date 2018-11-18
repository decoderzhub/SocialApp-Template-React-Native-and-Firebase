import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import LoginScreen  from './../screens/auth/LoginScreen';
import SignUpScreen  from './../screens/auth/SignUpScreen';
import ForgotPasswordScreen  from './../screens/auth/ForgotPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: { screen: LoginScreen },
  SignUp: { screen: SignUpScreen },
  ForgotPassword: { screen: ForgotPasswordScreen },
  Profile: {screen: ProfileScreen},
  Chat: { screen: ChatScreen},
  Main: { screen: MainTabNavigator },
});