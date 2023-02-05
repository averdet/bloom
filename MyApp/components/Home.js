import * as React from 'react';
import { Text, View } from 'react-native';
import { FloatingAction } from "react-native-floating-action";


function HomeVue() {
  const name = "Bob";
  const actions = [
    {
      text: "Accessibility",
      icon: require("../images/ic_accessibility_white.png"),
      name: "bt_accessibility",
      position: 2
    },
    {
      text: "Language",
      icon: require("../images/ic_accessibility_white.png"),
      name: "bt_language",
      position: 1
    },
    {
      text: "Location",
      icon: require("../images/ic_accessibility_white.png"),
      name: "bt_room",
      position: 3
    },
    {
      text: "Video",
      icon: require("../images/ic_accessibility_white.png"),
      name: "bt_videocam",
      position: 4
    }
  ];
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

export default HomeVue;