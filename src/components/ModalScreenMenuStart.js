import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Picker,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const ModalScreenMenuStart = props => (
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
        <Text style={styles.modalText}>Меню</Text>
        <View style={styles.selectorContainer}>
          <Picker
            selectedValue={props.levelHard.toString()}
            style={{height: 30, width: 220}}
            onValueChange={itemValue => props.setSelectedValue(itemValue)}>
            <Picker.Item label="легкий (5мин)" value="5" />
            <Picker.Item label="средний (2мин)" value="2" />
            <Picker.Item label="сложный (1мин)" value="1" />
          </Picker>
        </View>
        <TouchableHighlight
          style={{...styles.openButton, backgroundColor: '#2196F3', width: 150}}
          onPress={() => {
            props.exitToStart();
          }}>
          <Text style={styles.textStyle}>Вернутся</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
);

export default ModalScreenMenuStart;

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
  selectorContainer: {
    marginBottom: 20,
  },
});
