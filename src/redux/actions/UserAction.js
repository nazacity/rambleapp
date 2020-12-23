import {
  SET_USER,
  CLEAR_USER,
  isSignIn,
  SET_LOADING,
  AddAddressModal,
  AddEmergencyContactModal,
  SET_UPCOMING_ACTIVITES,
} from '../types';
import {post, get, Delete} from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = (user) => async (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
  return dispatch({
    type: isSignIn,
    payload: true,
  });
};

export const signOut = (info) => async (dispatch) => {
  await AsyncStorage.removeItem('accessToken');
  dispatch({
    type: isSignIn,
    payload: false,
  });
  dispatch({
    type: CLEAR_USER,
  });
};

export const addNewAddress = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post('/api/users/createaddress', data);
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });
    dispatch({
      type: AddAddressModal,
      payload: false,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await Delete(`/api/users/deleteaddress/${addressId}`);
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });
    dispatch({
      type: AddAddressModal,
      payload: false,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const addNewEmergencyContact = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post('/api/users/createemergencycontact', data);
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });
    dispatch({
      type: AddEmergencyContactModal,
      payload: false,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const deleteEmergencyContact = (emergencyId) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await Delete(
      `/api/users/deleteemergencycontact/${emergencyId}`,
    );
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });
    dispatch({
      type: AddEmergencyContactModal,
      payload: false,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const registerActivity = (data, navigateUser) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post(`/api/users/createuseractivity`, data);
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });
    dispatch({
      type: AddEmergencyContactModal,
      payload: false,
    });
    navigateUser();
    setTimeout(() => {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }, 700);
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const checkinActivity = (navigation, userActivityId) => async (
  dispatch,
) => {
  try {
    setTimeout(async () => {
      await get(`/api/users/checkinactivity/${userActivityId}`);
      const user = await get('/api/users/getuserbyjwt');
      console.log(user.user_activities[1]);
      dispatch({
        type: SET_USER,
        payload: user,
      });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      navigation.goBack();
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const checkoutActivity = (navigation, userActivityId) => async (
  dispatch,
) => {
  try {
    setTimeout(async () => {
      await get(`/api/users/checkoutactivity/${userActivityId}`);
      const user = await get('/api/users/getuserbyjwt');

      dispatch({
        type: SET_USER,
        payload: user,
      });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      navigation.goBack();
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const useCoupon = (userActivityId, couponId, setUserActivity) => async (
  dispatch,
) => {
  try {
    setTimeout(async () => {
      const res = await post(`/api/users/usecoupon/${userActivityId}`, {
        couponId,
      });
      const user = await get('/api/users/getuserbyjwt');
      dispatch({
        type: SET_USER,
        payload: user,
      });
      if (res.status === 200) {
        setUserActivity(res.data);
      }
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};