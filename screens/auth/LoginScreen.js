import React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import ProfileData from '../ProfileScreen';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
        };
        
    }

    static getValue(){
        //console.log(this.state.sampleString);
        return this.state.email
    }


    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {

        }, (error) => {
            Alert.alert(error.message);
        });
    }

    onCreateAccountPress = () => {
        this.props.navigation.navigate("SignUp")
    }

    onForgotPasswordPress = () => {
        this.props.navigation.navigate("ForgotPassword")
    }

    render() {
        return (
            
            <View style={{paddingTop:100, alignItems:"center"}}>
            <Text>Login</Text>

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
            value={this.state.email}
            onChangeText={(text) => { this.setState({email: text})}}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            />

            <View style={{padding:10}}/>

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
            value={this.state.password}
            onChangeText={(text) => { this.setState({password: text})}}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            />

            <Button title="Login" onPress={this.onLoginPress} />

            <Button title="Create Account..." onPress={this.onCreateAccountPress} />
            
            <Button title="Forgot Password..." onPress={this.onForgotPasswordPress} />
            
            </View>
        );
    }
}