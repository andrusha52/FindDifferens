import 'react-native-gesture-handler';
import * as React from 'react';
import {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './src/redux/store';
import store from './src/redux/store';
import StartScreen from './src/components/StartScreen';
import ModalScreen from './src/components/ModalScreenNextScreen';
import ModalTimeOver from './src/components/ModalTimeOver';
import PreStart_Game from './src/components/PreStart_Game';
import CategoryGames from './src/components/Category/CateforyGamesScreen';
import {AdMobInterstitial} from 'react-native-admob';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
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
      <Stack.Screen
        name="Modal time Over"
        component={ModalTimeOver}
        options={{title: ''}}
        screenOptions={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
LogBox.ignoreLogs(['Warning: ...', 'ERROR']);

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
          <StatusBar hidden />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
