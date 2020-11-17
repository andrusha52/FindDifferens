import React, {Component} from 'react';
import {
  View,
  Button,
  BackHandler,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {setTimerIsOver} from '../redux/reducer';
const imageBG = require('../imageGames/bg-image.jpg');

class ModalScreen extends Component {
  state = {};
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => '',
      title: '',
      headerShown: false,
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    // if (this.props.state.timerIsOVer) {
    //   this.props.setTimerIsOver(!this.props.state.timerIsOVer);
    // }
  }

  handleBackButton() {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }
  setTimer() {}
  render() {
    // console.log('NEXT LVL', this.props.state.timerIsOVer);
    // if (this.props.state.timerIsOVer) {
    //   this.props.setTimerIsOver(!this.props.state.timerIsOVer);
    // }
    return (
      <ImageBackground source={imageBG} style={styles.image}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{width: 100, height: 50}}>
            <Button
              onPress={() => {
                this.setTimer();
                this.props.navigation.push('PreStart_Game');
              }}
              title="Next lvl"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
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
)(ModalScreen);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
