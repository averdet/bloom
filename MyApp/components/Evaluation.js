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
import { Button } from 'react-native-elements';

class EvaluationVue extends Component {
  state = {
      value: 0.2,
  };

  percent(value){
    return value*100;
  }

  render() {
    const { route } = this.props;
    var data = route.params.data._z;

      return (
          <View style={styles.container}>
              <Slider
                    animateTransitions
                    minimumTrackTintColor="#d14ba6"
                    // thumbStyle={customStyles4.thumb}
                    // trackStyle={customStyles4.track}
                    achievement={this.state.achievement}
                    onValueChange={(achievement) => this.setState({ achievement })}
                />
              <Text>Achievement: {this.percent(this.state.achievement)}%</Text>
              <Slider
                    animateTransitions
                    minimumTrackTintColor="#d14ba6"
                    // thumbStyle={customStyles4.thumb}
                    // trackStyle={customStyles4.track}
                    fatigue={this.state.fatigue}
                    onValueChange={(fatigue) => this.setState({ fatigue })}
                />
              <Text>Fatigue: {this.percent(this.state.fatigue)}%</Text>
              <Slider
                    animateTransitions
                    minimumTrackTintColor="#d14ba6"
                    // thumbStyle={customStyles4.thumb}
                    // trackStyle={customStyles4.track}
                    productivity={this.state.productivity}
                    onValueChange={(productivity) => this.setState({ productivity })}
                />
              <Text>Productivity: {this.percent(this.state.productivity)}%</Text>
              <Button
                title="Enregistrer"
                buttonStyle={{backgroundColor:"#ffd400"}}
                onPress={title => {
                  this.props.navigation.goBack();
                }}
              />
          </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
