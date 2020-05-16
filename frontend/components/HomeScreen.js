import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  ListItem,
  ActivityIndicator,
} from 'react-native';

// import { ListItem } from 'react-native-elements'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import { Dropdown } from 'react-native-material-dropdown';

const width_proportion = '90%';
const width_proportion_listbox_header = '100%';

export default function HomeScreen({ route, navigation }) {


  const [isLoading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    getBuildingList();
  }, []);

  async function getBuildingList() {
    try {
      let response = await fetch(
        'https://0reukr1831.execute-api.us-east-1.amazonaws.com/dev/buildings', {
        method: 'GET'
      });
      let json = await response.json();
      setBuildings(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One: Pick Building</Text>
            </View>

            <View style={styles.listBox}>
              <View style={styles.listBoxHeader}>
              <Text style={styles.listBoxHeaderText}>
                {
                  (selectedBuilding == '' ? '-' : selectedBuilding)
                }
              </Text>
              </View>
              {
                buildings.map((building, index) => (
                  <Text
                    key={index}
                    // title={list.buildingName}
                    style={styles.listBoxItem}
                    onPress={() => {
                      setSelectedBuilding(building.buildingId);
                      setRooms(buildings[index].rooms);
                    }}>
                    {building.buildingName}
                  </Text>
                ))
              }
            </View>


            <View styles={styles.sectionContainer}>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step Two: Pick Room (optional)</Text>
            </View>
            <View style={styles.listBox}>
              <View style={styles.listBoxHeader}>
              <Text style={styles.listBoxHeaderText}>
                {
                  (selectedRoom == '' ? '-' : selectedRoom)
                }
              </Text>
              </View>
              {
                rooms.map((room, id) => (
                  <Text
                    key={id}
                    // title={list.buildingName}
                    style={styles.listBoxItem}
                    onPress={() => {
                      setSelectedRoom(room.roomId);
                    }}>
                    {room.roomName}
                  </Text>
                ))
              }
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step Three</Text>
              <Button
                title="Scan QR"
                onPress={() => navigation.navigate('Directions')}
              />
              <Button
                title="Use Location"
                onPress={() => navigation.navigate('Directions', { screen: 'Map View' })}
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
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
    backgroundColor: Colors.white,
  },
  body: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  listBox: {
    width: width_proportion,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#EEE',
    color: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  listBoxHeaderText: {
    width: width_proportion_listbox_header,
    fontSize: 18,
    marginHorizontal: 8,
    marginVertical: 6,
    fontWeight: '400',
    color: '#007AFF',
  },
  listBoxHeader: {
    width: width_proportion_listbox_header,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#DDD',
  },
  listBoxItem: {
    width: width_proportion_listbox_header,
    marginHorizontal: 8,
    marginVertical: 6,
    color: '#000',
    textAlign: 'left',
    fontSize: 18, 
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 8,
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
