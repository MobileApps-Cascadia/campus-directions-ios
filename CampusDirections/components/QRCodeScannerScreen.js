import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Linking, Button, SafeAreaView } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from 'react-native-camera';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';

import { callAPI } from '../libs/directionsAPILib';
import config from '../config';

class QRCodeScannerScreen extends Component {

	state = {
		qr: "",
		position: {},
	}

	onRead = e => {
		console.log(e.data);
		this.setState({qr: e.data});
		this.getQRCoords(e.data);

		// const mDirections =  this.getDirections([this.state.position.lng, this.state.position.lat],[this.state.destination.lng,this.state.destination.lat]);
		// console.log(e.data);
	}
	
	getQRCoords = async (url) => {
		try {
			let response = await fetch(
				url, {
				method: 'GET'
			});
			let json = await response.json();
			console.log(json);
			this.setState({
				position: json
			});
			return json;
		} catch (error) {
			console.error(error);
		}
	};

	// getDirections = async () => {
  //   try {
  //     console.log('Fetching steps...');
  //     const directions = await callAPI([this.state.position.coords.longitude, this.state.position.coords.latitude],[this.state.destination.lng, this.state.destination.lat]);
  //     // console.log(directions.routes[0]);
  //     setDirections(directions.routes[0]);

  //     // return directions.routes[0];

  //   } catch (error) {
  //     console.log(error.message);
  //   }
	// };

	render() {
		return (
			<>
				<SafeAreaView>
					<View style={styles.container}>
						<QRCodeScanner
							onRead={this.onRead}
							showMarker={true}
							checkAndroid6Permissions={true}
							flashMode={RNCamera.Constants.FlashMode.auto}

							bottomContent={
								<TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
								</TouchableOpacity>
							}
							// cameraStyle={{ height: Dimensions.get("window").height }}
						/>
					</View>
				</SafeAreaView>
			</>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	},
	centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
		color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
		padding: 16,
		marginTop: 20,
  },
});

export default QRCodeScannerScreen;