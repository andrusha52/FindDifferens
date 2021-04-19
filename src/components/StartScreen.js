import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {setGameLVL, setTimerIsOver, setLevelHard} from '../redux/reducer';
import ModalScreenMenuStart from './ModalScreenMenuStart';
import imageBgAll from '../imageGames/newDesign/imageBgAll.png';
import iconMenu from '../imageGames/newDesign/StartScreen/iconMenu.png';
import logo from '../imageGames/newDesign/StartScreen/Logo.png';
import sherlok from '../imageGames/newDesign/sherlok.png';
import StartButton from './StartComponents/StartButton';
import BgWrapper from './BgWrapper';

const initState = {
  openModal: false,
  openMenu: false,
  levelHard: '5',
};

class StartScreen extends Component {
  state = {
    ...initState,
  };
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => '',
      headerShown: false,
    });
    this.setLevelSelector();
  }
  pressStart() {
    this.props.navigation.push('CaterogyGames');
  }
  openMenuModal() {
    this.setState({openMenu: true});
  }
  exitToStart() {
    this.setState({openMenu: false});
  }
  setSelectedValue(itemValue) {
    this.setState({levelHard: itemValue});
    this.props.setLevelHard(itemValue);
  }
  setLevelSelector() {
    this.setState({levelHard: this.props.state.levelHard});
  }

  render() {
    const {levelHard} = this.state;
    return (
      <BgWrapper>
        <View style={styles.main}>
          <ModalScreenMenuStart
            openMenu={this.state.openMenu}
            openMenuModal={this.openMenuModal.bind(this)}
            exitToStart={this.exitToStart.bind(this)}
            nav={this.props.navigation}
            levelHard={levelHard}
            setSelectedValue={this.setSelectedValue.bind(this)}
          />
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => this.openMenuModal()}>
              <Image
                source={iconMenu}
                style={styles.iconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={logo}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Image
              source={sherlok}
              style={styles.lupaImage}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={this.pressStart.bind(this)}>
              <StartButton />
            </TouchableOpacity>
          </View>
        </View>
      </BgWrapper>
    );
  }
}
const mstp = state => ({
  state: state,
});
const mdtp = {
  setGameLVL: setGameLVL,
  setTimerIsOver: setTimerIsOver,
  setLevelHard: setLevelHard,
};

export default connect(
  mstp,
  mdtp,
)(StartScreen);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  btnStartContainer: {
    width: 100,
    height: 50,
    position: 'absolute',
    top: '10%',
    right: '30%',
  },
  btnStart: {
    backgroundColor: 'orange',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  btnStartText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#8a5a88',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  image2: {
    padding: 20,
  },
  menuContainer: {
    position: 'absolute',
    left: '5%',
    top: '5%',
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    marginTop: 50,
    width: 220,
    height: 120,
    marginBottom: 20,
  },
  lupaImage: {
    width: 400,
    height: 350,
  },
});
