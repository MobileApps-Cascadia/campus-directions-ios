import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
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
const width_proportion = '80%';

export default function DirectionsScreen({route, navigation }) {

  const [destination, setDestination] = useState(route.params.destination);
  const [position, setPosition] = useState(route.params.position);
  const [directions, setDirections] = useState(route.params.directions);

  useEffect(() => {
    // console.log('DESTINATION AGAIN:');
    // console.log(destination);

    // console.log('POSITION  AGAIN:');
    // console.log(position);

    // console.log('DIRECTIONS AGAIN:');
    // console.log(directions);

  }, [destination, position, directions]);

  return (
    <>
      <SafeAreaView>
        <View style={styles.body}>

          <View>

            <View style={styles.textBoxStack}>
              <Image
                style={styles.largeIcon}
                source={require('../assets/circle-50.png')} 
              />
              <View style={styles.textBox}>
                <Text style={styles.sectionDescription}>{position.coords.longitude.toFixed(5)}, {position.coords.latitude.toFixed(5)}</Text>
              </View>
            </View>

            <View style={uStyles.textBoxStack}>
              <Image
                style={styles.menuVertical}
                source={require('../assets/menu-vertical-50.png')}
              />
            </View>

            <View style={styles.textBoxStack}>
              <Image
                style={styles.largeIcon}
                source={require('../assets/marker-50.png')}
              />              
              <View style={styles.textBox}>
                <Text style={styles.sectionDescription}>{destination.buildingName}</Text>
              </View>
            </View>

            <View style={uStyles.horizontalStack}></View>
          </View>

          <View styles={uStyles.centerContent}></View>

        </View>
      </SafeAreaView>
      {/* Create the two tabs using React Navigation Materials Top Tabs */}
      <Tab.Navigator>
        <Tab.Screen
          name="StepsView"
          component={StepsScreen}
          options={{ tabBarLabel: 'STEPS & MORE' }}
          initialParams={{ 
            directions: route.params.directions,
            position: route.params.position,
            destination: route.params.destination 
          }}
        />
        <Tab.Screen
          name="MapView"
          component={MapScreen}
          options={{ tabBarLabel: 'MAP VIEW' }}
          initialParams={{ 
            directions: route.params.directions,
            position: route.params.position,
            destination: route.params.destination 
          }}
        />
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
  textBoxStack: {
    marginTop: 12,
    flexDirection: 'row',
    paddingLeft: 12,
  },
  sectionDescription: {
    fontSize: 20,
    fontWeight: '400',
    color: '#666',
    marginHorizontal: 8,
    marginTop: 12,
  },
  textBox: {
    width: width_proportion,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#DDD',
    color: '#fff',
    marginHorizontal: 8,
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
  largeIcon: {
    marginVertical: 8,
    width: 30,
    height:30,
  },
  menuVertical: {
    width: 30,
    height:30,    
    marginTop: 4,
    marginBottom: -4,
    marginLeft: 12,
  },
});