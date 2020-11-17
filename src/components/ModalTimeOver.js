import React, {Component} from 'react';
import {View, Button, ImageBackground, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {setTimerIsOver} from '../redux/reducer';
const imageBG = require('../imageGames/bg-image.jpg');

class ModalTimeOver extends Component {
  state = {};

  render() {
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
                this.props.setTimerIsOver(!this.props.state.timerIsOVer);
              }}
              title="начать заново"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <View style={{height: 10}} />
            <Button
              onPress={() => {
                this.props.nav.push('Find Differences');
                setTimeout(
                  this.props.setTimerIsOver(!this.props.state.timerIsOVer),
                  1000,
                );
              }}
              title="Выйти"
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
)(ModalTimeOver);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
