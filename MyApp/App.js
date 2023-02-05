import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleStackVue from './components/Schedule';
import HomeStackVue from './components/Home';
import StatsStackVue from './components/Stats';
import ProgressStackVue from './components/Progress';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Accueil" component={HomeStackVue}/>
        <Tab.Screen name="Programme" component={ScheduleStackVue}/>
        <Tab.Screen name="Progrès" component={ProgressStackVue} />
        <Tab.Screen name="Stats" component={StatsStackVue} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}