import GameDataCategory from '../imageGames/GameDataCategory';

const arrLevel = 'ARRAY_LEVEL';
const lastLVL = 'LAST_LEVEL';
const timerOver = 'TIME_IS_OVER';
const levelHardSelector = 'LEVEL_HARD_SELECTOR';
const levelSelected = 'LEVEL_SELECTED';
const gameLevelList = 'GAME_LEVEL_LIST';
const minusHintCount = 'MINUS_HINT_COUNT';

const initState = {
  arrLevel: [],
  timerIsOver: false,
  levelHard: 2,
  levelSelected: 0,
  gameLevelList: [
    ...GameDataCategory,
    ...GameDataCategory,
    ...GameDataCategory,
  ],
  hintCount: 99,
};

const getNextLevel = (state, game) => {
  const {gameLevelList} = state;
  gameLevelList[game] = {...state.gameLevelList[game], done: true};
  return {...state, gameLevelList: [...gameLevelList]};
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case arrLevel:
      return {...state};
    case timerOver:
      return {...state, timerIsOver: action.payload};
    case levelHardSelector:
      return {...state, levelHard: action.payload};
    case levelSelected:
      return {...state, levelSelected: action.payload};
    case gameLevelList:
      return {...getNextLevel(state, action.payload)};
    case minusHintCount:
      return {...state, hintCount: action.payload};
    default:
      return state;
  }
};

export const setGameLVL = gameLVL => ({
  type: lastLVL,
  payload: gameLVL,
});
export const setArrayLevel = arrLvl => ({
  type: arrLevel,
  payload: arrLvl,
});
export const setTimerIsOver = isTimeRun => ({
  type: timerOver,
  payload: isTimeRun,
});
export const setLevelHard = time => ({
  type: levelHardSelector,
  payload: time,
});
export const setSelectLevel = level => ({
  type: levelSelected,
  payload: level,
});

export const setGameNextLevel = level => ({
  type: gameLevelList,
  payload: level,
});
export const setHitCount = count => ({
  type: minusHintCount,
  payload: count,
});

export default gameReducer;
