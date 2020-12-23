import {SET_USER, CLEAR_USER} from '../types';

const initialState = {
  id: '1',
  first_name: 'John',
  last_name: 'Doe',
  display_name: 'Minimal',
  birth_day: new Date('1992-11-10'),
  age: 28,
  gender: 'male',
  blood_type: 'O',
  id_card_no: '1103700943955',
  phone_number: '0881493995',
  picture_url:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjv0D0QABobqwiqLPA8_DyjI7O72SXTIjsUw&amp;usqp=CAU',
  state: 'open',
  user_activities: [],
  emergency_contact: [
    {name: 'สมชาย', phone_number: '0894121234', relation: 'บิดา'},
  ],
  user_posts: [],
  user_recode: {
    activity_number: 10,
    distance: 70,
    time_hr: 48,
    time_min: 56,
    speed_average: 8.57,
  },
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
