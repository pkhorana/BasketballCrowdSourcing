import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';

export default function Home(props) {

    const [currUser, setCurrUser] = useState(null);
    const usersRef = firebase.database().ref().child('users');

    useEffect(() => {
       setCurrUser(firebase.auth());
    });

    function signOut() {
        firebase
        .auth()
        .signOut()
        .then(() => props.navigation.navigate('LoginScreen'));
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to Home Screen</Text>
        <TouchableOpacity style={styles.button}
            onPress={() => signOut()}>
            <Text>LOGOUT</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#3498db'
    },
    title: {
        color: '#FFFF',
        marginTop: 200,
        width: 160,
        textAlign: 'center'
    },
});
