import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import difData from './../imageGames/GameDataCategory';
import CountDown from 'react-native-countdown-component';
import {connect} from 'react-redux';
import {setGameLVL, setTimerIsOver, setSelectLevel} from '../redux/reducer';
import ModalScreenWrongCLick from './ModalScreenWrongCLick';
import ModalScreenMenu from './ModalScreenMenu';
import {ImageScreen} from './ImageScreen';

const MAIN_COLOR = '#8a5a88'; // main screen bg
const COLOR_TRUE_POINT = 'green'; // color check point valid color
const COLOR_CIRCLE_TRUE = 'green'; // color cyrcle true click
const GAME_CIRCLE = 'transparent';
// const GAME_CIRCLE = 'red';
const image = require('../imageGames/bg-image.jpg');

const gamePointZone = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    colorPoint: {backgroundColor: MAIN_COLOR},
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    colorPoint: {backgroundColor: MAIN_COLOR},
  },
  {
    id: '58694a0f-3da1-471f-bd96-145574e29d72',
    colorPoint: {backgroundColor: MAIN_COLOR},
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455777e29d72',
    colorPoint: {backgroundColor: MAIN_COLOR},
  },
  {
    id: '58694a0f-3da1-471f-bd96-11245571e29d72',
    colorPoint: {backgroundColor: MAIN_COLOR},
  },
];

const initState = {
  color: '',
  wrongClickX: 0,
  wrongClickY: 0,
  clickWrong: false,
  pointGames: [...gamePointZone],
  pointGameNumb: 0,
  checkClick: [],
  errorArray: [],
  timeOver: false,
  openMenu: false,
  runTimer: true,
  hintCount: 10,
  level: 0,
  gameZone: {...difData[0]},
};

class GameScreen extends Component {
  state = {
    timer: parseFloat(this.props.state.levelHard) * 60,
    ...initState,
  };
  componentWillMount() {
    this.changeLvlGame();
  }
  componentDidMount() {
    if (this.state.timer > 50) {
      this.restartLVL();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.changeLvlGame();
    }
    if (prevState !== this.state) {
      return true;
    }
  }

  changeLvlGame() {
    this.setState({
      gameZone: {...difData[this.props.state.levelSelected]},
      timer: parseFloat(this.props.state.levelHard) * 60,
    });
  }

  pressScreen(e) {
    this.setState({
      wrongClickX: e.locationX,
      wrongClickY: e.locationY,
      clickWrong: true,
    });
    setTimeout(() => {
      this.setState({
        clickWrong: false,
      });
    }, 5000);
  }

  pressGood(e, ind) {
    const {checkClick} = this.state;
    if (!checkClick.includes(ind)) {
      const newDef = [...this.state.gameZone.def];
      newDef[ind].def11 = {
        ...newDef[ind].def11,
        borderColor: COLOR_CIRCLE_TRUE,
      };
      const newPoint = [...this.state.pointGames];
      newPoint[this.state.pointGameNumb] = {
        ...this.state.pointGames[this.state.pointGameNumb],
        colorPoint: {backgroundColor: COLOR_TRUE_POINT},
      };
      this.setState({
        gameZone: {...this.state.gameZone, def: [...newDef]},
        pointGameNumb: this.state.pointGameNumb + 1,
        pointGames: [...newPoint],
        checkClick: [...checkClick, ind],
      });
    } else {
      return;
    }
  }
  async openModalNextLVL() {
    this.props.nav.push('Modal Greate Game');
    await this.setState({
      checkClick: [],
      pointGames: [...gamePointZone],
    });
    const nextLvl = this.props.state.levelSelected + 1;
    this.props.setSelectLevel(nextLvl);
  }
  restartLVL() {
    let arrDef = this.state.gameZone.def;
    arrDef = arrDef.map(el => {
      el.def11 = {...el.def11, borderColor: GAME_CIRCLE};
      return el;
    });
    this.setState({
      timer: parseFloat(this.props.state.levelHard) * 60,
      gameZone: {...this.state.gameZone, def: [...arrDef]},
    });
  }
  openMenuModal() {
    this.setState({
      openMenu: !this.state.openMenu,
      runTimer: !this.state.runTimer,
    });
  }
  exitToStart() {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  }

