import React, {Component} from 'react';
import GameScreen from './GameScreen';
import {
  BackHandler,
  ToastAndroid,
  StatusBar,
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import GameDataCategory from '../imageGames/GameDataCategory';
import {setSelectLevel} from '../redux/reducer';

const listItemImage = (items, setLevel, goToGame) => {
  const {item, index} = items;
  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => {
        setLevel(index);
        goToGame();
      }}>
      <ImageBackground source={item.imageGames.first} style={styles.image} />
    </TouchableOpacity>
  );
};

const DATA = GameDataCategory;
const image = require('../imageGames/bg-image.jpg');

class CategoryGames extends Component {
  state = {timeOver: false};
  componentDidMount() {
    NativeModules.NavigationBarColor.hideNavigationBar();
    this.props.navigation.setOptions({
      headerLeft: () => '',
      headerShown: false,
    });

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    ToastAndroid.show(
      'Для того что бы выйти , откройте МЕНЮ',
      ToastAndroid.SHORT,
    );

    return true;
  }
  goToGame() {
    this.props.navigation.navigate('PreStart_Game');
  }

  render() {
    return (
      <ImageBackground source={image} style={styles.imageBG}>
        <View style={{width: '100%', height: '100%'}}>
          <StatusBar hidden={true} />
          <View style={styles.btnBack}>
            <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              title="BACK"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>Category</Text>
            <FlatList
              data={DATA}
              renderItem={item =>
                listItemImage(
                  item,
                  this.props.setSelectLevel,
                  this.goToGame.bind(this),
                )
              }
              keyExtractor={item => item.id}
              style={styles.containerList}
              horizontal={false}
              numColumns={2}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const mstp = state => ({
  state: state,
});
const mapDispatchToProps = {
  setSelectLevel: setSelectLevel,
};
export default connect(
  mstp,
  mapDispatchToProps,
)(CategoryGames);

const styles = StyleSheet.create({
  containerList: {
    width: '90%',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: '10%',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  image: {
    width: 150,
    height: 100,
  },
  imageBG: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  btnBack: {
    position: 'absolute',
    left: '5%',
    top: '1%',
    width: 100,
    height: 50,
  },
});
