import axios from 'axios';

export const login = (username, password) => {
  return axios.post('/login', {username, password});
}

export const signUp = (email, username, password) => {
  return axios.post('/register', { email, username, password });
}

export const checkToken = (tokenStr) => {
  return axios.post('/check-token', { tokenStr });
}