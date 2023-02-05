import * as React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Progress from 'react-native-progress';

function ProgressVue() {
    const now = 0.60;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Progress.Bar progress={now} width={200} animated={true} />
        <Text>{now*100}%</Text>
      </View>
    );
  }

const ProgressStack = createNativeStackNavigator();

function ProgressStackVue() {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen name="Progrès" component={ProgressVue} />
    </ProgressStack.Navigator>
  );
}

export default ProgressStackVue;