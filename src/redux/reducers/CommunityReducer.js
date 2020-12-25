import {SET_FILTERED_USER_POST, SET_USER_POST_BY_ACTIVITY} from '../types';

const initialState = {
  user_post_by_activity: [],
  filtered_user_posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERED_USER_POST:
      return {...state, filtered_user_posts: action.payload};
    case SET_USER_POST_BY_ACTIVITY:
      return {...state, user_post_by_activity: action.payload};
    default:
      return state;
  }
};
