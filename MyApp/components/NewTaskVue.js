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
import { Button } from 'react-native-elements';
import { Form, FormItem } from 'react-native-form-component';

class NewTaskVue extends Component {

  render() {
      var nameImput
      var beginingHourInput
      var periodInput
      return (
          <View style={styles.container}>
              <Form onButtonPress={() => {this.props.navigation.goBack();}}
              buttonStyle={{colorBackground: '#ffd400'}}>
                <FormItem 
                label="Nom de la tâche"
                isRequired
                onChangeText={(name) => setName(name)}
                asterik
                ref={nameImput}
                />
                <FormItem 
                label="Heure de début"
                isRequired
                onChangeText={(hour) => setHour(hour)}
                asterik
                ref={beginingHourInput}
                />
                <FormItem 
                label="Duŕee"
                isRequired
                onChangeText={(period) => setPeriod(period)}
                asterik
                ref={periodInput}
                />
              </Form>
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
