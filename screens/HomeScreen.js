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

const styles = require('../components/style');

export default class HomeScreen extends React.Component {
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

  setModalVisible(visibile){
    this.setState({modalVisible:visibile});
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

    addItem(){
      this.setModalVisible(true);
    }

    render() {
      return (
      <View style={styles.container}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}>
        <View style={{marginTop:22}}>
          <View style={{alignItems:"center"}}>
            <Toolbar title="Add Item"/>
            <TextInput
              style={{width: 200, height: 40, borderWidth: 1}}
              value={this.state.text}
              placeholder="Add Item"
              onChangeText={(value) => this.setState({text:value})}
            />
                                          {/* Add button  */}
            <TouchableHighlight 
              style={styles.action}
              onPress={() => {
              this.itemsRef.push({Title: this.state.text})
              console.log('Added Item', this.state.text);
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Save Item</Text>
            </TouchableHighlight>
                                          {/* Cancel button  */}
            <TouchableHighlight 
              style={styles.signOutButton}
              onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

        <Toolbar title="ItemLister"/>
        <ListView
          dataSource={this.state.itemDataSource}
          renderRow={this.renderRow}>
        </ListView>
        <AddButton onPress={this.addItem.bind(this)} title="Add Organization"/>
      

      </View>
    );
  }

};
