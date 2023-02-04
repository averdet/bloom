import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleVue from './components/Schedule';
import HomeVue from './components/Home';
import StatsVue from './components/Stats';
import ProgressVue from './components/Progress';
import { format } from 'react-string-format';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Accueil" component={HomeVue} />
        <Tab.Screen name="Programme" component={ScheduleVue}/>
        <Tab.Screen name="Progrès" component={ProgressVue} />
        <Tab.Screen name="Stats" component={StatsVue} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}