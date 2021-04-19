import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import gameReducer from './reducer';
import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // // Storage Method (React Native)
  storage: AsyncStorage,
  // // Whitelist (Save Specific Reducers)
  // whitelist: [],
  // // Blacklist (Don't Save Specific Reducers)
  // blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, gameReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);
export const persistor = persistStore(store);
export default store;
