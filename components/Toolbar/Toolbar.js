import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import * as firebase from 'firebase';

const styles = require('../style');

export default class Toolbar extends React.Component {
  render() {
    return (
      <View style={styles.navbar}>
      <Text style={styles.navbarTitle}>{this.props.title}</Text>
      
      </View>
    );
  }

}