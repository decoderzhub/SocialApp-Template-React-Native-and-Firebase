import React from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Grid,
         Col,
         Row,
} from 'react-native-easy-grid';
import { FormInput } from 'react-native-elements';
import * as firebase from 'firebase';

import Toolbar from '../components/Toolbar/Toolbar';
import AddButton from '../components/AddButton/AddButton';
import { TextInput } from 'react-native-gesture-handler';

const styles = require('../components/style');


export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      text: "",
      itemDataSource: ds,
      modalVisible: false
    }

    this.itemsRef = this.getRef().child('items');

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  getRef(){
    return firebase.database().ref();  //in firebase documentation
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  getItems(){
    //let items = [{title:'Item One'},{title:'Item Two'}];
    this.itemsRef.on('value', (snap) =>{ 
      let items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().Title,
          _key: child.key
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });

    
  }
  pressRow(item){
    console.log("Removed item:", item.title);
    this.itemsRef.child(item._key).remove();
  }
  onSignOutPress = () => {
    firebase.auth().signOut();
  }
  renderRow(item){

      return (
        <TouchableHighlight onPress={() => {
          this.pressRow(item);
        }}>
         <View style={styles.li}>
           <Text style={styles.liText}>{item.title}</Text>
         </View>
        </TouchableHighlight>
      )
    }


    render() {
      return (
        <View style={cStyles.container}>
        <View style={cStyles.topContainer}>
        <Text style={cStyles.title}> Chat </Text>
        </View>
        <View style={cStyles.chatContainer}>
        <Text>Chat</Text>
        </View>
        <View style={cStyles.inputContainer}>
        <View style={cStyles.textContainer}>
        <TextInput
        style={cStyles.input}
        value={this.state.message}
        onChangeText={(text) => this.setState({message: text})}
        />
        </View>
        <View style={cStyles.sendContainer}>
        <TouchableHighlight
        underlayColor={'#4e4273'}
        onPress={() => this.onSendPress()}
        >
        <Text style={cStyles.sendLabel}>SEND</Text>
        </TouchableHighlight>
        </View>
        </View>
        </View>
        );
  }

  
};

const cStyles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'stretch',
  backgroundColor: '#ffffff'
  },
  topContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#6E5BAA',
  paddingTop: 20,
  },
  chatContainer: {
  flex: 11,
  justifyContent: 'center',
  alignItems: 'stretch'
  },
  inputContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: '#6E5BAA'
  },
  textContainer: {
  flex: 1,
  justifyContent: 'center'
  },
  sendContainer: {
  justifyContent: 'flex-end',
  paddingRight: 10
  },
  sendLabel: {
  color: '#ffffff',
  fontSize: 15
  },
  input: {
  width: Dimensions.get('window').width - 70,
  color: '#555555',
  paddingRight: 10,
  paddingLeft: 10,
  paddingTop: 5,
  height: 32,
  borderColor: '#6E5BAA',
  borderWidth: 1,
  borderRadius: 2,
  alignSelf: 'center',
  backgroundColor: '#ffffff'
  },
  title: {
    marginLeft: Dimensions.get('window').width/2 - 25,
    marginTop: 10,
    color: '#333',
    fontSize: 16,
    fontWeight: "500"
  },

  });
