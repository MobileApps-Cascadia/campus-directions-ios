import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  Platform,
  StatusBar,
} from 'react-native';
import Colors from "../styles/Colors";

export default function MapScreen({route, navigation }) {

  useEffect(() => {
    console.log('switch to steps tab');
  },[]);

  return (
    <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.body}>
            <Text>This is the Map</Text>
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
  highlight: {
    fontWeight: '700',
  },
});