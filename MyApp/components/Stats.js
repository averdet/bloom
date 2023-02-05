import * as React from 'react';
import { Text, View } from 'react-native';
import { VictoryBar } from "victory-native";


function StatsVue() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>!</Text>
        <VictoryBar />
      </View>
    );
  }

export default StatsVue;