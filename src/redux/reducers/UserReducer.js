import {SET_USER, CLEAR_USER} from '../types';

const initialState = {
  first_name: '',
  last_name: '',
  display_name: '',
  birth_day: new Date(),
  age: 0,
  gender: '',
  blood_type: '',
  id_card_no: '',
  phone_number: '',
  picture_url: '',
  user_activities: [],
  emergency_contact: [],
  user_posts: [],
  user_recodes: [],
  user_state: 'open',
  upcoming_activities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, ...action.payload};
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
