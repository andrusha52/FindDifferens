import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {BlurView} from '@react-native-community/blur';
import errorCLick from '../imageGames/newDesign/heartBreak.gif';

const ModalScreenWrongCLick = ({clickWrong}) => {
  if (!clickWrong) {
    return null;
  } else {
    return (
      <View style={styles.containerAbsolut}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={errorCLick}
              resizeMode="contain"
              style={styles.iconHeart}
            />
            <CountDown
              until={5}
              size={15}
              onFinish={''}
              digitStyle={{backgroundColor: 'rgb(5,29,49)'}}
              digitTxtStyle={{color: 'orange'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: '', s: ''}}
              running={true}
              showSeparator={true}
              separatorStyle={{color: 'orange'}}
            />
          </View>
        </View>
      </View>
    );
  }
};

export default ModalScreenWrongCLick;

const styles = StyleSheet.create({
  containerAbsolut: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 1000,
  },
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgb(5,29,49)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  absolute: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  iconHeart: {
    width: 100,
    height: 100,
  },
});
