import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FloatingAction } from "react-native-floating-action";
import { format } from 'react-string-format';


const name = "Alexandre";
const actions = [
  {
    text: "Accessibility",
    icon: require("./images/ic_accessibility_white.png"),
    name: "bt_accessibility",
    position: 2
  },
  {
    text: "Language",
    icon: require("./images/ic_accessibility_white.png"),
    name: "bt_language",
    position: 1
  },
  {
    text: "Location",
    icon: require("./images/ic_accessibility_white.png"),
    name: "bt_room",
    position: 3
  },
  {
    text: "Video",
    icon: require("./images/ic_accessibility_white.png"),
    name: "bt_videocam",
    position: 4
  }
];
function HomeVue() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bonjour {name} !</Text>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
      />
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