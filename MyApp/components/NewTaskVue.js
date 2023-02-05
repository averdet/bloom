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

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@eventsData', jsonValue)
  } catch (e) {
    // saving error
  }
  console.log("Data stored")
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@eventsData')
    console.log(jsonValue)
    return jsonValue != null ? jsonValue : null;
  } catch(e) {
    console.log("Data not extracted")
    // error reading value
  }
  console.log("Data extracted")
}


const NewTaskVue = ({navigation, route}) => {

  const [name, setName] = useState("");
  const [hour, setHour] = useState("");
  const [period, setPeriod] = useState("");

      return (
          <View style={styles.container}>
              <Form onButtonPress={() => {
                route.params.data.push(
                  {"achievement": 0, "completed": false, "description": "", "fatigue": 0, "productivity": 0, "time": hour, "title": name}
                );
                navigation.goBack();
              }}
              buttonStyle={{colorBackground: '#ffd400'}}>
                <FormItem 
                label="Nom de la tâche"
                value={name}
                isRequired
                onChangeText={(name) => setName(name)}
                asterik
                />
                <FormItem 
                label="Heure de début"
                value={hour}
                isRequired
                onChangeText={(hour) => setHour(hour)}
                asterik
                />
                <FormItem 
                label="Duŕee"
                value={period}
                isRequired
                onChangeText={(period) => setPeriod(period)}
                asterik
                />
              </Form>
          </View>
      );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

/* const NewTaskStack = createNativeStackNavigator();

function NewTaskStackVue() {
  return (
    <NewTaskStack.Navigator>
      <NewTaskStack.Screen name="Programme" component={ScheduleVue} />
      <NewTaskStack.Screen name="Evaluation" component={EvaluationVue} />
      <NewTaskStack.Screen name="Nouvelle tache unitaire" component={NewTaskVue}/>
    </NewTaskStack.Navigator>
  );
} */

export default NewTaskVue;
