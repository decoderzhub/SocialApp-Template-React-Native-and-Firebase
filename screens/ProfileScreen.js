import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';

import Toolbar from '../components/Toolbar/Toolbar';
import SignOutButton from '../components/SignOutButton/SignOutButton';
const styles = require('../components/style');
const imageUri = require('../images/user.png');

const tStyle = StyleSheet.create({  //style sheet for stats
 statsContainer: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#FFF',
   height: 40
 },

 stats: {
   fontWeight: '700'
 }
});


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
 
  constructor(){
    super();
    this.state = {
      email: firebase.auth().currentUser.email,  //users email
      uri: firebase.auth().currentUser.photoURL, //users profile url if exists
      initials: "?",
    }
   console.log(firebase.auth().currentUser)
  }


  getRef(){
    return firebase.database().ref();  //in firebase documentation
  }

  getInitials(){
    if(firebase.auth().currentUser.displayName != null){ //does displayName exist if so then lets get first and last initial

      var name = firebase.auth().currentUser.displayName.split(' '); //split the first and last name where there is a space " "
      //console.log(name[0]);

      console.log("first name: " + name[0] + " last name: " + name[1])
      
      var fInitial = name[0].slice(0, 1); // get first initial of first name
      
      var lInitial = name[1].slice(0, 1); // get first initial of last name
      
      console.log("initials: " + fInitial+lInitial );
      
      this.state.initials=fInitial+lInitial;
      
      console.log(this.state.initials);

      return this.state.initials //returns the first and last initials
    
    }else{
      return this.state.initials; //returns the initials "??""
    }
  }

  
  onSignOutPress = () => {
    firebase.auth().signOut(); // signs out the current user from firebase and bugleApp.
  }

    render() {
      if(this.state.uri == null){ // if the uri is null display just initials for profile
        return (
          <View style={styles.container}>  {/* style for container*/}
          
            <Toolbar title="Profile"/>  {/* title of page */}
          <Grid>
              <Col style={{alignItems: 'center'}}>  {/* aligns all content in column to the center */}
              <Avatar
              large
              rounded
              title = {this.getInitials()}   /*initials for profile image */
              containerStyle={{ width: 75, height: 75, marginVertical: 10}}
              />
              <Text style={{fontSize: 18, marginBottom: 15}}> {firebase.auth().currentUser.displayName} </Text>
              <Text style={{fontSize: 18, marginBottom: 15}}> {this.state.email}</Text>
              <Row>
                <Col style={tStyle.statsContainer}>
                <Text style={tStyle.stats}>123 Following</Text></Col>
                <Col style={tStyle.statsContainer}>
                <Text style={tStyle.stats}>456 Posts</Text></Col>
              </Row>
              </Col>
            </Grid>
            <SignOutButton title='SignOut' onPress={this.onSignOutPress}/>
          </View>
        );

      } else {  // if the photoURL is not null then we can display their image I'll add with google signin



      }
      
  }

};
