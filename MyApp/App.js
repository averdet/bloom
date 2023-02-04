import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { format } from 'react-string-format';


const name = "Alexandre";
function HomeVue() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bonjour {name} !</Text>
    </View>
  );
}


function ScheduleVue() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Programme de la journée</Text>
    </View>
  );
}

function ProgressVue() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function StatsVue() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Accueil" component={HomeVue} />
        <Tab.Screen name="Programme" component={ScheduleVue} />
        <Tab.Screen name="Progrès" component={ProgressVue} />
        <Tab.Screen name="Stats" component={StatsVue} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}