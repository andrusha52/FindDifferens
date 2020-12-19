import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Image,
  ImageBackground,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import close from '../imageGames/newDesign/back.png';
import ON from '../imageGames/newDesign/StartMenu/On.png';
import OFF from '../imageGames/newDesign/StartMenu/Off.png';
import LikeIcon from '../imageGames/newDesign/StartMenu/like.png';
import MailIcon from '../imageGames/newDesign/StartMenu/mail.png';

const ModalScreenMenuStart = props => {
  const [soundFlag, setSoundFlag] = useState(false);
  const [musicFlag, setMusicFlag] = useState(false);
  const changeFlagSound = () => {
    setSoundFlag(soundFlag => !soundFlag);
  };
  const changeFlagMusic = () => {
    setMusicFlag(musicFlag => !musicFlag);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.openMenu}
      onRequestClose={() => {}}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.iconCloseContainer}
            onPress={() => {
              props.exitToStart();
            }}>
            <Image source={close} style={styles.iconClose} />
          </TouchableOpacity>
          <Text style={styles.modalText}>SETTINGS</Text>
          <View style={styles.selectorContainer}>
            <Picker
              selectedValue={props.levelHard.toString()}
              style={styles.picketStyle}
              onValueChange={itemValue => props.setSelectedValue(itemValue)}>
              <Picker.Item label="легкий (5мин)" value="5" />
              <Picker.Item label="средний (2мин)" value="2" />
              <Picker.Item label="сложный (1мин)" value="1" />
            </Picker>
          </View>
          <View>
            <View style={styles.flagContainer}>
              <Text style={styles.titleFlag}>SOUND</Text>
              <TouchableOpacity onPress={changeFlagSound} activeOpacity={0.9}>
                <ImageBackground
                  source={soundFlag ? ON : OFF}
                  style={styles.iconFlag}
                  fadeDuration={0}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.flagContainer}>
              <Text style={styles.titleFlag}>MUSIC</Text>
              <TouchableOpacity onPress={changeFlagMusic} activeOpacity={0.9}>
                <ImageBackground
                  source={musicFlag ? ON : OFF}
                  style={styles.iconFlag}
                  fadeDuration={0}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
              <View style={styles.flagContainer}>
                <Text style={styles.linkText}>FEEDBACK</Text>
                <Image source={MailIcon} style={styles.linkIcon} />
              </View>
              <View style={styles.flagContainer}>
                <Text style={styles.linkText}>RATE US</Text>
                <Image source={LikeIcon} style={styles.linkIcon} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    backgroundColor: '#201d31',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  picketStyle: {height: 30, width: 220, color: 'white'},
  iconCloseContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  iconClose: {
    width: 25,
    height: 25,
  },
  modalText: {
    color: 'orange',
    fontSize: 40,
    fontWeight: 'bold',
  },
  flagContainer: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleFlag: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
  },
  iconFlag: {width: 70, height: 32, resizeMode: 'contain'},
  linkText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
  },
  linkIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  linkContainer: {
    marginTop: 100,
  },
});
