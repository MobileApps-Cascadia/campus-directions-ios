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
  Linking,
  Platform,
  ToastAndroid,
  PermissionsAndroid,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Colors from '../styles/Colors';
import Header from './Header';

import config from '../config';
import uStyles from '../styles/index';
import { callAPI } from '../libs/directionsAPILib';

const width_proportion = '90%';
const width_proportion_listbox_header = '101%';


export default function HomeScreen({route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);

  const [position, setPosition] = useState([]);
  const [destination, setDestination] = useState([]);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    getBuildingList();

  }, [directions, position, destination]);

  async function getBuildingList() {
    try {
      let response = await fetch(
        config.apiGateway.GET_BUILDINGS_LIST, {
        method: 'GET'
      });
      let json = await response.json();
      setBuildings(json.sort((a, b) => (a.buildingName > b.buildingName) ? 1 : -1));
      setLoading(false);
      return json;
    } catch (error) {
      console.error(error);
    }
  };


  async function getPosition() {
    const hasLocationPermission = await this.hasLocationPermission();
    console.log("hasLocationPermission = " + hasLocationPermission);

    setLoading(true);

    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          // console.log(position);
          setPosition(position);
          getDirections();

        },
        (error) => {
          setLoading(false);
          console.log(error);
          createAlert(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
      );
    }
    setLoading(false);
  };


  const createAlert = (message) => {
    Alert.alert(
      "Alert!",
      message,
      [
        {
          text: "Close",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  };

  getDirections = async () => {
    try {
      console.log('Fetching steps...');
      const directions = await callAPI([position.coords.longitude, position.coords.latitude],[destination.lng, destination.lat]);
      // console.log(directions.routes[0]);
      setDirections(directions.routes[0]);

      // return directions.routes[0];

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <SafeAreaView> */}
      <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Header />
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}

        <View style={styles.body}>
          {/* Step 1 - Choose the Building */}
          <View style={uStyles.horizontalStackLeftAlign}>

            <View style={[styles.numberCircle, uStyles.dropShadow]}><Text style={styles.numberCircleText}>1</Text></View>
            <Text style={[styles.sectionTitle, uStyles.dropShadow]}>  Select a building</Text>
          </View>

          <View style={uStyles.centerContent}>
            <View style={[uStyles.listBoxFixed200, uStyles.dropShadow]}>
              <View style={styles.listBoxHeader}>
                <Text style={styles.listBoxHeaderText}>
                  {
                    (selectedBuilding == '' ? '-' : selectedBuilding.buildingName)
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
                        setSelectedBuilding(building);
                        setRooms(buildings[index].rooms);
                        setDestination(building);
                        getPosition();
                      }}>
                      {building.buildingName}
                      <Text style={(selectedBuilding.buildingName == building.buildingName ?
                        styles.checkMarkShow :
                        styles.checkMarkHide)}
                      >  &#10003;</Text>
                    </Text>
                  ))
                }
              </ScrollView>
            </View>
          </View>

          <View style={uStyles.horizontalStack}></View>

          {/* Step 2 - Choose the Room number */}
          <View style={uStyles.horizontalStackLeftAlign}>
            <View style={[styles.numberCircle, uStyles.dropShadow]}><Text style={styles.numberCircleText}>2</Text></View>
            <Text style={[styles.sectionTitle, uStyles.dropShadow]}>  Select a room (optional)</Text>
          </View>
          <View style={uStyles.centerContent}>
            <View style={[uStyles.listBoxFixed400, uStyles.dropShadow]}>
              <View style={styles.listBoxHeader}>
                <Text style={styles.listBoxHeaderText}>
                  {
                    (selectedRoom == '' ? '-' : selectedRoom.roomName)
                  }
                </Text>
              </View>
              <ScrollView>
                {
                  rooms.map((room, index) => (
                    <Text
                      key={index}
                      style={styles.listBoxItem}
                      onPress={() => {
                        setSelectedRoom(room);
                      }}>

                      {room.roomName}
                      <Text style={(selectedRoom.roomName == room.roomName ? styles.checkMarkShow : styles.checkMarkHide)}>  &#10003;</Text>
                    </Text>
                  ))
                }
              </ScrollView>
            </View>
          </View>

          <View style={uStyles.horizontalStack}></View>

          {/* Step 3 - Choose the location gathering method */}
          <View style={[uStyles.horizontalStack, uStyles.centerContent]}>
            <View style={[styles.numberCircle, uStyles.dropShadow]}><Text style={styles.numberCircleText}>3</Text></View>
            <Button
              title="Scan QR"
              onPress={() => (selectedBuilding == '' ? createAlert("You must choose a building before proceeding.") : navigation.navigate('QR Scanner', {position: position, destination: destination, directions: directions}))}
            />
            <Text> OR </Text>
            <Button
              disabled={isLoading}
              title="Use My Location"
              onPress={() => (selectedBuilding == '' ? createAlert("You must choose a building before proceeding.") : navigation.navigate('Directions', {position: position, destination: destination, directions: directions}))}
            />
          </View>

          <View style={[uStyles.horizontalStack, uStyles.centerContent]}>
            <Button 
              title={"Reset Form"}
             />
          </View>

          {/* Footer */}
          <View style={[uStyles.horizontalStack, uStyles.centerContent]}>
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
  numberCircleText: {
    backgroundColor: '#FF7C1C',
    marginTop: -6,
    marginBottom: -1,
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
