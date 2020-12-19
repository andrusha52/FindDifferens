import React, {useState} from 'react';
import {
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import start from '../../imageGames/newDesign/StartScreen/start.png';
import startS from '../../imageGames/newDesign/StartScreen/startS.png';
import startT from '../../imageGames/newDesign/StartScreen/startT.png';
import startA from '../../imageGames/newDesign/StartScreen/startA.png';
import startR from '../../imageGames/newDesign/StartScreen/startR.png';
import startT2 from '../../imageGames/newDesign/StartScreen/startT2.png';
import startLine from '../../imageGames/newDesign/StartScreen/startLine.png';
import startBorder from '../../imageGames/newDesign/StartScreen/startBorder.png';

const dataAnim = [
  start,
  startS,
  startT,
  startA,
  startR,
  startT2,
  startLine,
  startBorder,
];

const StartButton = () => {
  const [ind, setInd] = useState(0);
  const [dataImg] = useState([...dataAnim]);
  React.useEffect(() => {
    const inter = setInterval(() => {
      setInd(ind => (ind < dataImg.length - 1 ? ind + 1 : 0));
    }, 500);

    return () => {
      clearInterval(inter);
    };
  }, []);

  return (
    <Image
      source={dataImg[ind]}
      style={styles.startButton}
      fadeDuration={0}
    />
  );
};

export default StartButton;

const styles = StyleSheet.create({
  startButton: {
    width: 290,
    height: 160,
  },
  startButtonLink: {
    flex: 1,
  },
});
