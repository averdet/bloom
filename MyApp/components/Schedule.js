import React, { Component } from 'react';
import Timeline from 'react-native-timeline-flatlist';
import { page } from "../style.js";
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
import EvaluationVue from './Evaluation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FloatingAction } from "react-native-floating-action";
import NewTaskVue from './NewTaskVue.js'

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





function eventsToParsed(){
  var json= require('../assets/events.json');
  var json_length = json.length;
  var data=[]
  for (var i = 0; i < json_length; i++) {
    if (json[i].description!=undefined){
      data.push({"time":json[i].start.dateTime.slice(11,16),"title":json[i].summary,"description":json[i].description,achievement:0,fatigue:0,productivity:0,"completed":false})
    }
    else{
      data.push({"time":json[i].start.dateTime.slice(11,16),"title":json[i].summary,"description":"",achievement:0,fatigue:0,productivity:0,"completed":false})
    }
   }
   return data;
};

export class ScheduleVue extends Component {
  
  constructor(){
    super()
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)


    this.data = eventsToParsed();

    storeData(this.data);

    this.state = {
      isRefreshing: false,      
      waiting: false,
      data: this.data
    }

    this.actions = [
      {
        text: "Evaluation",
        icon: require("../images/ic_accessibility_white.png"),
        name: "bt_accessibility",
        position: 1
      }
    ];
  } 

  stateTask = function(time) {
    var timePassed = false
    var isUncompleted = false
    if (timePassed && !isUncompleted){
      return {backgroundColor: '#541388',innerCircle: 'none'}
    }
    else if (timePassed && isUncompleted){
      return {backgroundColor: '#ffd400',innerCircle: 'none'}
    }
    else {
      return {backgroundColor: '#541388',innerCircle: 'dot'}
    }
  }

  onRefresh(){
    console.log(getData());
    this.setState({isRefreshing: true});
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        isRefreshing: false
      });
    }, 2000);
  }

  onEndReached() {
    if (!this.state.waiting) {
        this.setState({waiting: true});

        //fetch and concat data
        setTimeout(() => {

 
        }, 2000);
    }
  }

renderFooter() {
    if (this.state.waiting) {
        return <ActivityIndicator />;
    } else {
        return <Text>~</Text>;
    }
  }

  stateTask = function(completed) {
    if (completed){
      return {backgroundColor: '#541388',innerCircle: 'none'}
    }
    else {
      return {backgroundColor: '#541388',innerCircle: 'dot'}
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={
          style.title
        }>Tâches du jour</Text>
        <Timeline 
          style={styles.list}
          data={this.state.data}
          circleSize={20}
          circleColor={(item) => {stateTask(item.completed).backgroundColor}}
          innerCircle={(item) => item.completed ? 'dot' : 'none'}
          lineColor='#2e294e'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#595959', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          onEventPress={(item) => {
            console.log(item.completed);
            this.props.navigation.navigate("Evaluation", {data: item});
          }}
          options={{
            style:{paddingTop:5},
            refreshControl: (
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            ),
            renderFooter: this.renderFooter,
            onEndReached: this.onEndReached
          }}
        />
      </View>
    );
  }
}

const actions = [
  {
    text: "Nouvelle tâche unitaire",
    icon: require("../images/ic_accessibility_white.png"),
    name: "bt_language",
    position: 2,
    color: '#541388'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  list: {
    flex: 1,
    marginTop:20,
  }
});

const text = StyleSheet.compose(page.title);
const container = StyleSheet.compose(page.container);
const style = StyleSheet.compose(page);

const ScheduleStack = createNativeStackNavigator();

function ScheduleStackVue() {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen name="Programme" component={ScheduleVue} />
      <ScheduleStack.Screen name="Evaluation" component={EvaluationVue} />
      <ScheduleStack.Screen name="Nouvelle tache unitaire" component={NewTaskVue}/>
    </ScheduleStack.Navigator>
  );
}

export default ScheduleStackVue;
