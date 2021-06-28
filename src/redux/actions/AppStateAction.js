import {
  setEnLng,
  setThLng,
  SET_LOADING,
  SET_SNACKBAR_DISPLAY,
  SET_SNACKBAR_DISMISS,
  SET_USER,
  isSignIn,
  AddAddressModal,
  AddEmergencyContactModal,
  UploadPictureModal,
  SET_PDPA_MODAL,
} from '../types';
import {post, get, everyGet} from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {ramble} from '../../constants';
import {Alert, Linking} from 'react-native';
import {Platform} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {getAppstoreAppMetadata} from 'react-native-appstore-version-checker';

export const setEn = () => async (dispatch) => {
  await AsyncStorage.setItem('lang', 'en');
  dispatch({
    type: setEnLng,
  });
};

export const setTh = () => async (dispatch) => {
  await AsyncStorage.setItem('lang', 'th');
  dispatch({
    type: setThLng,
  });
};

export const setLoading = (state) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: state,
  });
};

export const setSnackbarDisplay = (state) => (dispatch) => {
  dispatch({
    type: SET_SNACKBAR_DISPLAY,
    payload: state,
  });
};

export const setSnackbarDismiss = (state) => (dispatch) => {
  dispatch({
    type: SET_SNACKBAR_DISMISS,
  });
};

export const checkIsSignedin = (checkSkipOnBoarding, t) => async (dispatch) => {
  await checkSkipOnBoarding();

  try {
    let version;
    if (Platform.OS === 'ios') {
      const res = await getAppstoreAppMetadata('1551268864', {
        typeOfId: 'id',
        country: 'th',
      });
      version = res.version;
    } else if (Platform.OS === 'android') {
      version = await VersionCheck.getLatestVersion({
        provider: 'playStore',
      });
    }

    VersionCheck.needUpdate({
      currentVersion: ramble.version,
      latestVersion: version,
    }).then(async (res) => {
      if (!res.isNeeded) {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          const res1 = await get('/api/users/getuserbyjwt');

          if (res1._id) {
            dispatch({
              type: SET_USER,
              payload: res1,
            });
            dispatch({
              type: isSignIn,
              payload: true,
            });
            dispatch({
              type: SET_LOADING,
              payload: false,
            });
          } else {
            await checkSkipOnBoarding();
          }
        } else {
          await checkSkipOnBoarding();
        }
      } else {
        Alert.alert(t('checkversion.warning1'), t('checkversion.warning2'), [
          {
            text: t('checkversion.updated'),
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL(
                  `https://apps.apple.com/th/app/ramble/id1551268864?l=th`,
                );
              } else if (Platform.OS === 'android') {
                Linking.openURL(
                  `https://play.google.com/store/apps/details?id=com.ramble`,
                );
              }
            },
          },
        ]);
        await checkSkipOnBoarding();
      }
    });
  } catch (error) {
    console.log(error);
    await checkSkipOnBoarding();
  }
};

export const setAddAddressModal = (state) => (dispatch) => {
  dispatch({
    type: AddAddressModal,
    payload: state,
  });
};

export const setEmergencyModal = (state) => (dispatch) => {
  dispatch({
    type: AddEmergencyContactModal,
    payload: state,
  });
};

export const setUploadPictureModal = (state) => (dispatch) => {
  dispatch({
    type: UploadPictureModal,
    payload: state,
  });
};

export const setPDPAModal = (state) => (dispatch) => {
  dispatch({
    type: SET_PDPA_MODAL,
    payload: state,
  });
};
