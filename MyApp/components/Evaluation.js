import React, { Component, useState} from 'react';
import { customStyles4 } from "../style.js";
import {COLORS} from '../style.js';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectVue from './NewProject';
import Slider from '@react-native-community/slider';


class EvaluationVue extends Component {
  state = {
      value: 0.2,
  };
  

  render() {
      return (
          <View style={styles.container}>
              <Slider
                    animateTransitions
                    minimumTrackTintColor="#d14ba6"
                    thumbStyle={customStyles4.thumb}
                    trackStyle={customStyles4.track}
                />
              <Text>Achievement: 01</Text>
              <Slider
                    animateTransitions
                    minimumTrackTintColor="#d14ba6"
                    thumbStyle={customStyles4.thumb}
                    trackStyle={customStyles4.track}
                />
              <Text>Fatigue: 01</Text>
              <Slider
                    animateTransitions
                    minimumTrackTintColor="#d14ba6"
                    thumbStyle={customStyles4.thumb}
                    trackStyle={customStyles4.track}
                />
              <Text>Product: 01</Text>
          </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
});


// const SliderContainer = (props: {
//   caption: string;
//   children: React.ReactElement;
//   sliderValue?: Array<number>;
//   trackMarks?: Array<number>;
//   vertical?: boolean;
// }) => {
//   const {caption, sliderValue, trackMarks} = props;
//   const [value, setValue] = React.useState(
//       sliderValue ? sliderValue : 0,
//   );
//   let renderTrackMarkComponent: React.ReactNode;

//   if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
//       renderTrackMarkComponent = (index: number) => {
//           const currentMarkValue = trackMarks[index];
//           const currentSliderValue =
//               value || (Array.isArray(value) && value[0]) || 0;
//           const style =
//               currentMarkValue > Math.max(currentSliderValue)
//                   ? trackMarkStyles.activeMark
//                   : trackMarkStyles.inactiveMark;
//           return <View style={style} />;
//       };
//   }

//   const renderChildren = () => {
//       return React.Children.map(
//           props.children,
//           (child: React.ReactElement) => {
//               if (!!child && child.type === Slider) {
//                   return React.cloneElement(child, {
//                       onValueChange: setValue,
//                       renderTrackMarkComponent,
//                       trackMarks,
//                       value,
//                   });
//               }

//               return child;
//           },
//       );
//   };

//   return (
//       <View style={styles.sliderContainer}>
//           <View style={styles.titleContainer}>
//               <Text>{caption}</Text>
//               <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
//           </View>
//           {renderChildren()}
//       </View>
//   );
// };


export default EvaluationVue;
