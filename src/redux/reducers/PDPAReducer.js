import {SET_PDPA_MODAL} from '../types';

const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PDPA_MODAL:
      return action.payload;
    default:
      return state;
  }
};
