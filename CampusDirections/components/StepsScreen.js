import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';

import Colors from "../styles/Colors";
import uStyles from '../styles';

function StepItem({instruction, distance}) {
  return(
    <>
    <View style={uStyles.horizontalStack}>
      {/* <Image source={require('../assets/' + modifier + '.png')} style={styles.largeIcon} /> */}
      <Text style={styles.sectionDescription}>{instruction}</Text>
    </View>
    <Text>{(distance * 0.304799).toFixed(1)}</Text>
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
            {
              steps.map((step, index) => (
                <StepItem key={index} instruction={step.maneuver.instruction} distance={step.distance}/>
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
    color: Colors.black,
    padding: 12,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  largeIcon: {
    marginVertical: 8,
    width: 20,
    height:20,
  },
});