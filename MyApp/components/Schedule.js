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




export class ScheduleVue extends Component {
  
  constructor(){
    super()
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)

    this.data = [
      {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. '},
      {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
      {time: '12:00', title: 'Lunch'},
      {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. '},
      {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)'},
    ]

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
    this.setState({isRefreshing: true});
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: this.data,
        isRefreshing: false
      });
    }, 2000);
  }

  onEndReached() {
    if (!this.state.waiting) {
        this.setState({waiting: true});

        //fetch and concat data
        setTimeout(() => {

          //refresh to initial data
          var data = this.state.data.concat(
            [
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'}
            ]
            )

          this.setState({
            waiting: false,
            data: data,
          });
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
            this.props.navigation.navigate("Evaluation");
            console.log(`selected button:`);
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
      <ScheduleStack.Screen name="Evaluation" component={ProjectVue} />
    </ScheduleStack.Navigator>
  );
}

export default ScheduleStackVue;
