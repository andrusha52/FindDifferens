import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import arrowRigth from '../imageGames/newDesign/arrowRight.png';
import BgWrapper from './BgWrapper';

const ModalScreenNextLVL = props => {
  if (!props.openMenu) {
    return null;
  } else {
    return (
      <View style={styles.containerAbsolut}>
        <BgWrapper>
          <Text style={styles.modalText}>PAUSE</Text>
          <TouchableOpacity
            style={styles.openButton}
            onPress={() => props.openMenuModal()}>
            <Image
              source={arrowRigth}
              style={styles.arrowRigthIcon}
              resizeMode="contain"
            />
            <Text style={styles.textStyle}>RESUME GAME</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.openButton}
            onPress={() => {
              props.exitToStart();
            }}>
            <Image
              source={arrowRigth}
              style={styles.arrowRigthIcon}
              resizeMode="contain"
            />
            <Text style={styles.textStyle}>QIUTE GAME</Text>
          </TouchableOpacity>
        </BgWrapper>
      </View>
    );
  }
};

export default ModalScreenNextLVL;

const styles = StyleSheet.create({
  containerAbsolut: {
    position: 'absolute',
    width: '100%',
    height: '102%',
    zIndex: 1000,
  },
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
    flexDirection: 'row',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: 25,
    textAlign: 'left',
  },
  modalText: {
    color: 'white',
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: 30,
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
  arrowRigthIcon: {
    width: 30,
    height: 30,
  },
});
