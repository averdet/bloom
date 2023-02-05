import * as React from 'react';
import { ProgressViewIOSComponent, Text, View } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import ProjectVue from './NewProject';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function DefaultHomeVue({ navigation }) {
  const name = "Bob";
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bonjour {name} !</Text>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          navigation.navigate("Nouveau Projet");
          console.log(`selected button: ${name}`);
        }}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackVue() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Accueil" component={DefaultHomeVue} />
      <HomeStack.Screen name="Nouveau Projet" component={ProjectVue} />
    </HomeStack.Navigator>
  );
}

export default HomeStackVue;