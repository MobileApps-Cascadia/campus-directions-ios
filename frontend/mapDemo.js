import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1IjoiamNoYXllcyIsImEiOiJjankwb3RwZXgwMmk4M250aGJzeGc1enI1In0.rpRAtqBp-FTmiDRGqtyzug");

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 600,
    width: 375,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1 
  }
});

export default class MapBox extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(true);
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} />
        </View>
      </View>
    );
  }
}