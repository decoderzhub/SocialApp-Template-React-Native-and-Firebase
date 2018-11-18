import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Chat: ChatScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused={focused}
    name={
      Platform.OS === 'ios'
      ? `ios-home${focused ? '' : '-outline'}`
      : 'md-information-circle'
    }
    />
    ),
  };
  
  const ProfileStack = createStackNavigator({
    Profile: ProfileScreen,
    Home: HomeScreen,
    Chat: ChatScreen
  });

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-contact${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ChatStack = createStackNavigator({
  Chat: ChatScreen,
  Profile: ProfileScreen,
  Home: HomeScreen
});

ChatStack.navigationOptions = {
tabBarLabel: 'Chat',
tabBarIcon: ({ focused }) => (
  <TabBarIcon
    focused={focused}
    name={
      Platform.OS === 'ios'
        ? `ios-chatbubbles${focused ? '' : '-outline'}`
        : 'md-information-circle'
    }
  />
),
};

export default createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  ChatStack
});
