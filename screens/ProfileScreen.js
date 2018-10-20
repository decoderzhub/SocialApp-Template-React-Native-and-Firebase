import React from 'react';
import {
  Text,
  View,
  Button,
  ListView,
  TouchableHighlight,
  Modal,
} from 'react-native';
import * as firebase from 'firebase';

import Toolbar from '../components/Toolbar/Toolbar';
import AddButton from '../components/AddButton/AddButton';
import SignOutButton from '../components/SignOutButton/SignOutButton';
import { TextInput } from 'react-native-gesture-handler';
import LoginScreen from '../screens/auth/LoginScreen';
const styles = require('../components/style');

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
 
  constructor(){
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      about: "",
      employeeId: "",
    }
   console.log(firebase.auth().currentUser)
  }

  
  getRef(){
    return firebase.database().ref();  //in firebase documentation
  }

  
  
  onSignOutPress = () => {
    firebase.auth().signOut();
  }

    render() {
      return (
      <View style={styles.container}>
      
        <Toolbar title="ItemLister"/>
        {}
        <Text>Email: {this.state.email} </Text>
        {/*<Text style={styles.Text}>Employee-ID: {this.props.employeeId}</Text>*/}
        <SignOutButton title='SignOut' onPress={this.onSignOutPress}/>
      
      </View>
    );
  }

};
