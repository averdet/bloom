import * as React from 'react';

import { ProgressViewIOSComponent, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Progress from 'react-native-progress';

function ProgressVue() {
    const now = 0.60;
    const level= 7;
    return (
      <ImageBackground blurRadius={6} source={require('../assets/mountain.jpg')} resizeMode={'cover'}style={homeStyle.image}>
        <View style={{ padding : 10,flex: 1, alignItems: 'center' }}>
          <Text style={homeStyle.title}>LEVEL {level}</Text>
          <Progress.Bar animationType='decay' borderWidth={3} borderColor={'black'} color={' grey'} progress={now} width={300} animated={true} height={25}/>
          <Text>{now*100}%</Text>
        </View>
      </ImageBackground>
    );
  }

const ProgressStack = createNativeStackNavigator();

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
    opacity: 1.5,
    
  },
});

function ProgressStackVue() {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen name="Progrès" component={ProgressVue} />
      
    </ProgressStack.Navigator>
  );
}

export default ProgressStackVue;