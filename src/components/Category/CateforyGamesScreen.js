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
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import GameDataCategory from '../../imageGames/GameDataCategory';
import {setSelectLevel} from '../../redux/reducer';
import imageBgAll from '../../imageGames/newDesign/imageBgAll.png';
import close from '../../imageGames/newDesign/back.png';

const DATA = [...GameDataCategory, ...GameDataCategory, ...GameDataCategory];
const pageCount = Math.ceil(DATA.length / 6);

const {width: screenWidth} = Dimensions.get('window');

const listPages = data => {
  const listGames = [...data];
  let countPage = pageCount;
  const result = [];
  while (countPage > 0) {
    result.push(listGames.slice(0, 8));
    countPage--;
  }
  return result;
};

const ListItemImage = ({elem, setSelectLevel, goToGame}) => {
  const index = DATA.findIndex(
    item => item.imageGames.first === elem.imageGames.first,
  );
  return (
    <View>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          setSelectLevel(index);
          goToGame();
        }}>
        <ImageBackground source={elem.imageGames.first} style={styles.image} />
      </TouchableOpacity>
    </View>
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

  const renderItem = ({item}) => {
    return (
      <FlatList
        data={item}
        renderItem={({item: elem}) => (
          <ListItemImage
            elem={elem}
            setSelectLevel={props.setSelectLevel}
            goToGame={goToGame}
          />
        )}
        style={styles.containerList}
        numColumns={2}
      />
    );
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
          <View>
            <Carousel
              sliderWidth={screenWidth}
              sliderHeight={screenWidth + screenWidth}
              itemWidth={screenWidth - 30}
              data={listPages(DATA)}
              renderItem={renderItem}
            />
          </View>
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
    width: screenWidth - 20,
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
