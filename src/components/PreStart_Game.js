import React, {Component} from 'react';

import {
  BackHandler,
  ToastAndroid,
  StatusBar,
  Dimensions,
  View,
} from 'react-native';
import ModalTimeOver from './ModalTimeOver';
import GameScreen from './GameScreenComponent';
import {connect} from 'react-redux';
import {NativeModules} from 'react-native';

class PreStart_Game extends Component {
  state = {timeOver: false};
  componentDidMount() {
    NativeModules.NavigationBarColor.hideNavigationBar();
    this.props.navigation.setOptions({
      headerLeft: () => '',
      headerShown: false,
    });

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    ToastAndroid.show(
      'Для того что бы выйти , откройте МЕНЮ',
      ToastAndroid.SHORT,
    );

    return true;
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <StatusBar hidden={true} />
        {!this.props.state.timerIsOVer ? (
          <GameScreen nav={this.props.navigation} />
        ) : (
          <ModalTimeOver nav={this.props.navigation} />
        )}
      </View>
    );
  }
}
const mstp = state => ({
  state: state,
});

export default connect(
  mstp,
  null,
)(PreStart_Game);
