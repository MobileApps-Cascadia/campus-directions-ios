import React from 'react';
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

export default function StepsScreen({ route, navigation }) {

  return (
    <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.body}>            
            <Text>This is the Steps</Text>
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
    marginTop: 75,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.lighter,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.lighter,
  },
  highlight: {
    fontWeight: '700',
  },
});