import React from 'react';
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const ModalScreenNextLVL = props => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={props.openMenu}
    onRequestClose={() => {}}>
    <BlurView
      style={styles.absolute}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    />
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>ПАУЗА</Text>
        <TouchableHighlight
          style={{
            ...styles.openButton,
            backgroundColor: '#2196F3',
            marginBottom: 5,
            width: 150,
          }}
          onPress={() => props.openMenuModal()}>
          <Text style={styles.textStyle}>Продолжить</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{...styles.openButton, backgroundColor: '#2196F3', width: 150}}
          onPress={() => {
            props.exitToStart();
            props.nav.push('Find Differences');
          }}>
          <Text style={styles.textStyle}>Выйти</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
);

export default ModalScreenNextLVL;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
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
