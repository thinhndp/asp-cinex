import axios from 'axios';

export const getAllScreenTypes = () => {
  return axios.get('/screen-types');
}