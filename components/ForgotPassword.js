import React, { useState} from 'react';
import {StyleSheet, Button, TextInput, Text, View, TouchableOpacity} from 'react-native';
import styles from './Styles';
import * as firebase from 'firebase';
import EmailTextBox from './EmailTextBox';

export default function ForgotPassword(props) {


  const [userText, setUser] = useState('');


  function validate(email) {
    if (validateEmail(email)) {
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(email).then(function() {
        alert('Email to reset password was sent.');
      }).catch(function(error) {
        alert('Email was not sent.');
      });
    }

  }

  function validateEmail(user){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(user)) {
        alert('Enter a valid email!');
        return false;
    }
    return true;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.entryContainer}>
        <EmailTextBox
            onChange={(userText) => setUser(userText)}
        />
      </View>
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.button}
            onPress={() => validate(userText)}>
            <Text>SEND EMAIL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            onPress={() => props.navigation.navigate('LoginScreen')}>
            <Text>BACK</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignSelf: 'stretch',
//         backgroundColor: '#3498db'
//     },
//     logoContainer: {
//
//     },
//     entryContainer: {
//         padding: 20,
//         marginTop: 300,
//
//     },
//     buttonContainer: {
//         padding: 20
//     },
//     title: {
//         color: '#FFFF',
//         marginTop: 10,
//         width: 160,
//         textAlign: 'left'
//     },
//     input: {
//         height: 40,
//         backgroundColor: 'rgba(255, 255, 255, 0.2)',
//         marginBottom: 20,
//         color:'#FFF',
//         paddingHorizontal: 10
//
//     },
//
// });