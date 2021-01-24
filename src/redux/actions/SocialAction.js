import {io} from 'socket.io-client';
import axios from 'axios';
import {socialurl} from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';

/** socket configurations */
const socket = io(`${socialurl}`, {
  forceNew: true,
});

const createJWTTokenHeaders = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  let headers = '';
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return headers;
};

export const loadSocial = () => async (dispatch) => {
  socket.on('connection', () => console.log('Connection'));
};
