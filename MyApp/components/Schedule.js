import * as React from 'react';
import Timeline from 'react-native-timeline-flatlist';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { page } from "../style.js";

function ScheduleVue() {
    return(
      <View style={styles.container}>
        <Text style={text}>Programme du jour</Text>
        <Timeline
        data={[
          {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
          {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
          {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
          {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
          {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
        ]}
        // circleSize={20}
        circleColor='#4285F4'
        lineColor='#4285F4'
        options={{
          style:{paddingTop:5,
                backgroundColor: 'grey',
              }
        }}
        />
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
		paddingTop:65,
    justifyContent: 'center'
  },
  text:{
    textAlign: 'center',
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});

const text = StyleSheet.compose(page.title);

export default ScheduleVue;