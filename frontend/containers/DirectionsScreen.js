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

  import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
  import MapScreen from "./MapScreen";
  import StepsScreen from "./StepsScreen";
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

  const Tab = createMaterialTopTabNavigator();

  export default function DirectionsScreen({ route, navigation }) {
      return(
        <>
           <Tab.Navigator>
            <Tab.Screen name="Steps & More" component={StepsScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
          </Tab.Navigator>
        </>
      );
  }