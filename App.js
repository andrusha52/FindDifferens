import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './src/redux/store';
import store from './src/redux/store';
import StartScreen from './src/components/StartScreen';
import ModalScreen from './src/components/ModalScreen';
import PreStart_Game from './src/components/PreStart_Game';
import CategoryGames from './src/components/Category/CateforyGamesScreen';
import {AdMobInterstitial} from 'react-native-admob';
import {useEffect} from 'react';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Find Differences"
        component={StartScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="PreStart_Game"
        component={PreStart_Game}
        options={{title: ''}}
      />
      <Stack.Screen
        name="CaterogyGames"
        component={CategoryGames}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Modal Greate Game"
        component={ModalScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  useEffect(() => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-5202163251039749/1706774313');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
