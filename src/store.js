import { createStore, action } from 'easy-peasy';
import axios from 'axios';
import { mockMovies, mockUpcomingMovies, mockNowOnMovies, 
  mockScreenTypes, mockShowtimes } from './mock-data';

export const store = createStore({
  // todos: {
  //   items: ['Create store', 'Wrap application', 'Use store'],
  //   add: action((state, payload) => {
  //     state.items.push(payload)
  //   })
  // },
  auth: {
    authState: {
      tokenStr: '',
      isLoggedIn: false,
    },
    setLoginToken: action((state, payload) => {
      // Login
      state.authState.tokenStr = payload;
      state.authState.isLoggedIn = true;
      localStorage.setItem('token', payload);
      
      // Attach Token to request header
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = 'Bearer ' + payload;
        return config;
      });
    }),
    removeLoginToken: action((state, payload) => {
      // Logout
      state.authState.tokenStr = '';
      state.authState.isLoggedIn = false;
      localStorage.removeItem('token');
    })
  },
  movies: {
    items: mockMovies,
    getMovies: action(()=>{})
  },
  nowOnMovies: {
    items: mockNowOnMovies,
    // items: [],
    getNowOnMovies: action(()=>{})
  },
  upcomingMovies: {
    items: mockUpcomingMovies,
    // items: [],
    getUpcomingMovies: action(()=>{})
  },
  // rates: {
  //   items: mockRates,
  //   getRates: action(()=>{})
  // },
  screenTypes: {
    items: mockScreenTypes,
    // items: [],
    getScreenTypes: action(()=>{})
  },
  showtimes: {
    items: mockShowtimes,
    // items: [],
    getShowtimes: action(()=>{})
  }
});