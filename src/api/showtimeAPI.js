import axios from 'axios';

export const getAllShowtimes = () => {
  return axios.get('/showtimes');
}

export const getShowtimeDetailById = (id) => {
  return axios.get(`showtimes/${id}`);
}

export const getShowtimesByMovieAndCluster = (movieId, clusterId) => {
  return axios.get(`showtimes?cluster=${clusterId}&movie=${movieId}`); // TODO: cluster
}

export const getShowtimesByClusterId = (clusterId) => {
  return axios.get(`showtimes?cluster=${clusterId}`); // TODO: cluster
}