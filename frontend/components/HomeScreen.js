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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import config from '../config';

const width_proportion = '90%';
const width_proportion_listbox_header = '101%';

export default function HomeScreen({ route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    getBuildingList();
  }, [buildings]);

  async function getBuildingList() {
    try {
      let response = await fetch(
        config.apiGateway.GET_BUILDINGS_LIST, {
        method: 'GET'
      });
      let json = await response.json();
      setBuildings(json.sort((a, b) => (a.buildingName > b.buildingName) ? 1 : -1));
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <SafeAreaView> */}
        <ScrollView contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {/* {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )} */}
          <View style={styles.body}>

            {/* Step 1 - Choose the Building */}
            <View style={styles.horizontalStackLeftAlign}>
              <View style={[styles.numberCircle, styles.dropShadow]}><Text style={styles.numberCircleText}>1</Text></View>
              <Text style={[styles.sectionTitle, styles.dropShadow]}>  Select the Building</Text>
            </View>

            <View style={styles.centerContent}>
              <View style={[styles.listBoxBuilding, styles.dropShadow]}>
                <View style={styles.listBoxHeader}>
                  <Text style={styles.listBoxHeaderText}>
                    {
                      (selectedBuilding == '' ? '-' : selectedBuilding)
                    }
                  </Text>
                </View>
                <ScrollView>
                  {
                    buildings.map((building, index) => (
                      <Text
                        key={index}
                        // title={list.buildingName}
                        style={styles.listBoxItem}
                        onPress={() => {
                          setSelectedBuilding(building.buildingName);
                          setRooms(buildings[index].rooms);
                        }}>
                        {building.buildingName}
                        <Text style={(selectedBuilding == building.buildingName ? styles.checkMarkShow : styles.checkMarkHide)}>  &#10003;</Text>
                      </Text>
                    ))
                  }
                </ScrollView>
              </View>
            </View>

            <View style={styles.horizontalStack}></View>

            {/* Step 2 - Choose the Room number */}
            <View style={styles.horizontalStackLeftAlign}>
              <View style={[styles.numberCircle, styles.dropShadow]}><Text style={styles.numberCircleText}>2</Text></View>
              <Text style={[styles.sectionTitle, styles.dropShadow]}>  Select a room number (optional)</Text>
            </View>
            <View style={styles.centerContent}>
              <View style={[styles.listBoxRoom, styles.dropShadow]}>
                <View style={styles.listBoxHeader}>
                  <Text style={styles.listBoxHeaderText}>
                    {
                      (selectedRoom == '' ? '-' : selectedRoom)
                    }
                  </Text>
                </View>
                {
                  rooms.map((room, index) => (
                    <Text
                      key={index}
                      // title={list.buildingName}
                      style={styles.listBoxItem}
                      onPress={() => {
                        setSelectedRoom(room.roomName);
                      }}>

                      {room.roomName}
                      <Text style={(selectedRoom == room.roomName ? styles.checkMarkShow : styles.checkMarkHide)}>  &#10003;</Text>
                    </Text>
                  ))
                }
              </View>
            </View>
            <View style={styles.horizontalStack}></View>
            {/* Step 3 - Choose the location gathering method */}
            <View style={[styles.horizontalStack, styles.centerContent]}>
              <View style={[styles.numberCircle, styles.dropShadow]}><Text style={styles.numberCircleText}>3</Text></View>
              <Button
                title="Scan QR"
                onPress={() => navigation.navigate('Directions')}
              />
              <Text> OR </Text>
              <Button
                title="Use Location"
                onPress={() => navigation.navigate('Directions', { screen: 'Map View' })}
              />
            </View>

            {/* Footer */}
            <View style={[styles.horizontalStack, styles.centerContent]}>
              <Text style={styles.sectionDescription}>About | FAQ | Contact</Text>
            </View>
          </View>
        </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  checkMarkHide: {
    opacity: 0.00,
    color: '#007AFF',

  },
  checkMarkShow: {
    opacity: 1.00,
    color: '#007AFF',

  },
  dropShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.00,

    elevation: 1,
  },
  numberCircleText: {
    backgroundColor: '#FF7C1C', 
    marginTop: -6, 
    fontSize: 24, 
    color: '#fff', 
    fontWeight: '800', 
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  numberCircle: {
    borderRadius: 25,
    width: 36,
    height: 36,
    padding: 8,

    backgroundColor: '#FF7C1C',
    borderWidth: 2,
    borderColor: '#FF7C1C',
    textAlign: 'center',
    fontSize: 32,
  },
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
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  centerContent: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalStack: {
    marginTop: 32,
    flexDirection: 'row', 
  },
  horizontalStackLeftAlign: {
    flexDirection: 'row', 
    paddingHorizontal: 24,
    marginTop: 32,
  },
  listBoxBuilding: {
    width: width_proportion,
    height: 200,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#EEE',
    color: '#fff',

  },
  listBoxRoom: {
    width: width_proportion,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#EEE',
    color: '#fff',
  },
  listBoxHeaderText: {
    width: width_proportion_listbox_header,
    fontSize: 18,
    marginHorizontal: 8,
    marginVertical: 10,
    fontWeight: '400',
    color: '#007AFF',
  },
  listBoxHeader: {
    width: width_proportion_listbox_header,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: -1,
    marginBottom: -1,
    marginTop: -1,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#DDD',
  },
  listBoxItem: {
    width: width_proportion_listbox_header,
    marginHorizontal: 8,
    marginVertical: 10,
    color: '#000',
    textAlign: 'left',
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 18,
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
