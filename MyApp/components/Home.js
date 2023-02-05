import * as React from 'react';
import { ProgressViewIOSComponent, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import ProjectVue from './NewProject';
import NewTaskVue from './NewTaskVue';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {COLORS} from '../style.js';
import * as Progress from 'react-native-progress';


function DefaultHomeVue({ navigation }) {
  const name = "Jeanne";
  const now = 0.60;
  const level= 7;
  const actions = [
    {
      text: "Nouveau projet",
      icon: require("../images/ic_accessibility_white.png"),
      name: "bt_accessibility",
      position: 1,
      color: '#541388'
    },
    {
      text: "Nouvelle tâche unitaire",
      icon: require("../images/ic_accessibility_white.png"),
      name: "bt_language",
      position: 2,
      color: '#541388'
    }
  ];
  return (
    <ImageBackground source={require('../assets/mountain.jpg')} resizeMode={'cover'}style={homeStyle.image}>
    <View style={{ flex: 1, alignItems: 'center'}}>
      <Text style={homeStyle.title}>Bonjour {name} !</Text>
      <Text style={homeStyle.subtitle}>Prête à atteindre tes objectifs ?</Text>
{/*       <FloatingAction
        actions={actions}
        color='#541388'
        onPressItem={name => {
          navigation.navigate("Nouveau Projet");
        }}
      /> */}
    <View style={{ padding : 10,flex: 1 , alignSelf : 'center'}}>
          <View style={{ padding : 10,flex: 1 , alignSelf : 'center'}}>
            <Text style={homeStyle.title}>LEVEL {level}</Text>
            <Progress.Bar  style={{  alignSelf: 'center'}} animationType='decay' borderWidth={3} borderColor={'black'} color={'grey'} progress={now} width={300} animated={true} height={40}/>
            <Text style={homeStyle.subtitle}>{now*100}%</Text>
            
          </View>
          <View style={{ padding : 30,flex: 2 , alignSelf : 'center', marginLeft: 10, marginRight: 10, marginTop: 40, marginBottom: -40}}>
            <View style={{ padding : 10,flex: 1 , alignSelf : 'center', flexDirection:'row'}}>
              <Progress.Circle  thickness={8} borderWidth={0.2} borderColor={'grey'} color={('white')} size={80} progress={0.28} showsText={true}/>
              <Text style={homeStyle.subtitlepadw}>Complétion des tâches</Text>
            </View>
            <View style={{ padding : 10,flex: 1 , alignSelf : 'center', flexDirection:'row'}}>
              <Progress.Circle thickness={8} borderWidth={0.2} borderColor={'grey'} color={'white'} size={70} progress={0.67} showsText={true}/>
              <Text style={homeStyle.subtitlepadw}>Productivité</Text>
            </View>
            <View style={{ padding : 10,flex: 1, alignSelf : 'center', flexDirection:'row'}}>
              <Progress.Circle thickness={8} borderWidth={0.2} borderColor={'grey'} color={'white'} size={70} progress={0.42} showsText={true}/>
              <Text style={homeStyle.subtitlepadw}>Fatigue</Text>
            </View>
          </View>
          </View>
          </View>
    </ImageBackground>
  );
}

const homeStyle = StyleSheet.create({
  title: {
    color:'#2e294e',
    fontWeight:'900',
    textAlign: 'center',
    border: '1px solid red',
    fontSize: 25,
    textAlignVertical:'top',
    verticalAlign:'top',
    marginTop: 60
  },
  subtitle:{
    color:'#2e294e',
    fontWeight:'600',
    textAlign: 'center',
    fontSize: 20,
  },
  subtitlepad:{
    padding: 60,
    color:'#2e294e',
    fontWeight:'600',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
  subtitlepadw:{
    padding: 30,
    color:'white',
    fontWeight:'600',
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: 18,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    //opacity: 1.5,
  },
  subtitle:{
    color:'#2e294e',
    fontWeight:'600',
    textAlign: 'left',
    fontSize: 20,
  },
});

const HomeStack = createNativeStackNavigator();

function HomeStackVue() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Accueil" component={DefaultHomeVue}/>
      <HomeStack.Screen name="Nouveau Projet" component={ProjectVue} />
      <HomeStack.Screen name="Nouvelle tâche unitaire" component={NewTaskVue} />
    </HomeStack.Navigator>
  );
}

export default HomeStackVue;