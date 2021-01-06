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
import imageBgAll from '../imageGames/newDesign/imageBgAll.png';
import iconPouseGame from '../imageGames/newDesign/pause.png';
import iconLamp from '../imageGames/newDesign/lamp.png';

const MAIN_COLOR = '#fff'; // main screen bg
const COLOR_TRUE_POINT = 'red'; // color check point valid color
const COLOR_CIRCLE_TRUE = 'green'; // color cyrcle true click
const GAME_CIRCLE = 'orange';
// const GAME_CIRCLE = 'red';

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
    await this.props.nav.push('Modal Greate Game');
    await this.setState({
      checkClick: [],
      pointGames: [...gamePointZone],
    });

    this.props.setSelectLevel(this.props.state.levelSelected + 1);
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
    return (
      <>
        <ImageBackground source={imageBgAll} style={styles.image}>
          <View style={styles.mainScreen}>
            <ModalScreenWrongCLick clickWrong={clickWrong} />
            <ModalScreenMenu
              openMenu={openMenu}
              openMenuModal={this.openMenuModal.bind(this)}
              exitToStart={this.exitToStart.bind(this)}
              nav={this.props.nav}
            />
            <View style={{paddingBottom: 10}} />
            <View style={{position: 'absolute', top: 70, left: '40%'}}>
              <CountDown
                until={timer * 1}
                size={18}
                id={gameZone.imageGames.first}
                onFinish={() =>
                  this.props.setTimerIsOver(!this.props.state.timerIsOVer)
                }
                digitStyle={styles.countDown}
                digitTxtStyle={styles.countDownText}
                timeLabelStyle={styles.countDownTextTime}
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
                style={styles.iconBtnControl}
                resizeMode="contain"
                source={iconPouseGame}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openMenuModal()}
              style={styles.btnHint}>
              <Image
                style={styles.iconBtnControl}
                source={iconLamp}
                resizeMode="contain"
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

            <View style={{position: 'absolute', top: '16%'}}>
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
    position: 'absolute',
    top: 50,
    right: 15,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnHint: {
    position: 'absolute',
    top: 50,
    left: 15,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnControl: {
    width: 80,
    height: 80,
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
    borderColor: MAIN_COLOR,
    fontFamily: 'LuckiestGuy-Regular',
  },
  countDownText: {
    color: MAIN_COLOR,
    fontSize: 30,
    fontFamily: 'LuckiestGuy-Regular',
  },
  countDownTextTime: {
    fontFamily: 'LuckiestGuy-Regular',
  },
});
