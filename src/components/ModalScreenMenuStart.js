import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import close from '../imageGames/newDesign/back.png';
import ON from '../imageGames/newDesign/StartMenu/On.png';
import OFF from '../imageGames/newDesign/StartMenu/Off.png';
import LikeIcon from '../imageGames/newDesign/StartMenu/like.png';
import MailIcon from '../imageGames/newDesign/StartMenu/mail.png';
import SelectedHard from './SelectedHard';

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
      onRequestClose={() => {}}
      presentationStyle="fullScreen">
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

          <View>
            <View style={styles.separator} />
            <SelectedHard
              levelHard={props.levelHard}
              onChange={props.setSelectedValue}
            />
          </View>

          <View>
            <View style={styles.separator} />
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
            <View style={styles.separator} />
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
    fontFamily: 'LuckiestGuy-Regular',
    color: 'orange',
    fontSize: 50,
  },
  flagContainer: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleFlag: {
    fontFamily: 'LuckiestGuy-Regular',
    color: 'white',
    fontSize: 30,
  },
  iconFlag: {width: 70, height: 32, resizeMode: 'contain'},
  linkText: {
    fontFamily: 'LuckiestGuy-Regular',
    color: 'white',
    fontSize: 25,
  },
  linkIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  linkContainer: {
    margin: 20,
  },
  separator: {
    height: 2,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    marginVertical: 20,
    borderRadius: 20,
  },
});
