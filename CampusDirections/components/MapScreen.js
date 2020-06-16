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
  Image,
} from 'react-native';
import Colors from "../styles/Colors";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Mapbox from "@react-native-mapbox-gl/maps";

import config from "../config";

MapboxGL.setAccessToken(config.mapBox.ACCESS_TOKEN);

const layerStyles = {
  building: {
    fillExtrusionColor: '#aaa',

    fillExtrusionHeight: [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height'],
    ],

    fillExtrusionBase: [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height'],
    ],

    fillExtrusionOpacity: 0.6,
  },
};

export default function MapScreen({ route, navigation }) {

  const [destination, setDestination] = useState(route.params.destination);
  const [position, setPosition] = useState(route.params.position);
  const [directions, setDirections] = useState(route.params.directions);

  const [geometry, setGeometry] = useState(undefined);

  useEffect(() => {
    console.log('loading map view');
    MapboxGL.setTelemetryEnabled(false);
    setGeometry(directions.geometry);

  }, []);

  renderAnnotations = () => {
    annotationRef = null;

    return (
      <>
      <MapboxGL.PointAnnotation
        id={'1'}
        coordinate={[destination.lng, destination.lat]}
        title={destination.buildingName}
        ref={(ref) => (annotationRef = ref)}>
        <View style={styles.annotationContainer}>
          <Image
            source={require('../assets/marker-50.png')}
            style={{width: 30, height: 30}}
          />
          
        </View>
        <MapboxGL.Callout title={destination.buildingName} />
      </MapboxGL.PointAnnotation>

      <MapboxGL.PointAnnotation
        id={'2'}
        coordinate={[position.lng, position.lat]}
        title={destination.buildingName}
        ref={(ref) => (annotationRef = ref)}>
        <View style={styles.annotationContainer}>
          <Image
            source={require('../assets/walking.png')}
            style={{ width: 30, height: 30 }}
          />

        </View>
        <MapboxGL.Callout title={destination.buildingName} />
      </MapboxGL.PointAnnotation>
      </>
    )
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <MapboxGL.MapView
            zoomLevel={12}
            centerCoordinate={[-122.191567, 47.760413]}
            style={styles.map}>

            <MapboxGL.Camera 
              followZoomLevel={12}
              animationMode={'flyTo'}
              centerCoordinate={[destination.lng, destination.lat]} />

            <MapboxGL.ShapeSource id='line1' shape={geometry}>
              <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'blue', lineWidth: 5 }} />
            </MapboxGL.ShapeSource>

            <MapboxGL.VectorSource>
            <MapboxGL.FillExtrusionLayer
              id="building3d"
              sourceLayerID="building"
              style={layerStyles.building}
            />
          </MapboxGL.VectorSource>
          {renderAnnotations()}

          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 600,
    width: 375,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1 
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
});