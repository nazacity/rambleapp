import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const url = 'https://api.ramble-club.com';
// export const socialurl = 'https://social.ramble-club.com';

const url = 'http://192.168.1.181:5000';
export const socialurl = 'http://192.168.1.181:5100';

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

export const get = async (path) => {
  const headers = await createJWTTokenHeaders();
  const res = await axios.get(`${url}${path}`, {headers});
  return res.data;
};

export const post = async (path, body) => {
  const headers = await createJWTTokenHeaders();
  const res = await axios.post(`${url}${path}`, body, {headers});
  return res.data;
};

export const Delete = async (path) => {
  const headers = await createJWTTokenHeaders();
  const res = await axios.delete(`${url}${path}`, {headers});
  return res.data;
};

export const everyGet = async (path) => {
  const res = await axios.get(`${url}${path}`);
  return res.data;
};

export const everyPost = async (path, body, headers) => {
  const res = await axios.post(`${url}${path}`, body, headers);
  return res.data;
};

export const getSocial = async (path) => {
  const headers = await createJWTTokenHeaders();
  const res = await axios.get(`${socialurl}${path}`, {headers});
  return res.data;
};

export const postSocial = async (path, body) => {
  const headers = await createJWTTokenHeaders();
  const res = await axios.post(`${socialurl}${path}`, body, {headers});
  return res.data;
};

export const deleteSocial = async (path) => {
  const headers = await createJWTTokenHeaders();
  const res = await axios.delete(`${socialurl}${path}`, {headers});
  return res.data;
};
