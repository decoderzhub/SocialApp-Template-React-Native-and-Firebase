'use strict'
let React = require('react-native');
let { StyleSheet } = React;
const constants = {
    actionColor:'#3cb371' //hexadecimal value for add button
}

module.exports = StyleSheet.create({
 container:{
    backgroundColor: '#f2f2f2',
    flex: 1,
 },
 listview: {
    flex: 1,
 },
 li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
 },
 liContainer:{
    flex: 2,
 },
 liText:{
    color: '#333',
    fontSize: 16,
 },
 navbar: {
     marginTop: 30,
     alignItems: 'center',
     backgroundColor: '#fff',
     borderBottomColor: '#eee',
     borderColor: 'transparent',
     borderWidth: 1,
     justifyContent: 'center',
     height: 44,
     flexDirection: 'row'
 },
 navbarTitle: {
     color: '#444',
     fontSize: 16,
     fontWeight: "500"
 },
 toolbar: {
     backgroundColor: '#fff',
     height: 22,
 },
 actionText:{
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
 },
 action: {
     backgroundColor: constants.actionColor,
     borderColor: 'transparent',
     borderWidth: 1,
     paddingTop: 14,
     paddingBottom: 16,
 },
 signText:{
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
 },
 signOutButton: {
     backgroundColor: '#f47142',
     borderColor: 'transparent',
     borderWidth: 1,
     paddingTop: 14,
     paddingBottom: 16,
 },
 chatSend: {
    flex: 1,
    flexDirection: 'row'
 },

});