import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {setTimerIsOver} from '../redux/reducer';
import imageBgAll from '../imageGames/newDesign/imageBgAll.png';
import iconCLock from '../imageGames/newDesign/timeOver.png';

const ModalTimeOver = props => {
  const handleRetry = () => {
    props.navigation.push('PreStart_Game');
  };
  const handleExit = () => {
    props.navigation.push('Find Differences');
  };

  return (
    <ImageBackground source={imageBgAll} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>TIME IS OVER</Text>
        <Image source={iconCLock} style={styles.iconCLock} />
        <TouchableOpacity
          onPress={handleRetry.bind(this)}
          style={styles.onPressContainer}>
          <Text style={styles.textRetry}>RETRY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleExit.bind(this)}
          style={styles.onPressContainer}>
          <Text style={styles.textExit}>QUIT GAME</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const mstp = state => ({
  state: state,
});

const mdtp = {
  setTimerIsOver: setTimerIsOver,
};
export default connect(
  mstp,
  mdtp,
)(ModalTimeOver);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  iconCLock: {
    width: 150,
    height: 250,
    marginVertical: 10,
  },
  textTitle: {
    color: 'red',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 30,
  },
  textRetry: {
    color: 'green',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 25,
  },
  textExit: {
    color: 'yellow',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 25,
  },
  onPressContainer: {
    marginVertical: 10,
  },
});
