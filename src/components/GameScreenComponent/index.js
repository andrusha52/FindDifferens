import React, {useMemo, useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setTimerIsOver,
  setGameNextLevel,
  setSelectLevel,
  setHitCount,
} from '../../redux/reducer';
import ModalScreenWrongCLick from '../ModalScreenWrongCLick';
import ModalScreenMenu from '../ModalScreenMenu';
import {ImageScreen} from '../ImageScreen';

import imageBgAll from '../../imageGames/newDesign/imageBgAll.png';
import iconPouseGame from '../../imageGames/newDesign/pause.png';
import iconLamp from '../../imageGames/newDesign/lamp.png';
import TimerCountDown from './TimerCountDown';

import styles from './GameScreen.style';

const MAIN_COLOR = '#fff'; // main screen bg
const COLOR_TRUE_POINT = 'red'; // color check point valid color
const COLOR_CIRCLE_TRUE = 'green'; // color cyrcle true click
const GAME_CIRCLE = 'transparent';
const HIST_COLOR = 'orange';

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

const GameScreen = ({state, nav}) => {
  const dispatch = useDispatch();

  const [timer, setTimer] = useState(state.levelHard);
  const [clickWrong, setClickWrong] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [runTimer, setRunTimer] = useState(true);
  const [pointGames, setPointGames] = useState([...gamePointZone]);
  const [pointGameNumb, setPointGameNumb] = useState(0);
  const [gameZone, setGameZone] = useState(
    state.gameLevelList[state.levelSelected],
  );
  const [checkClick, setCheckClick] = useState([]);

  const [init, setInit] = useState(true);

  const restartLVL = () => {
    let arrDef = state.gameLevelList[state.levelSelected].def;
    arrDef = arrDef.map(el => {
      el.def11 = {...el.def11, borderColor: GAME_CIRCLE};
      return el;
    });
    setTimer(state.levelHard);
    setGameZone({
      ...state.gameLevelList[state.levelSelected],
      def: [...arrDef],
    });
    setPointGames([...gamePointZone]);
    setRunTimer(true);
    setInit(false);
    setPointGameNumb(0);
    setClickWrong(false);
  };

  const pressScreen = () => {
    setClickWrong(true);
    setTimeout(() => {
      setClickWrong(false);
    }, 5000);
  };

  const pressGood = ind => {
    if (!checkClick.includes(ind)) {
      const newDef = [...gameZone.def];
      newDef[ind].def11 = {
        ...newDef[ind].def11,
        borderColor: COLOR_CIRCLE_TRUE,
      };
      const newPoint = [...pointGames];
      newPoint[pointGameNumb] = {
        ...pointGames[pointGameNumb],
        colorPoint: {backgroundColor: COLOR_TRUE_POINT},
      };
      setGameZone(prev => {
        return {...prev, def: [...newDef]};
      });
      setPointGameNumb(prev => prev + 1);
      setPointGames([...newPoint]);
      setCheckClick(prev => [...prev, ind]);
    } else {
      return;
    }
  };

  const openModalNextLVL = async () => {
    setCheckClick([]);
    setPointGames([...gamePointZone]);
    dispatch(setSelectLevel(state.levelSelected + 1));
    dispatch(setGameNextLevel(state.levelSelected + 1));
    await nav.push('Modal Greate Game');
  };

  const exitToStart = () => {
    setOpenMenu(prev => !prev);
    setInit(true);
    nav.push('Find Differences');
  };
  const openMenuModal = () => {
    setOpenMenu(prev => !prev);
    setRunTimer(prev => !prev);
  };

  if (checkClick.length === 5) {
    setTimeout(openModalNextLVL, 500);
  
  }

  const onFinishTime = () => {
    dispatch(setTimerIsOver(!state.timerIsOVer));
  };

  const onGetHint = () => {
    dispatch(setHitCount(state.hintCount - 1));
    const ind = checkClick.length;
    const newDef = [...gameZone.def];
    newDef[ind].def11 = {
      ...newDef[ind].def11,
      borderColor: HIST_COLOR,
    };
    setGameZone(prev => {
      return {...prev, def: newDef};
    });
  };

  useEffect(() => {
    if (init) {
      restartLVL();
    }
    return () => {
      restartLVL();
    };
  }, [state.levelSelected, state.levelHard]);
  return (
    <>
      <ImageBackground source={imageBgAll} style={styles.image}>
        <View style={styles.mainScreen}>
          <ModalScreenWrongCLick clickWrong={clickWrong} />
          <ModalScreenMenu
            openMenu={openMenu}
            openMenuModal={openMenuModal}
            exitToStart={exitToStart}
            nav={nav}
          />
          <View style={{paddingBottom: 10}} />
          <View style={{position: 'absolute', top: 70, left: '40%'}}>
            <TimerCountDown
              timer={timer}
              onFinish={onFinishTime}
              runTimer={runTimer}
            />
          </View>

          <TouchableOpacity onPress={openMenuModal} style={styles.btnMenu}>
            <Image
              style={styles.iconBtnControl}
              resizeMode="contain"
              source={iconPouseGame}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onGetHint} style={styles.btnHint}>
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
              <Text style={styles.countHint}>{state.hintCount}</Text>
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
              pressScreen={pressScreen}
              gameZone={gameZone}
              clickWrong={clickWrong}
              pressGood={pressGood}
            />
            <View style={{height: 5}} />
            <ImageScreen
              images={gameZone.imageGames.second}
              pressScreen={pressScreen}
              gameZone={gameZone}
              clickWrong={clickWrong}
              pressGood={pressGood}
            />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const GameScreenEnhunst = props => {
  const state = useSelector(state => state);
  return useMemo(() => <GameScreen state={state} nav={props.nav} />, [state]);
};

export default GameScreenEnhunst;
