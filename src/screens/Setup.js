import React, {useState, useEffect} from 'react';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {setLoading, setTh, setEn} from '../redux/actions/AppStateAction';

// Translations
import i18n from 'i18n-js';
import '../translations';
import LocalizationContext from './LocalizationContext';

// Screen
import {MainTabScreen, OnboardingAndAuthorizingStackScreen} from './Navigator';
import DrawerContent from './drawer/DrawerContent';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SnackbarNotification from '../components/snackbar/SnackbarNotification';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const Drawer = createDrawerNavigator();

export default function App() {
  const locale = useSelector((state) => state.appState.lang);
  const isSignedIn = useSelector((state) => state.appState.isSignedIn);
  const dispatch = useDispatch();
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
    }),
    [locale],
  );
  const setLang = async () => {
    const lang = await AsyncStorage.getItem('lang');
    if (lang === 'th') {
      dispatch(setTh());
    } else if (lang === 'en') {
      dispatch(setEn());
    }
  };

  useEffect(() => {
    setLang();
  }, []);

  return (
    <LocalizationContext.Provider value={localizationContext}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0.6)"
      />
      <NavigationContainer>
        {isSignedIn ? (
          <Drawer.Navigator
            drawerContent={(props) => {
              return <DrawerContent {...props} />;
            }}
            drawerStyle={{backgroundColor: 'transparent'}}>
            <Drawer.Screen name="Home" component={MainTabScreen} />
          </Drawer.Navigator>
        ) : (
          <OnboardingAndAuthorizingStackScreen />
        )}
      </NavigationContainer>
      <SnackbarNotification />
    </LocalizationContext.Provider>
  );
}
