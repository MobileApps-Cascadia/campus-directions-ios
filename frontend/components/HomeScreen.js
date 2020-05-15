import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DirectionsScreen from "./DirectionsScreen";


export default function HomeScreen({ route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getBuildingList());
  }, []);

  async function getBuildingList() {
    try {
      console.log("Fetching Building List...")
      let response = await fetch('https://0reukr1831.execute-api.us-east-1.amazonaws.com/dev/buildings');
      let json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Choose the Building
                </Text>
 
            </View>
            <View styles={styles.sectionContainer}>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step Two</Text>
              <Text style={styles.sectionDescription}>
                Choose the Room (optional)
                </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step Three</Text>
              <Button
                title="Scan QR"
                onPress={() => navigation.navigate('Directions')}
              />
              <Button
                title="Use Location"
                onPress={() => navigation.navigate('Directions', { screen: 'Map View'})}
              />              
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
    marginTop: 32,
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
