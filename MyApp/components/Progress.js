import * as React from 'react';

import { ProgressViewIOSComponent, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Progress from 'react-native-progress';

function ProgressVue() {
    const now = 0.60;
    const level= 7;
    return (
      <ImageBackground blurRadius={6}  source={require('../assets/mountain.jpg')} resizeMode={'cover'}style={homeStyle.image}>
          <View style={{ padding : 10,flex: 1 , alignSelf : 'center'}}>
            <Text style={homeStyle.title}>LEVEL {level}</Text>
            <Progress.Bar  style={{  alignSelf: 'center'}} animationType='decay' borderWidth={3} borderColor={'black'} color={'white'} progress={now} width={300} animated={true} height={25}/>
            <Text style={homeStyle.subtitle}>{now*100}%</Text>
            
          </View>
          <View style={{ padding : 20,flex: 2 , alignSelf : 'center'}}>
            <View style={{ padding : 10,flex: 1 , alignSelf : 'center', flexDirection:'row'}}>
              <Progress.Circle  thickness={8} borderWidth={0.2} borderColor={'grey'} color={'white'} size={80} progress={0.27} showsText={true}/>
              <Text style={homeStyle.subtitlepadw}>Complétion des tâches quotidiennes</Text>
            </View>
            <View style={{ padding : 10,flex: 1 , alignSelf : 'center', flexDirection:'row'}}>
              <Progress.Circle thickness={8} borderWidth={0.2} borderColor={'grey'} color={'white'} size={70} progress={0.52} showsText={true}/>
              <Text style={homeStyle.subtitlepadw}>Productivité moyenne sur la journée</Text>
            </View>
            <View style={{ padding : 10,flex: 1, alignSelf : 'center', flexDirection:'row'}}>
              <Progress.Circle thickness={8} borderWidth={0.2} borderColor={'grey'} color={'white'} size={70} progress={0.95} showsText={true}/>
              <Text style={homeStyle.subtitlepadw}>Productivité </Text>
            </View>
          </View>
        
      </ImageBackground>
    );
  }

const ProgressStack = createNativeStackNavigator();

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
    color:'#fffffe',
    fontWeight:'600',
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: 15,
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