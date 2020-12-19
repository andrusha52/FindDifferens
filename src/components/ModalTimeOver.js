import React, {Component} from 'react';
import {
  View,
  Button,
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

class ModalTimeOver extends Component {
  state = {};

  handleRetry() {
    this.props.setTimerIsOver(!this.props.state.timerIsOVer);
  }
  handleExit() {
    this.props.nav.push('Find Differences');
    setTimeout(this.props.setTimerIsOver(!this.props.state.timerIsOVer), 1000);
  }
  render() {
    return (
      <ImageBackground source={imageBgAll} style={styles.image}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.textTitle}>TIME IS OVER</Text>
          <Image source={iconCLock} style={styles.iconCLock} />
          <TouchableOpacity
            onPress={this.handleRetry.bind(this)}
            style={styles.onPressContainer}>
            <Text style={styles.textRetry}>RETRY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleExit.bind(this)}
            style={styles.onPressContainer}>
            <Text style={styles.textExit}>QUIT GAME</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

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
