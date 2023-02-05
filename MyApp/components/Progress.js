import * as React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function ProgressVue() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
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