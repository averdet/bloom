import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleStackVue from './components/Schedule';
import HomeStackVue from './components/Home';
import StatsStackVue from './components/Stats';
import ProgressStackVue from './components/Progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgba(54,54,56,0.95)',
            },
            // tabBarLabelStyle: {
            //   color: '#ffd400'
            // },
            tabBarActiveTintColor: '#ffd400'
            // tabBarLabelPosition​: 'beside-icon',
    }}>
        <Tab.Screen name="Accueil" component={HomeStackVue} options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="rocket" color={color} size={size} />
          ),}}/>
        <Tab.Screen name="Programme" component={ScheduleStackVue} options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),}}/>
{/*         <Tab.Screen name="Progrès" component={ProgressStackVue} options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="rocket" color={color} size={size} />
          ),}}/> */}
{/*         <Tab.Screen name="Stats" component={StatsStackVue} options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={size} />
          ),}}/> */}

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = {
  tabBarStyle:{
    backgroundColor:'rgba(42,42,50, 0.6)'
  }
}