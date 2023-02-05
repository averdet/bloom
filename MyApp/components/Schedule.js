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
      data.push({"time":json[i].start.dateTime.slice(11,16),"title":json[i].summary,"description":json[i].description})
    }
    else{
      data.push({"time":json[i].start.dateTime.slice(11,16),"title":json[i].summary,"description":""})
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

  onRefresh(){
    console.log(getData());
    this.setState({isRefreshing: true});
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: eventsToParsed(),
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
          circleColor='#541388'
          lineColor='#2e294e'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#595959', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          onEventPress={name => {
            this.props.navigation.navigate("Evaluation", {data: getData()});
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
          innerCircle={'dot'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
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
    </ScheduleStack.Navigator>
  );
}

export default ScheduleStackVue;
