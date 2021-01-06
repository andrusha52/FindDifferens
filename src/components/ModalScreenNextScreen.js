import React, {Component} from 'react';
import {
  View,
  Button,
  BackHandler,
  Image,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {setTimerIsOver} from '../redux/reducer';
import imageBgAll from '../imageGames/newDesign/imageBgAll.png';
import iconNextLvl from '../imageGames/newDesign/nextLvl.png';
import iconArrowDone from '../imageGames/newDesign/arrowDone.png';
import iconDone from '../imageGames/newDesign/done.png';

class ModalScreen extends Component {
  state = {};
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => '',
      title: '',
      headerShown: false,
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }
  handleNextLvl() {
    this.props.navigation.push('PreStart_Game');
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
          <TouchableOpacity onPress={this.handleNextLvl.bind(this)}>
            <Image source={iconDone} style={styles.done} resizeMode="contain" />
            <Image
              source={iconNextLvl}
              style={styles.done}
              resizeMode="contain"
            />
            <Image
              source={iconArrowDone}
              style={styles.done}
              resizeMode="contain"
            />
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
)(ModalScreen);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  done: {
    width: 200,
    height: 100,
  },
});
