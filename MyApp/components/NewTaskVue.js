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

class NewTaskVue extends Component {

  render() {
      return (
          <View style={styles.container}>

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

export default NewTaskVue;
