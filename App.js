/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {persistor, store} from './src/redux/store';

// SetUp
import Setup from './src/screens/Setup';
// import SplashScreen from 'react-native-splash-screen';

import LoadingPage from './src/components/LoadingPage';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    // SplashScreen.hide();

    OneSignal.init('a7cc39f9-5233-46a8-9bec-cb87d2c34b5d', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.addEventListener('ids', async (id) => {
      await AsyncStorage.setItem('device_token', id.userId);
      await AsyncStorage.setItem('platform', 'android');
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LoadingPage />
        <Setup />
      </PersistGate>
    </Provider>
  );
};

export default App;
