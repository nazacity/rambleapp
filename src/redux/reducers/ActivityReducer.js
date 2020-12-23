import {
  SET_ACTIVITY,
  SET_UPCOMING_ACTIVITIES,
  SET_HISTORY_ACTIVITIES,
} from '../types';

const initialState = {
  activity: {
    __v: 0,
    _id: '',
    activity_picture_url: '',
    actual_date: '',
    condition: [],
    coupons: [],
    courses: [],
    description: '',
    gifts: [],
    location: {
      lat: 16.4680574,
      lng: 102.8278654,
      place_name: '',
      province: '',
      region: '',
    },
    more_detail: [],
    partner: '',
    register_end_date: '',
    register_start_date: '',
    report_infomation: {
      age_20: 0,
      age_20_30: 0,
      age_30_40: 0,
      age_40_50: 0,
      age_50: 0,
      participant_female_number: 0,
      participant_male_number: 0,
      participant_number: 0,
      revenue: 0,
      revenue_after_cutting: 0,
    },
    rules: [],
    rules1: [],
    shirt_detail: [],
    size: [],
    state: '',
    sub_title: '',
    timeline: [],
    title: '',
    user_activities: [],
  },
  upcoming_activities: [],
  history_activities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITY:
      return {...state, activity: action.payload};
    case SET_UPCOMING_ACTIVITIES:
      return {...state, upcoming_activities: action.payload};
    case SET_HISTORY_ACTIVITIES:
      return {
        ...state,
        history_activities: action.payload,
      };
    default:
      return state;
  }
};
