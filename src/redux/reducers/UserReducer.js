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

const test = {
  __v: 0,
  _id: '60226b12f1e0b83978ea0e1a',
  activity: {
    course: {
      _id: '601ca0f99edaa0f97a3db789',
      course_picture_url:
        'https://ev.runlah.com/api/1/images/st-I6VpAIE-Xvp-_iUTyf5Cd.jpg?size=xl',
      price: 690,
      range: 5,
      title: '5โล',
    },
    id: {
      _id: '601ca0f99edaa0f97a3db786',
      activity_picture_url:
        'https://firebasestorage.googleapis.com/v0/b/ramble-73f09.appspot.com/o/banner-01.png?alt=media',
      actual_date: '2021-03-01T01:05:00.000Z',
      state: 'registering',
      title: 'เชียงใหม่ ม่วนใจ๋',
    },
  },
  address: '601fbead5c160a65fcebfe04',
  announcement: [
    {
      _id: '6027c847aa15bfd44f844314',
      active: true,
      createdAt: '2021-02-13T12:38:31.689Z',
      description: 'ทดสอบข้อความ',
      picture_url: '',
      state: 'read',
      title: 'third post',
    },
    {
      _id: '6031d65fda98250f625f00e5',
      active: true,
      createdAt: '2021-02-21T03:41:19.974Z',
      description: 'Testtt',
      picture_url: '',
      state: 'read',
      title: 'Test',
    },
    {
      _id: '6031d660da98250f625f00ea',
      active: true,
      createdAt: '2021-02-21T03:41:20.316Z',
      description: 'Testtt',
      picture_url: '',
      state: 'not_read',
      title: 'Test',
    },
    {
      _id: '6031d675da98250f625f00f1',
      active: true,
      createdAt: '2021-02-21T03:41:41.469Z',
      description: 'Seasd',
      picture_url: '',
      state: 'not_read',
      title: 'Assas',
    },
    {
      _id: '6031d6d9da98250f625f0102',
      active: true,
      createdAt: '2021-02-21T03:43:21.170Z',
      description:
        'ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop pu',
      picture_url: '',
      state: 'read',
      title: 'Tesr',
    },
  ],
  contest_no: '',
  coupons: [],
  createdAt: '2021-02-09T10:59:30.936Z',
  emergency_contact: '601fbf135c160a65fcebfe05',
  idcard: '1103700943851',
  printed: true,
  size: {description: 'ช.รอบอก 40" ญ.รอบอก 36"', id: '2', size: 'M'},
  state: 'upcoming',
  transaction: [
    {
      _id: '6025db04a4a0527858d00659',
      amount: 770,
      id: '202102129VNoNQoKGtuYB7T',
      payDate: '2021-02-12T01:33:53.000Z',
      sendingBank: '014',
    },
  ],
  updatedAt: '2021-02-21T03:43:29.423Z',
  user: '5ff9c31c70d26b7b975ff086',
  user_record: {
    average: 0,
    distance: 0,
    time_hr: 0,
    time_min: 0,
    time_second: 0,
  },
};
