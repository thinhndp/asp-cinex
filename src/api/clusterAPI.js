import axios from 'axios';

export const getAllClusters = () => {
  return axios.get('/clusters');
}