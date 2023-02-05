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
        <Tab.Screen name="AccueilStack" component={HomeStackVue}/>
        <Tab.Screen name="ProgrammeStack" component={ScheduleStackVue}/>
        <Tab.Screen name="ProgrèsStack" component={ProgressStackVue} />
        <Tab.Screen name="StatsStack" component={StatsStackVue} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}