import {createStore, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers from './reducers';

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['PDPA'],
};

const middlewares = [thunk];

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  pReducer,
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const persistor = persistStore(store);
