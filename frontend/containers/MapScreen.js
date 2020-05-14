import React from 'react';
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
import { exp } from 'react-native-reanimated';



const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default function MapScreen({routes, navigation }) {

    return(
        <>
            <Text styles={styles.highlight}>The map will be here</Text>
        </>
    );
}