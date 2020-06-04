import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import Colors from "../styles/Colors";

import MapScreen from "./MapScreen";
import StepsScreen from "./StepsScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import uStyles from '../styles';

const Tab = createMaterialTopTabNavigator();

export default function DirectionsScreen({ route, navigation }) {

  getSteps = async (location) => {

    if(location.length == 0) { getLocation(); }

    try {
      console.log('Fetching steps...');
      const directions = await getDirections([location.coords.longitude,location.coords.latitude],[selectedBuilding.longitude,selectedBuilding.latitude]);
      setSteps(directions.routes[0].legs[0].steps);
      console.log('Successfully gathered steps');
    } catch(error) {
      console.log(error.message);
    }

  };

  
  return (
    <>
      <SafeAreaView>
        <View style={styles.body}>
          <View style={[styles.sectionContainer, uStyles.centerContent]}>
            <Text style={styles.sectionTitle}>START POINT</Text>
            <View style={uStyles.horizontalStack}></View>
              <Text style={styles.sectionTitle}>END POINT</Text>
              <View style={uStyles.horizontalStack}></View>

          </View>
          <View styles={styles.sectionContainer}>
          </View>
        </View>
      </SafeAreaView>
      {/* Create the two tabs using React Navigation Materials Top Tabs */}
      <Tab.Navigator>
        <Tab.Screen name="Steps & More" component={StepsScreen} />
        <Tab.Screen name="Map View" component={MapScreen} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 75,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
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
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});