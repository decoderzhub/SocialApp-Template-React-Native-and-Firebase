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
  TouchableHighlight,
} from 'react-native';
import * as firebase from 'firebase';

const styles = require('../style');
const constants = styles.constants;

export default class AddButton extends React.Component {
  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
            underlayColor="#24ce84"
            onPress={this.props.onPress}
        >
        <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }

}