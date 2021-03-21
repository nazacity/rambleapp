import {
  SET_USER,
  CLEAR_USER,
  isSignIn,
  SET_LOADING,
  AddAddressModal,
  AddEmergencyContactModal,
  SET_UPCOMING_ACTIVITES,
  SET_SNACKBAR_DISPLAY,
} from '../types';
import {post, get, Delete, postSocial} from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

export const changePasssword = (
  data,
  t,
  handleClose,
  setErrorMessage,
) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post('/api/users/changepassworduser', data);

    if (res.status === 200) {
      if (res.data === 'Password is incorrect') {
        setErrorMessage(t('editprofile.oldpasswordisincorrect'));

        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      } else {
        const user = await get('/api/users/getuserbyjwt');
        dispatch({
          type: SET_USER,
          payload: user,
        });
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_SNACKBAR_DISPLAY,
          payload: {
            state: 'success',
            message: t('editprofile.changepasswordsuccess'),
          },
        });

        handleClose();
      }
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const editUserProfile = (data, msg) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post('/api/users/edituser', data);

    if (data.type === 'display_name') {
      const resSocial = await postSocial('/api/users/edituser', data);
    }

    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    dispatch({
      type: SET_SNACKBAR_DISPLAY,
      payload: {
        state: 'success',
        message: msg,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const refresh = () => async (dispatch) => {
  try {
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });
  } catch (error) {
    console.log(error);
  }
};

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

export const setUser = (user) => async (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const signOut = (navigation) => async (dispatch) => {
  SplashScreen.show();
  await AsyncStorage.removeItem('accessToken');
  dispatch({
    type: CLEAR_USER,
  });
  dispatch({
    type: isSignIn,
    payload: false,
  });
};

export const addNewAddress = (data, t) => async (dispatch) => {
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
    dispatch({
      type: SET_SNACKBAR_DISPLAY,
      payload: {
        state: 'success',
        message: t('addaddress.success'),
      },
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

export const editAddress = (id, data, handleClose, t) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post(`/api/users/editaddress/${id}`, data);
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
    dispatch({
      type: SET_SNACKBAR_DISPLAY,
      payload: {
        state: 'success',
        message: t('addaddress.editsuccess'),
      },
    });
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const addNewEmergencyContact = (data, t) => async (dispatch) => {
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
    dispatch({
      type: SET_SNACKBAR_DISPLAY,
      payload: {
        state: 'success',
        message: t('addemergencycontact.success'),
      },
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

export const editEmergencyContact = (id, data, handleClose, t) => async (
  dispatch,
) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post(`/api/users/editemergencycontact/${id}`, data);
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
    dispatch({
      type: SET_SNACKBAR_DISPLAY,
      payload: {
        state: 'success',
        message: t('addemergencycontact.editsuccess'),
      },
    });
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const registerActivity = (data, navigateUser, t) => async (dispatch) => {
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
    navigateUser(res.id);
    dispatch({
      type: SET_SNACKBAR_DISPLAY,
      payload: {
        state: 'success',
        message: t('activity.registersuccessed'),
      },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }, 200);
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const checkinActivity = (
  navigation,
  userActivityId,
  refreshCheckIn,
) => async (dispatch) => {
  try {
    await get(`/api/users/checkinactivity/${userActivityId}`);
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
  } catch (error) {
    console.log(error);
    refreshCheckIn();
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

export const checkoutActivity = (
  navigation,
  userActivityId,
  refreshCheckOut,
) => async (dispatch) => {
  try {
    await post(`/api/users/checkoutactivity/${userActivityId}`, {});
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
  } catch (error) {
    console.log(error);
    refreshCheckOut();
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
    const res = await post(`/api/users/usecoupon/${userActivityId}`, {
      couponId,
    });
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });
    // if (res.status === 200) {
    //   setUserActivity(res.data);
    // }
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

export const createUserPost = (data, navigateUser) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post(`/api/users/createuserpost`, data);
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });

    navigateUser();
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

export const editUserPost = (id, data, navigateUser, t) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post(`/api/users/edituserpost/${id}`, data);
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });
    dispatch({
      type: SET_SNACKBAR_DISPLAY,
      payload: {
        state: 'success',
        message: t('createpost.editsuccessed'),
      },
    });

    navigateUser();
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

export const changeUserPostState = (id, data, t) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await post(`/api/users/changeuserpoststate/${id}`, data);
    const user = await get('/api/users/getuserbyjwt');
    dispatch({
      type: SET_USER,
      payload: user,
    });

    dispatch({
      type: SET_SNACKBAR_DISPLAY,
      payload: {
        state: data.state === 'closed' ? 'error' : 'success',
        message:
          data.state === 'closed'
            ? t('createpost.closepost')
            : t('createpost.openpost'),
      },
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
