import React from 'react';

import {
  BackHandler,
  StatusBar,
  View,
  NativeModules,
  StyleSheet,
} from 'react-native';
import GameScreen from './GameScreenComponent';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
const PreStart_Game = ({navigation}) => {
  const handleBackButton = () => {
    return true;
  };
  React.useEffect(() => {
    NativeModules.NavigationBarColor.hideNavigationBar();
    navigation.setOptions({
      headerLeft: () => '',
      headerShown: false,
    });

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <GameScreen nav={navigation} />
    </View>
  );
};

export default PreStart_Game;
