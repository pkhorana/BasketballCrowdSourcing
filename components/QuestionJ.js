import React, {useState, useEffect} from 'react';
import {Text, View, Image, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';
import {Button, Icon} from 'native-base';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { set } from 'react-native-reanimated';

export default function QuestionJ(props) {


    // const [currUser, setCurrUser] = useState(null);
    // const usersRef = firebase.database().ref().child('users'); //reference to the user table in firebase
    // const categoriesRef = firebase.database().ref().child('categories');
    // const [fName, setFName] = useState('');
    // const [tutorialComplete, setTutorialComplete] = useState(false);
    // const user = firebase.auth().currentUser; //gets current user

    const [playerNames, setPlayerNames] = useState(['DeMarcus Cousins', 'Zach Levine']);
    const [playerUris, setPlayerUris] = useState(['https://img.bleacherreport.net/img/images/photos/003/750/902/hi-res-7ccacaab69f7137062db780d4af88e13_crop_exact.jpg?w=1200&h=1200&q=75', 
    'https://publish.nba.com/bulls/sites/bulls/files/210515_samsmith_zachlavine_muscles_solo_4x5.jpg'])
    
    const titleHead = ['SEASON', 'TEAM', 'POS']
    const table1head = ['PTS', 'AST', 'TRB', 'STL']
    const table2head = ['BLK', 'G', 'MP', 'FG%']

    const sampleRef = firebase.database().ref().child('test');


    const questionRespRef = firebase.database().ref().child('questionResponses')

    const questionRef = firebase.database().ref().child('questions')


    // const [p1title, setState] = useState({ season: "", team: "" , pos:""});
    // const [p1row1, setState] = useState({ pts: "", ast: "" , trb: "", stl: ""});
    // const [p1row2, setState] = useState({ blk: "", g: "", mp: "", fg: ""});

    // const [p1Name, setp1Name] = useState('DmMarcus Cousins')
    // const [p1Uri, setp1Uri] = useState('https://media.gettyimages.com/photos/demarcus-cousins-of-the-los-angeles-lakers-poses-for-a-portrait-day-picture-id1171561552?s=612x612')
    const [p1title, setp1Title1] = useState(["2017-18", "NOP", "C"]);
    const [p1row1, setp1Row1] = useState(["25.1", "5.3", "12.9", "1.6"]);
    const [p1row2, setp1Row2] = useState(["1.6", "48", "36.2", "0.470"]);

    // const [p2title, setState] = useState({ season: "", team: "" , pos:""});
    // const [p2row1, setState] = useState({ pts: "", ast: "" , trb: "", stl: ""});
    // const [p2row2, setState] = useState({ blk: "", g: "", mp: "", fg: ""});

    // const [p2Name, setp2Name] = useState('Zach Levine')
    // const [p2Uri, setp2Uri] = useState('https://publish.nba.com/bulls/sites/bulls/files/210515_samsmith_zachlavine_muscles_solo_4x5.jpg')
    const [p2title, setp2Title1] = useState(["2017-18", "CHI", "SG"]);
    const [p2row1, setp2Row1] = useState(["16.7", "3.0", "3.9", "1.0"]);
    const [p2row2, setp2Row2] = useState(["0.2", "24", "27.3", "0.383"]);
    const [qKey, setQKey] = useState("")



    var deviceWidth = Dimensions.get('window').width;
    var deviceHeight = Dimensions.get('window').height;

    // const baseUrl = Platform.OS === 'android' ? 'http://localhost:3000' : 'http://localhost:5000';
    // const baseUrl = Platform.OS === 'ansdroid' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
    //baseUrl + 'stats/random'
    const baseUrl = 'http://10.0.2.2:5000'


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [bootcamps, setBootcamps] = useState();


    // const databaseQuestion = async () => {
    //     fName = playerNames[0]
    //     y1 = p1title[0]
    //     sName = playerNames[1]
    //     y2 = p2title[0]
    //     if (fName.localeCompare(sName) > 0) {
    //         fName = playerNames[1]
    //         y1 = p2title[0]
    //         sName = playerNames[0]
    //         y2 = p1title[0]
    //     }
    //     qKeyP = fName + y1 + sName + y2
    //     qKeyP = qKeyP.replace(/\s/g, '');
    //     console.log(qKeyP)
    //     setQKey(qKeyP)
    //     qKeyN = qKeyP
    //     var respData = 
    //     {
    //         [fName]: 0,
    //         [sName]: 0
    //     }

    //     var questionData = 
    //     {
    //         p1: [fName],
    //         p2: [sName]
    //     }
        
    //     questionRef.once('value', function(snapshot) {
    //         if (!snapshot.hasChild(qKeyN)) {
    //             questionRespRef.child(qKeyN).set(respData)
    //             questionRef.child(qKeyN).set(questionData)
    //         }
    //     });
    // }

    const loadData = async () => {
        axios.get(baseUrl + '/stats/random')
            .then(function (response) {

                console.log(response);
                
                const data = response.data;
                setIsLoaded(true);
                
                // const jsonObj = JSON.parse(data)
                
                const p1 = data["player1"]
                const p2 = data["player2"]

                const p1Stats = p1["stats"]
                const p2Stats = p2["stats"]


                setPlayerNames([p1Stats["NAME"], p2Stats["NAME"]])
                setPlayerUris([p1["img"], p2["img"]])

                setp1Title1([p1Stats["SEASON"], p1Stats["TEAM"], p1Stats["POS"]])
                setp1Row1([p1Stats["PTS"], p1Stats["AST"], p1Stats["TRB"], p1Stats["STL"]])
                setp1Row2([p1Stats["BLK"], p1Stats["G"], p1Stats["MP"], p1Stats["FG%"]])

                setp2Title1([p2Stats["SEASON"], p2Stats["TEAM"], p2Stats["POS"]])
                setp2Row1([p2Stats["PTS"], p2Stats["AST"], p2Stats["TRB"], p2Stats["STL"]])
                setp2Row2([p2Stats["BLK"], p2Stats["G"], p2Stats["MP"], p2Stats["FG%"]])
                console.log(response)

                
                fName = p1Stats["NAME"]
                y1 = p1Stats["SEASON"]
                sName = p2Stats["NAME"]
                y2 = p2Stats["SEASON"]
                if (fName.localeCompare(sName) > 0) {
                    fName = p2Stats["NAME"]
                    y1 = p2Stats["SEASON"]
                    sName = p1Stats["NAME"]
                    y2 = p1Stats["SEASON"]
                }
                qKeyP = fName + y1 + sName + y2
                qKeyP = qKeyP.replace(/\s/g, '');
                console.log(qKeyP)
                setQKey(qKeyP)
                qKeyN = qKeyP
                var respData = 
                {
                    [fName]: 0,
                    [sName]: 0
                }

                var questionData = 
                {
                    player1: {
                        name: [fName][0],
                        season: [y1][0]
                    },
                    player2: {
                        name: [sName][0],
                        season: [y2][0]
                    }
                }
                
                questionRef.once('value', function(snapshot) {
                    if (!snapshot.hasChild(qKeyN)) {
                        questionRespRef.child(qKeyN).set(respData)
                        questionRef.child(qKeyN).set(questionData)
                    }
                });
                

                // console.log(response);
                
                // const data = response.data;
                // setIsLoaded(true);
                // const arr = data.split("&")
                // console.log(arr)
                
                // const p1 = JSON.parse(arr[0])[0]
                // const p2 = JSON.parse(arr[1])[0]

                // setPlayerNames([p1["NAME"], p2["NAME"]])
                // setp1Title1([p1["SEASON"], p1["TEAM"], p1["POS"]])
                // setp1Row1([p1["PTS"], p1["AST"], p1["TRB"], p1["STL"]])
                // setp1Row2([p1["BLK"], p1["G"], p1["MP"], p1["FG%"]])

                // setp2Title1([p2["SEASON"], p2["TEAM"], p2["POS"]])
                // setp2Row1([p2["PTS"], p2["AST"], p2["TRB"], p2["STL"]])
                // setp2Row2([p2["BLK"], p2["G"], p2["MP"], p2["FG%"]])
                // console.log(response)



            })
            .catch(function (error) {          
                console.log(error.message);
                throw error;   
            });
    };


    function dataPress(name) {
        
        questionRespRef.child(qKey).child(name).once('value').then(function(snapshot) {
            val = snapshot.val();
            questionRespRef.child(qKey).child(name).set(val+1)
            
        }).then(loadData())
        
        
    }

    

    useEffect(() => {
        console.log(baseUrl);
        loadData();
        
    }, []);
    

    // useEffect(() => {
    //     // console.log({ bootcamps });
    //     // console.log(bootcamps["p1"])
    //     console.log(bootcamps["p1"]["AST"])
    // }, [bootcamps]);


    const customStyles = StyleSheet.create({
        container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
        head: { height: 40, backgroundColor: '#f1f8ff' },
        text: { margin: 6 },
        tableTop: { marginTop: 80, marginBottom: 5}
    });
   

    

    return (
      //SafeAreaView is used to make the flatlist take up the full screen. Only necessary for iOS devices on iOS versions 11+
      <SafeAreaView style={styles.container}>
            <FlatList 
            data={playerNames}
            renderItem={({item, index}) => (
              <View style={styles.container}>

                <Table style={customStyles.tableTop} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={titleHead} style={customStyles.head} textStyle={customStyles.text}/>
                    <Row data={(index==0) ? p1title : p2title} textStyle={customStyles.text}/>
                </Table>

                <TouchableOpacity
                    key = {index}
                    style={styles.button3}
                    onPress={() => dataPress(playerNames[index])}
                   >
                   
                    <Image
                        source={{ uri: playerUris[index] }}
                        // resizeMode={'cover'}
                        style={{flex:1, width: 210, height: 400, marginBottom: 10}}/>

                    <Text style={styles.homeScreenText}>
                        {item}</Text>
                    
                </TouchableOpacity>
                {/* <Button style = {styles.button2} onPress={() => loadData()}>
                <Text>Better</Text>
                </Button> */}

                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={table1head} style={customStyles.head} textStyle={customStyles.text}/>
                    <Row data={(index==0) ? p1row1 : p2row1} textStyle={customStyles.text}/>
                </Table>


                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={table2head} style={customStyles.head} textStyle={customStyles.text}/>
                    <Row data={(index==0) ? p1row2 : p2row2} textStyle={customStyles.text}/>
                </Table>

                </View>
            )}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1 }}
            keyExtractor={(item, index) => index ? index.toString() : ""}
            numColumns={2} 
        />
      </SafeAreaView>
    );
}
