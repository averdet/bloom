import * as React from 'react';
import { Text, View } from 'react-native';

function HomeVue() {
    const name = "Alexandre";
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Bonjour {name} !</Text>
      </View>
    );
  }

export default HomeVue;