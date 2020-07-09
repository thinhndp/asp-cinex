import axios from 'axios';

export const login = (username, password) => {
  return axios.post('/login', {username, password});
}

export const signUp = (email, username, password) => {
  return axios.post('/users/register', { email, username, password, fullName: 'Tran Anh Dung' });
}

export const checkToken = (token) => {
  return axios.post('/check-token', { token });
}