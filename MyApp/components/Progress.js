import * as React from 'react';
import { Text, View } from 'react-native';
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

export default ProgressVue;