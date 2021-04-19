import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {View, Image, TouchableOpacity, FlatList, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setHitCount,
  setGameNextLevel,
  setSelectLevel,
} from '../../redux/reducer';
import CountDown from 'react-native-countdown-component';
import ModalScreenWrongCLick from '../ModalScreenWrongCLick';
import ModalScreenMenu from '../ModalScreenMenu';
import {ImageScreen} from '../ImageScreen';

import iconPouseGame from '../../imageGames/newDesign/pause.png';
import iconLamp from '../../imageGames/newDesign/lamp.png';

import styles from './GameScreen.style';
import BgWrapper from '../BgWrapper';

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

const initState = {
  clickWrong: false,
  openMenu: false,
  runTimer: true,
  pointGameNumb: 0,
  checkClick: [],
  init: true,
};

const GameScreen = ({nav}) => {
  const level = useSelector(st => st.levelSelected);
  const levelHard = useSelector(st => st.levelHard);
  const gameLevelList = useSelector(st => st.gameLevelList);
  const hintCount = useSelector(st => st.hintCount);
  const dispatch = useDispatch();
  const [local, setLocal] = useState({
    ...initState,
    timer: levelHard,
    pointGames: [...gamePointZone],
    gameZone: gameLevelList[level],
  });

  const restartLVL = useCallback(
    lvl => {
      let arrDef = gameLevelList[lvl].def;
      if (!arrDef) {
        return;
      }
      arrDef = arrDef.map(el => {
        el.def11 = {...el.def11, borderColor: GAME_CIRCLE};
        return el;
      });
      setLocal({
        ...initState,
        gameZone: {...gameLevelList[lvl], def: [...arrDef]},
        timer: levelHard,
        pointGames: [...gamePointZone],
      });
    },
    [gameLevelList, levelHard],
  );

  const pressScreen = () => {
    setLocal(prev => {
      return {...prev, clickWrong: true};
    });

    const timeOut = setTimeout(() => {
      setLocal(prev => {
        return {...prev, clickWrong: false};
      });
      clearTimeout(timeOut);
    }, 5000);
  };

  const pressGood = useCallback(
    ind => {
      if (!local.checkClick.includes(ind)) {
        const newDef = [...local.gameZone.def];
        newDef[ind].def11 = {
          ...newDef[ind].def11,
          borderColor: COLOR_CIRCLE_TRUE,
        };
        const newPoint = [...local.pointGames];
        newPoint[local.pointGameNumb] = {
          ...local.pointGames[local.pointGameNumb],
          colorPoint: {backgroundColor: COLOR_TRUE_POINT},
        };
        setLocal(prev => {
          return {
            ...prev,
            gameZone: {...prev.gameZone, def: [...newDef]},
            pointGameNumb: prev.pointGameNumb + 1,
            pointGames: [...newPoint],
            checkClick: [...prev.checkClick, ind],
          };
        });
      } else {
        return;
      }
    },
    [
      local.checkClick,
      local.gameZone.def,
      local.pointGameNumb,
      local.pointGames,
    ],
  );

  const openModalNextLVL = useCallback(async () => {
    setLocal(prev => {
      return {
        ...prev,
        checkClick: [],
        pointGames: [...gamePointZone],
      };
    });
    const timeOut = setTimeout(() => {
      dispatch(setSelectLevel(level + 1));
      dispatch(setGameNextLevel(level + 1));
      clearTimeout(timeOut);
    }, 300);
    await nav.push('Modal Greate Game');
  }, [dispatch, level, nav]);

  const exitToStart = useCallback(() => {
    setLocal(prev => {
      return {
        ...prev,
        openMenu: !prev.openMenu,
        init: true,
      };
    });

    nav.push('Find Differences');
    restartLVL(level);
  }, [nav, restartLVL, level]);
  const openMenuModal = () => {
    setLocal(prev => {
      return {
        ...prev,
        openMenu: !prev.openMenu,
        runTimer: !prev.runTimer,
      };
    });
  };

  const onGetHint = useCallback(() => {
    dispatch(setHitCount(hintCount - 1));

    const def = [...local.gameZone.def];
    const ind = def.findIndex(item => item.def11.borderColor === 'transparent');
    const notClickHint = def.findIndex(
      item => item.def11.borderColor === HIST_COLOR,
    );
    if (ind < 0 || notClickHint >= 0) {
      return;
    }
    def[ind].def11 = {
      ...def[ind].def11,
      borderColor: HIST_COLOR,
    };
    setLocal(prev => {
      return {
        ...prev,
        gameZone: {
          ...prev.gameZone,
          def: [...def],
        },
      };
    });
  }, [dispatch, hintCount, local.gameZone.def]);

  const onFinish = useCallback(async () => {
    restartLVL(level);
    await nav.push('Modal time Over');
  }, [nav, restartLVL, level]);

  useEffect(() => {
    if (!local.init) {
      restartLVL(level);
    }
    return () => {
      restartLVL(level);
    };
  }, [restartLVL, level, local.init, gameLevelList]);

  useEffect(() => {
    setLocal(prev => {
      return {
        ...prev,
        gameZone: gameLevelList[level],
      };
    });
    restartLVL(level);
  }, [gameLevelList, level, restartLVL]);
  if (local.checkClick.length === 5) {
    setTimeout(openModalNextLVL, 500);
  }
  return useMemo(
    () => (
      <BgWrapper>
        <View style={styles.mainScreen}>
          <ModalScreenWrongCLick clickWrong={local.clickWrong} />
          <ModalScreenMenu
            openMenu={local.openMenu}
            openMenuModal={openMenuModal}
            exitToStart={exitToStart}
            nav={nav}
          />
          <View style={{paddingBottom: 10}} />
          <View style={{position: 'absolute', top: 40, left: '40%'}}>
            <CountDown
              until={local.timer * 60}
              size={15}
              onFinish={onFinish}
              id={local.gameZone.imageGames.first}
              digitStyle={{backgroundColor: 'transparent'}}
              digitTxtStyle={[styles.countDownText, {color: 'red'}]}
              timeToShow={['M', 'S']}
              timeLabels={{m: '', s: ''}}
              running={local.runTimer}
              showSeparator={true}
              separatorStyle={{color: 'red'}}
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
            <View style={styles.hintCountContainer}>
              <Text style={styles.countHint}>{hintCount}</Text>
            </View>
          </TouchableOpacity>

          <View style={{position: 'absolute', top: '16%'}}>
            <FlatList
              horizontal={true}
              data={local.pointGames}
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
              images={local.gameZone.imageGames.first}
              pressScreen={pressScreen}
              gameZone={local.gameZone}
              clickWrong={local.clickWrong}
              pressGood={pressGood}
            />
            <View style={{height: 5}} />
            <ImageScreen
              images={local.gameZone.imageGames.second}
              pressScreen={pressScreen}
              gameZone={local.gameZone}
              clickWrong={local.clickWrong}
              pressGood={pressGood}
            />
          </View>
        </View>
      </BgWrapper>
    ),
    [
      exitToStart,
      hintCount,
      local.clickWrong,
      local.gameZone,
      local.openMenu,
      local.pointGames,
      local.runTimer,
      local.timer,
      nav,
      onFinish,
      onGetHint,
      pressGood,
    ],
  );
};

export default GameScreen;
