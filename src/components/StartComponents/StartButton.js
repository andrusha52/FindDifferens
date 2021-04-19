import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

import start from '../../imageGames/newDesign/StartScreen/start.gif';

const StartButton = () => {
  return (
    <Image source={start} style={styles.startButton} resizeMode="contain" />
  );
};

export default StartButton;

const styles = StyleSheet.create({
  startButton: {
    width: Dimensions.get('screen').width * 0.6,
    height: Dimensions.get('screen').height * 0.15,
  },
});
