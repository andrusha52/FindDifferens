import React, {useCallback, useEffect, useMemo} from 'react';
import {
  BackHandler,
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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import {setSelectLevel} from '../../redux/reducer';

import close from '../../imageGames/newDesign/back.png';
import closeLvl from '../../imageGames/newDesign/close.png';
import BgWrapper from '../BgWrapper';

const countOnPage = 8;

const {width: screenWidth} = Dimensions.get('window');

const listPages = data => {
  const listGames = [...data];
  const pageCount = Math.ceil(listGames.length / countOnPage);
  let countPage = pageCount;
  const result = [];
  while (countPage > 0) {
    result.push(listGames.slice(0, countOnPage));
    for (let index = 0; index < countOnPage; index++) {
      listGames.shift();
    }
    countPage--;
  }
  return result;
};

const ListItemImage = ({index, goToGame, elem}) => {
  const dispatch = useDispatch();
  if (!elem.imageGames) {
    return null;
  }
  return (
    <View>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          dispatch(setSelectLevel(index));
          goToGame();
        }}
        disabled={!elem.done}>
        <ImageBackground source={elem.imageGames.first} style={styles.image}>
          {!elem.done && (
            <View style={styles.closeContain}>
              <Image
                source={closeLvl}
                style={styles.closeIcon}
                resizeMode="center"
              />
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const CategoryGames = props => {
  const dataList = useSelector(localState => localState.gameLevelList);

  const compliteLvlCount = dataList.filter(item => item.done).length;
  const handleBackButton = () => {
    return true;
  };
  const goToGame = useCallback(() => {
    props.navigation.navigate('PreStart_Game');
  }, [props.navigation]);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <FlatList
          data={item}
          renderItem={({item: elem, index}) => (
            <ListItemImage elem={elem} index={index} goToGame={goToGame} />
          )}
          style={styles.containerList}
          numColumns={2}
        />
      );
    },
    [goToGame],
  );

  useEffect(() => {
    NativeModules.NavigationBarColor.hideNavigationBar();
    props.navigation.setOptions({
      headerLeft: () => '',
      headerShown: false,
    });

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, [props.navigation]);
  return useMemo(
    () => (
      <BgWrapper>
        <View style={{width: '100%', height: '100%'}}>
          <StatusBar hidden={true} />

          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.btnBack}>
            <Image source={close} style={styles.iconClose} />
          </TouchableOpacity>
          <View style={styles.titleCategoryContainer}>
            <Text style={styles.titleText}>
              DIFFERENCES FOUNDS: {compliteLvlCount}/{dataList.length}
            </Text>
            <View style={styles.listContainer}>
              <Carousel
                sliderWidth={screenWidth - 50}
                sliderHeight={screenWidth + screenWidth}
                itemWidth={screenWidth - 30}
                data={listPages(dataList)}
                renderItem={renderItem}
              />
            </View>
          </View>
        </View>
      </BgWrapper>
    ),
    [compliteLvlCount, dataList, props.navigation, renderItem],
  );
};

export default CategoryGames;

const styles = StyleSheet.create({
  containerList: {
    width: screenWidth,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
  },
  btnBack: {
    position: 'absolute',
    left: '8%',
    top: '5%',
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
  closeIcon: {
    width: 80,
    height: 80,
  },
  closeContain: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0,0.8);',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgLine: {
    width: '100%',
    height: '100%',
  },
});
