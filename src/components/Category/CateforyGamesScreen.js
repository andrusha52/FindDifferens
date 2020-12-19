import React, {useEffect} from 'react';
import {
  BackHandler,
  ToastAndroid,
  StatusBar,
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  NativeModules,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import GameDataCategory from '../../imageGames/GameDataCategory';
import {setSelectLevel} from '../../redux/reducer';
import imageBgAll from '../../imageGames/newDesign/imageBgAll.png';
import close from '../../imageGames/newDesign/back.png';

const DATA = GameDataCategory;

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

const CategoryGames = props => {
  const handleBackButton = () => {
    ToastAndroid.show(
      'Для того что бы выйти , откройте МЕНЮ',
      ToastAndroid.SHORT,
    );

    return true;
  };
  const goToGame = () => {
    props.navigation.navigate('PreStart_Game');
  };

  useEffect(() => {
    NativeModules.NavigationBarColor.hideNavigationBar();
    props.navigation.setOptions({
      headerLeft: () => '',
      headerShown: false,
    });

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, []);
  return (
    <ImageBackground source={imageBgAll} style={styles.imageBG}>
      <View style={{width: '100%', height: '100%'}}>
        <StatusBar hidden={true} />

        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.btnBack}>
          <Image source={close} style={styles.iconClose} />
        </TouchableOpacity>
        <View style={styles.titleCategoryContainer}>
          <Text style={styles.titleText}>DIFFERENCES FOUNDS: 0/50</Text>
          <ScrollView horizontal={true} style={styles.containerList}>
            <FlatList
              data={DATA}
              renderItem={item =>
                listItemImage(item, props.setSelectLevel, goToGame)
              }
              keyExtractor={item => item.id}
              style={styles.containerList}
              horizontal={true}
              maxColumns={3}
              // numColumns={2}
            />
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

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
    height: 400,
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
    top: '7%',
  },
  iconClose: {
    width: 25,
    height: 25,
  },
  titleCategoryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: Dimensions.get('window').width * 0.2,
  },
  titleText: {
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: 20,
    color: 'white',
  },
});
