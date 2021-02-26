import {StyleSheet, Dimensions} from 'react-native';

const MAIN_COLOR = '#fff'; // main screen bg
const COLOR_TRUE_POINT = 'red'; // color check point valid color
const COLOR_CIRCLE_TRUE = 'green'; // color cyrcle true click
const GAME_CIRCLE = 'orange';

export default StyleSheet.create({
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
