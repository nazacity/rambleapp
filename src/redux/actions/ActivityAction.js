import {
  SET_ACTIVITY,
  SET_UPCOMING_ACTIVITIES,
  SET_HISTORY_ACTIVITIES,
} from '../types';
import {post, get, Delete} from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getActivityById = (
  id,
  setLoading,
  checkUserActivities,
  state,
) => async (dispatch) => {
  try {
    const res = await get(`/api/users/getactivity/${id}`);

    if (res.status === 200) {
      dispatch({
        type: SET_ACTIVITY,
        payload: res.data,
      });
    }
    checkUserActivities(state);

    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const setUpcomeActivities = (upcomingactivities) => (dispatch) => {
  dispatch({
    type: SET_UPCOMING_ACTIVITIES,
    payload: upcomingactivities,
  });
};

export const setHisActivities = (historyactivities) => (dispatch) => {
  dispatch({
    type: SET_HISTORY_ACTIVITIES,
    payload: historyactivities,
  });
};
