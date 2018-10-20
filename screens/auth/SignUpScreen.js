import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password: "",
            passwordConfirm: "",
            displayName: "",
            phoneNumber: "",
         };
    }

    onSignUpPress = () => {
        if(this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match!")  
            return;
        }
    
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => { 
            firebase.auth().currentUser.updatePhoneNumber({
                phoneCredential: this.state.phoneNumber
            })
            firebase.auth().currentUser.updateProfile({
                displayName: this.state.displayName,
                photoURL: ""
              }).then(function() {
                // Profile updated successfully!
                var displayName = firebase.auth().currentUser.displayName;
                // "https://example.com/jane-q-user/profile.jpg"
                var photoURL = firebase.auth().currentUser.photoURL;
              }, function(error) {
                // An error happened.
                Alert.alert(error.message);
              });

        }, (error) => {
            Alert.alert(error.message);
        });
    }

    onBackToLoginPress = () => {
        this.props.navigation.navigate("Login")

    }

    render() {
        return (
            <View style={{paddingTop:100, alignItems:"center"}}>
            <Text>SignUp</Text>

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
            value={this.state.email}
            onChangeText={(text) => { this.setState({email: text})}}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            />
            <View style={{padding:10}}/>

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
            value={this.state.password}
            onChangeText={(text) => { this.setState({password: text})}}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            />
            <View style={{padding:10}}/>

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
            value={this.state.passwordConfirm}
            onChangeText={(text) => { this.setState({passwordConfirm: text})}}
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            /><View style={{padding:10}}/>

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
            value={this.state.displayName}
            onChangeText={(text) => { this.setState({displayName: text})}}
            placeholder="Create Username"
            secureTextEntry={false}
            autoCorrect={false}
            keyboardType="default"
            textContentType="username"
            />
            /><View style={{padding:10}}/>

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
            value={this.state.phoneNumber}
            onChangeText={(text) => { this.setState({phoneNumber: text})}}
            placeholder="123-456-7890"
            secureTextEntry={false}
            autoCorrect={false}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            maxLength={10}
            />
            <Button title="SignUp" onPress={this.onSignUpPress} />

            <Button title="Back to Login..." onPress={this.onBackToLoginPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});