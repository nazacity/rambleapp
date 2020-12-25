import {
  SET_FILTERED_USER_POST,
  SET_USER_POST_BY_ACTIVITY,
  SET_LOADING,
} from '../types';
import {post, get, Delete} from './request';

export const setFilteredUserPosts = (filtered_user_posts) => async (
  dispatch,
) => {
  dispatch({
    type: SET_FILTERED_USER_POST,
    payload: filtered_user_posts,
  });
};

export const listUserPostsByActivity = (id, navigateUser) => async (
  dispatch,
) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const res = await get(`/api/users/userpostsbyactivity?activity=${id}`);
    if (res.status === 200) {
      dispatch({
        type: SET_USER_POST_BY_ACTIVITY,
        payload: res.data,
      });
      navigateUser();
    }
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
