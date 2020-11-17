import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import gameDate from './../imageGames/GameData';
import {connect} from 'react-redux';
import {setGameLVL, setTimerIsOver, setLevelHard} from '../redux/reducer';
import {AdMobBanner, AdMobRewarded, PublisherBanner} from 'react-native-admob';
import ModalScreenMenuStart from './ModalScreenMenuStart';

const imageBG = require('../imageGames/start.jpg');
const menuImage = require('../imageGames/icon/orange-menu.png');

const initState = {
  openModal: false,
  openMenu: false,
  levelHard: '5',
};

class StartScreen extends Component {
  state = {
    gameAllLvl: [...gameDate],
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
    this.props.navigation.navigate('CategoryGames');
  }
  pressReward() {
    AdMobRewarded.setAdUnitID('ca-app-pub-5202163251039749/8063464955');
    AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
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
      <ImageBackground source={imageBG} style={styles.image}>
        <View style={styles.main}>
          <View style={styles.borderContainer}>
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
                  source={menuImage}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.btnStartContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.push('CaterogyGames');
                }}
                style={styles.btnStart}>
                <Text style={styles.btnStartText}>Start</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
            onPress={() => {
              this.pressReward();
            }}
            style={styles.btnStart}>
            <Text>Rewart</Text>
          </TouchableOpacity> */}
              {/* <PublisherBanner
            adSize="smartBannerPortrait"
            adUnitID="ca-app-pub-5202163251039749/5906692014"
            testDevices={[PublisherBanner.simulatorId]}
            // onAdFailedToLoad={error => console.error(error)}
            onAppEvent={event => console.log(event.name, event.info)}
          /> */}
              {/* <View style={{width: '100%'}}> */}
              {/* <AdMobBanner
     adSize="largeBanner"
     adUnitID="ca-app-pub-5202163251039749/5906692014"
     testDevices={[AdMobBanner.simulatorId]}
 /> */}
              {/* </View> */}
            </View>
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
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  menuContainer: {
    position: 'absolute',
    left: '5%',
    top: '5%',
    transform: [{rotate: '90deg'}],
  },
  borderContainer: {
    position: 'absolute',
    top: 25,
    left: 25,
    bottom: 25,
    right: 25,
    opacity: 1,
    borderWidth: 10,
    borderColor: '#03fcec',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
});
