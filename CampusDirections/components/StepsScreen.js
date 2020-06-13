import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Image,
  Text,
  StatusBar,
} from 'react-native';

import Colors from "../styles/Colors";
import uStyles from '../styles';

const width_hr = '100%';

function StepItem({instruction, distance, modifier, type}) {

  var path = '';
  if(modifier) {
    path = 'arrows/' + modifier;
  }
  if (type == 'arrive') {
    path = 'arrive';
  }
  if (type == 'depart') {
    path = 'marker-50';
  }

  console.log(path);

  return(
    <>
    <View style={uStyles.horizontalStack}>
      <Image source={require(`../assets/${path}.png`)} style={styles.largeIcon} />
      <Text style={styles.sectionDescription}>{instruction}</Text>
    </View>
    <View style={styles.hStack}>
      <Text style={styles.sectionDescription}>{(distance * 0.304799).toFixed(1)} ft</Text>
 
    </View>
    </>
  );
}

export default function StepsScreen({ route, navigation }) {

  const [directions, setDirections] = useState(route.params.directions);
  const [position, setPosition] = useState(route.params.position);
  const [destination, setDestination] = useState(route.params.destination);

  const [steps, setSteps] = useState([]);

  useEffect(() => {
    console.log('loading steps view');
    console.log('STEPS:');
    console.log(directions.legs[0].steps);
    setSteps(directions.legs[0].steps);

  }, [steps, directions, destination, position]);

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>{(directions.duration/60).toFixed(0)} min ({(directions.distance * 0.00062137).toFixed(1)}mi)</Text>
          <View style={styles.sectionContainer}>
            <View style={styles.hStack}>
              <Image source={require('../assets/box-important-50.png')} style={styles.largeIcon} />
              <Text style={styles.caution} >Use Caution &#8212; walking directions may not always reflect real-world conditions.</Text>
            </View>
            <View style={styles.hr}></View>
            <Text style={styles.sectionDescription}>Steps</Text>
            {
              steps.map((step, index) => (
                <StepItem key={index} type={step.maneuver.type} instruction={step.maneuver.instruction} distance={step.distance} modifier={step.maneuver.modifier} />
              ))
            }
          </View>

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 15,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
    padding: 12,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.dark,
  },
  caution: {
    marginLeft: 12,
    marginTop: 7,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '500',
    color: Colors.black,
  },
  highlight: {
    fontWeight: '700',
  },
  largeIcon: {
    marginVertical: 8,
    width: 20,
    height:20,
  },
  hr: {
    marginVertical: 12,
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    width: width_hr,
  },
  hStack: {
    flexDirection: 'row',
  },
});