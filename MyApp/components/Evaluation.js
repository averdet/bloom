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

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@eventsData')
    return jsonValue;
  } catch(e) {
    console.log("Data not extracted")
    // error reading value
  }
  console.log("Data extracted")
}

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@eventsData', jsonValue)
  } catch (e) {
    // saving error
  }
  console.log("Data stored")
}


class EvaluationVue extends Component {
  state = {
      value: 0.2,
  };

  percent(value){
    return value*100;
  }

  render() {
    const { route } = this.props;
    //console.log(route.params);
    //var data = route.params.data;
    //console.log(data);
      return (
          <View style={styles.container}>
              <Slider
                    animateTransitions
                    minimumTrackTintColor="#d14ba6"
                    // thumbStyle={customStyles4.thumb}
                    // trackStyle={customStyles4.track}
                    value={route.params.data.achievement/100}
                    achievement={this.state.achievement}
                    onValueChange={(achievement) => this.setState({ achievement })}
                />
              <Text>Achievement: {Math.round(this.percent(this.state.achievement))}%</Text>
              <Slider
                    animateTransitions
                    minimumTrackTintColor="#d14ba6"
                    // thumbStyle={customStyles4.thumb}
                    // trackStyle={customStyles4.track}
                    value={route.params.data.fatigue/100}
                    fatigue={this.state.fatigue}
                    onValueChange={(fatigue) => this.setState({ fatigue })}
                />
              <Text>Fatigue: {Math.round(this.percent(this.state.fatigue))}%</Text>
              <Slider
                    animateTransitions
                    minimumTrackTintColor="#d14ba6"
                    // thumbStyle={customStyles4.thumb}
                    // trackStyle={customStyles4.track}
                    value={route.params.data.productivity/100}
                    productivity={this.state.productivity}
                    onValueChange={(productivity) => this.setState({ productivity })}
                />
              <Text>Productivity: {Math.round(this.percent(this.state.productivity))}%</Text>
              <Button
                title="Enregistrer"
                buttonStyle={{backgroundColor:"#ffd400"}}
                onPress={title => {
                  route.params.data.achievement=Math.round(this.percent(this.state.achievement));
                  route.params.data.fatigue=Math.round(this.percent(this.state.fatigue));
                  route.params.data.productivity=Math.round(this.percent(this.state.productivity));
                  route.params.data.completed=true;
                  route.params.data.title += ' ✅';
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