  render() {
    const {
      wrongClickX,
      wrongClickY,
      clickWrong,
      gameZone,
      pointGames,
      checkClick,
      timer,
      openMenu,
      runTimer,
      hintCount,
    } = this.state;

    if (checkClick.length === 5) {
      setTimeout(this.openModalNextLVL.bind(this), 500);
    }
    console.log('pointGames', pointGames);
    console.log('gameZone', gameZone);
    console.log('hintCount', hintCount);
    return (
      <>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.mainScreen}>
            <View style={{paddingBottom: 10}} />
            <View style={{position: 'absolute', top: 10, left: '40%'}}>
              <ModalScreenWrongCLick clickWrong={clickWrong} />
              <ModalScreenMenu
                openMenu={openMenu}
                openMenuModal={this.openMenuModal.bind(this)}
                exitToStart={this.exitToStart.bind(this)}
                nav={this.props.nav}
              />
              <CountDown
                until={timer * 1}
                size={18}
                id={gameZone.imageGames.first}
                onFinish={() =>
                  this.props.setTimerIsOver(!this.props.state.timerIsOVer)
                }
                digitStyle={styles.countDown}
                digitTxtStyle={{color: MAIN_COLOR}}
                timeToShow={['M', 'S']}
                timeLabels={{m: '', s: ''}}
                running={runTimer}
                showSeparator={true}
                separatorStyle={{color: MAIN_COLOR}}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.openMenuModal()}
              style={styles.btnMenu}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../imageGames/icon/orange-menu.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openMenuModal()}
              style={styles.btnHint}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../imageGames/icon/lamp-orange.png')}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: -10,
                  right: -12,
                }}>
                <Text style={styles.countHint}>{hintCount}</Text>
              </View>
            </TouchableOpacity>

            <View style={{position: 'absolute', top: '10%'}}>
              <FlatList
                horizontal={true}
                data={pointGames}
                renderItem={({item}) => (
                  <View
                    style={{
                      ...styles.point,
                      ...item.colorPoint,
                    }}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
            <View>
              <ImageScreen
                images={gameZone.imageGames.first}
                pressScreen={this.pressScreen.bind(this)}
                gameZone={gameZone}
                clickWrong={clickWrong}
                wrongClickY={wrongClickY}
                wrongClickX={wrongClickX}
                pressGood={this.pressGood.bind(this)}
              />
              <View style={{height: 5}} />
              <ImageScreen
                images={gameZone.imageGames.second}
                pressScreen={this.pressScreen.bind(this)}
                gameZone={gameZone}
                clickWrong={clickWrong}
                wrongClickY={wrongClickY}
                wrongClickX={wrongClickX}
                pressGood={this.pressGood.bind(this)}
              />
            </View>
          </View>
        </ImageBackground>
      </>
    );
  }
}
const mapStateToProps = state => ({
  state: state,
});
const mapDispatchToProps = {
  setGameLVL: setGameLVL,
  setTimerIsOver: setTimerIsOver,
  setSelectLevel: setSelectLevel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreen);

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  images: {
    position: 'relative',
    zIndex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  wrongCLick: {
    position: 'absolute',
    width: 1,
    height: 1,
    flex: 0.3,
    zIndex: 1000,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: 'red',
  },
  defAll: {
    position: 'absolute',
    width: 40,
    height: 40,
    flex: 0.3,
    zIndex: 1000,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLOR_TRUE_POINT,
  },
  point: {
    width: 30,
    height: 5,
    borderRadius: 50,
    marginHorizontal: 3,
    backgroundColor: COLOR_TRUE_POINT,
    borderColor: 'black',
    borderWidth: 1,
  },
  btnMenu: {
    width: 40,
    height: 40,
    borderRadius: 50,
    position: 'absolute',
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    top: 10,
    right: 10,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnHint: {
    width: 40,
    height: 40,
    borderRadius: 50,
    position: 'absolute',
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    top: 10,
    left: 10,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countHint: {
    color: MAIN_COLOR,
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    borderRadius: 50,
    width: 20,
    height: 20,
    textAlign: 'center',
    fontSize: 8,
    paddingTop: 3.5,
  },
  countDown: {
    // backgroundColor: 'transparent',
    borderColor: MAIN_COLOR,
    borderWidth: 2,
    borderRadius: 20,
  },
});
