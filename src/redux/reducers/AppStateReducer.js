import {
  setEnLng,
  setThLng,
  isSignIn,
  SET_LOADING,
  SET_SNACKBAR_DISPLAY,
  SET_SNACKBAR_DISMISS,
  AddAddressModal,
  AddEmergencyContactModal,
} from '../types';

const initialState = {
  isSignedIn: false,
  lang: 'en',
  isLoading: true,
  snackbar: {
    display: false,
    state: 'success',
    message: 'Ramble',
  },
  addAddressModal: false,
  addEmergencyContactModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case setEnLng:
      return {...state, lang: 'en'};
    case setThLng:
      return {...state, lang: 'th'};
    case isSignIn:
      return {...state, isSignedIn: action.payload};
    case SET_LOADING:
      return {...state, isLoading: action.payload};
    case SET_SNACKBAR_DISPLAY:
      return {
        ...state,
        snackbar: {
          display: true,
          state: action.payload.state,
          message: action.payload.message,
        },
      };
    case SET_SNACKBAR_DISMISS:
      return {...state, snackbar: {...state.snackbar, display: false}};
    case AddAddressModal:
      return {...state, addAddressModal: action.payload};
    case AddEmergencyContactModal:
      return {...state, addEmergencyContactModal: action.payload};
    default:
      return state;
  }
};
