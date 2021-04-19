import React, {useCallback, useEffect} from 'react';
import {
  View,
  BackHandler,
  Image,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';

import imageBgAll from '../imageGames/newDesign/imageBgAll.png';
import iconDone from '../imageGames/newDesign/done.png';

const ModalScreen = props => {
  const handleBackButton = () => {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  };
  const handleNextLvl = useCallback(() => {
    const timeOut = setTimeout(() => {
      props.navigation.push('PreStart_Game');
      clearTimeout(timeOut);
    }, 5000);
  }, [props.navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    handleNextLvl();
  }, [handleNextLvl]);

  return (
    <ImageBackground source={imageBgAll} style={styles.image}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={iconDone} style={styles.done} resizeMode="contain" />
        <Text style={styles.text}>level complete</Text>
      </View>
    </ImageBackground>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  done: {
    width: 200,
    height: 100,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    color: 'orange',
    fontFamily: 'LuckiestGuy-Regular',
  },
});
