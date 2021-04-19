import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

export const ImageScreen = props => {
  return (
    <ImageZoom
      cropWidth={350}
      cropHeight={230}
      imageWidth={350}
      imageHeight={230}
      minScale={1}
      maxScale={2}>
      <TouchableWithoutFeedback onPress={() => props.pressScreen()}>
        <View>
          <Image style={styles.image} source={props.images} />
          <TouchableOpacity
            style={{
              ...styles.defAll,
              ...props.gameZone.def[0].def11,
            }}
            onPress={() => props.pressGood(0)}>
            <View />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.defAll,
              ...props.gameZone.def[1].def11,
            }}
            onPress={() => props.pressGood(1)}>
            <View />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.defAll,
              ...props.gameZone.def[2].def11,
            }}
            onPress={() => props.pressGood(2)}>
            <View />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.defAll,
              ...props.gameZone.def[3].def11,
            }}
            onPress={() => props.pressGood(3)}>
            <View />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.defAll,
              ...props.gameZone.def[4].def11,
            }}
            onPress={() => props.pressGood(4)}>
            <View />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ImageZoom>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 230,
    borderRadius: 10,
  },
  defAll: {
    position: 'absolute',
    width: 40,
    height: 40,
    flex: 0.3,
    zIndex: 1000,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
});
