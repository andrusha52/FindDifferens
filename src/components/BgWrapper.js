import React from 'react';
import {ImageBackground, Image, StyleSheet, View} from 'react-native';
import imageBgAll from '../imageGames/newDesign/imageBgAll.png';
import topLeft from '../imageGames/newDesign/background/topLeft.png';
import top from '../imageGames/newDesign/background/top.png';
import topRight from '../imageGames/newDesign/background/topRight.png';
import left from '../imageGames/newDesign/background/left.png';
import right from '../imageGames/newDesign/background/right.png';
import botLeft from '../imageGames/newDesign/background/botLeft.png';
import botRight from '../imageGames/newDesign/background/botRight.png';
import bot from '../imageGames/newDesign/background/bot.png';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0d1021',
  },

  topContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: 15,
    flexDirection: 'row',
  },
  topSmall: {
    width: 15,
    height: 15,
  },
  top: {
    flex: 1,
    height: 8.5,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    position: 'absolute',
    width: 6.6,
    height: '100%',
    marginTop: 15,
    left: 10,
    marginBottom: 15,
    zIndex: 2,
  },
  right: {
    position: 'absolute',
    width: 6.6,
    height: '100%',
    marginTop: 15,
    right: 10,
    marginBottom: 15,
    zIndex: 2,
  },
  botContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 15,
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  botSmall: {
    width: 12.25,
    height: 15,
  },
});

const BgWrapper = ({children}) => {
  return (
    <ImageBackground
      source={imageBgAll}
      style={styles.image}
      resizeMode="stretch">
      <View style={styles.topContainer}>
        <Image source={topLeft} style={styles.topSmall} resizeMode="stretch" />
        <Image source={top} style={styles.top} resizeMode="stretch" />
        <Image source={topRight} style={styles.topSmall} resizeMode="stretch" />
      </View>
      <View style={styles.centerContainer}>
        <Image source={left} style={styles.left} resizeMode="stretch" />
        {children}
        <Image source={right} style={styles.right} resizeMode="stretch" />
      </View>
      <View style={styles.botContainer}>
        <Image source={botLeft} style={styles.botSmall} resizeMode="stretch" />
        <Image source={bot} style={styles.top} resizeMode="stretch" />
        <Image source={botRight} style={styles.botSmall} resizeMode="stretch" />
      </View>
    </ImageBackground>
  );
};

export default BgWrapper;
