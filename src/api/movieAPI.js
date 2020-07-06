import axios from 'axios';

export const getAllMovies = () => {
  return axios.get('/Movies');
}

export const getAllNowOnMovies = () => {
  return axios.get('/Movies/GetAllMoviesNowOn');
}

export const getAllUpcomingMovies = () => {
  return axios.get('/Movies/GetAllMoviesComing?day=9999');
}

export const getMovieDetailById = (id) => {
  return axios.get(`Movies/${id}`);
}