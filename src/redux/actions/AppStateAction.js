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
import {post, get} from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

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

export const checkIsSignedin = (checkSkipOnBoarding) => async (dispatch) => {
  try {
    const res = await get('/api/users/getuserbyjwt');

    if (res._id) {
      dispatch({
        type: SET_USER,
        payload: res,
      });
      dispatch({
        type: isSignIn,
        payload: true,
      });

      SplashScreen.hide();
    } else {
      await checkSkipOnBoarding();
    }
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
