import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Linking, Button, SafeAreaView } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from 'react-native-camera';
import { useRoute, useNavigation } from '@react-navigation/native';

import { callAPI } from '../libs/directionsAPILib';

class QRCodeScannerScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qrURI: undefined,
			position: {},
			destination: props.route.params.destination,
			directions: props.route.params.directions,
		};
		console.log('loaded qr screen');
	}


	onRead = async (e) => {
		console.log(e.data);

		this.setState({
			qrURI: e.data,
		});

		var mQR = await this.getQRCoords(e.data);
		console.log(mQR);

		console.log('fetching directions from qr');
		if (mQR) {
			const mDirections = await this.getDirections([this.state.position.lng, this.state.position.lat], [this.state.destination.lng, this.state.destination.lat]);
			if (mDirections) {
				this.props.navigation.navigate('Directions', { destination: this.state.destination, directions: mDirections, position: this.state.position });
			}
		}
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
				position: json,
			});
			return json;
		} catch (error) {
			console.error(error);
		}
	};

	getDirections = async () => {
		try {
			console.log('Fetching steps...');
			const directions = await callAPI([this.state.position.lng, this.state.position.lat], [this.state.destination.lng, this.state.destination.lat]);
			console.log(directions.routes[0]);
			this.setState({
				directions: directions.routes[0],
			});
			return directions.routes[0];
		} catch (error) {
			console.log(error.message);
		}
	};

	render() {
		const { navigation } = this.props;
		const { route } = this.props;

		return (
			<>
				<SafeAreaView>
					<View style={styles.container}>
						<QRCodeScanner
							onRead={this.onRead}
							showMarker={true}
							checkAndroid6Permissions={true}
							flashMode={RNCamera.Constants.FlashMode.auto}

							cameraStyle={{ height: Dimensions.get("window").height }}
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


export default function showQRCodeScannerScreen({ props }) {
	const navigation = useNavigation();
	const route = useRoute();
	return <QRCodeScannerScreen {...props} route={route} navigation={navigation} />
}