const arrLevel = 'ARRAY_LEVEL';
const lastLVL = 'LAST_LEVEL';
const timerOver = 'TIME_IS_OVER';
const levelHardSelector = 'LEVEL_HARD_SELECTOR';
const levelSelected = 'LEVEL_SELECTED';
const initState = {
  arrLevel: [],
  timerIsOVer: false,
  levelHard: 2,
  levelSelected: 0,
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case arrLevel:
      return {...state};
    case timerOver:
      return {...state, timerIsOVer: action.payload};
    case levelHardSelector:
      return {...state, levelHard: action.payload};
    case levelSelected:
      return {...state, levelSelected: action.payload};
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
export const setTimerIsOver = timer => ({
  type: timerOver,
  payload: timer,
});
export const setLevelHard = level => ({
  type: levelHardSelector,
  payload: level,
});
export const setSelectLevel = level => ({
  type: levelSelected,
  payload: level,
});

export default gameReducer;
