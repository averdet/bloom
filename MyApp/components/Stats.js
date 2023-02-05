import * as React from 'react';
import { Text, View } from 'react-native';
import { VictoryBar } from "victory-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function StatsVue() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>!</Text>
        <VictoryBar />
      </View>
    );
  }

const StatsStack = createNativeStackNavigator();

function StatsStackVue() {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen name="Statistiques" component={StatsVue} />
    </StatsStack.Navigator>
  );
}

export default StatsStackVue;