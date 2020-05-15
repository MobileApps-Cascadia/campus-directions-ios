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

  import Colors from "./Colors";

  import MapScreen from "./MapScreen";
  import StepsScreen from "./StepsScreen";
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

  const Tab = createMaterialTopTabNavigator();

  export default function DirectionsScreen({ route, navigation }) {
      return(
        <>
          <SafeAreaView> 
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>START POINT</Text>
                  
                  <Text style={styles.sectionTitle}>END POINT</Text>
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