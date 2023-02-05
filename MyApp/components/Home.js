import * as React from 'react';
import { ProgressViewIOSComponent, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import ProjectVue from './NewProject';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {COLORS} from '../style.js';



function DefaultHomeVue({ navigation }) {
  const name = "Jeanne";
  const actions = [
    {
      text: "Nouveau projet",
      icon: require("../images/ic_accessibility_white.png"),
      name: "bt_accessibility",
      position: 1
    },
    {
      text: "Nouvelle tâche unitaire",
      icon: require("../images/ic_accessibility_white.png"),
      name: "bt_language",
      position: 2
    }
  ];
  return (
    <ImageBackground source={require('../assets/mountain.jpg')} resizeMode={'cover'}style={homeStyle.image}>
    <View style={{ flex: 1, alignItems: 'center'}}>
      <Text style={homeStyle.title}>Bonjour {name} !</Text>
      <Text style={homeStyle.subtitle}>Prête à atteindre tes objectifs ?</Text>
      <FloatingAction
        actions={actions}
        style={{backgoundColor:'red'}}
        onPressItem={name => {
          navigation.navigate("Nouveau Projet");
        }}
      />
    </View>
    </ImageBackground>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackVue() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Accueil" component={DefaultHomeVue}/>
      <HomeStack.Screen name="Nouveau Projet" component={ProjectVue} />
    </HomeStack.Navigator>
  );
}

export default HomeStackVue;

const homeStyle = StyleSheet.create({
  title: {
    color:'#2e294e',
    fontWeight:'900',
    textAlign: 'left',
    border: '1px solid red',
    fontSize: 25,
    textAlignVertical:'top',
    verticalAlign:'top',
    marginTop: 60
  },
  subtitle:{
    color:'#2e294e',
    fontWeight:'600',
    textAlign: 'left',
    fontSize: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});