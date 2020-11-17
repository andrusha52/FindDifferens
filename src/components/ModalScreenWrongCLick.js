import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Alert,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {BlurView} from '@react-native-community/blur';

const ModalScreenWrongCLick = props => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={props.clickWrong}
    onRequestClose={() => {}}>
    <BlurView
      style={styles.absolute}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    />
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText} />
        <CountDown
          until={5}
          size={15}
          onFinish={''}
          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: 'orange'}}
          timeToShow={['M', 'S']}
          timeLabels={{m: '', s: ''}}
          running={true}
          showSeparator={true}
          separatorStyle={{color: 'orange'}}
        />
        <TouchableHighlight
          style={{...styles.openButton, backgroundColor: '#2196F3'}}>
          <Text style={styles.textStyle}>ШТРАФ СЕРДЕЧКО</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
);

export default ModalScreenWrongCLick;

const styles = StyleSheet.create({
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
