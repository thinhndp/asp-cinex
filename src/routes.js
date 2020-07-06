// import React from 'react';

import Home from './layout/pages/Home/Home';
import MovieTicket from './layout/pages/MovieTicket/MovieTicket';
import User from './layout/pages/User';
import Movie from './layout/pages/Movie/Movie';
import Schedule from './layout/pages/Schedule/Schedule';
import Login from './layout/pages/Login/Login';
import SignUp from './layout/pages/SignUp/SignUp';

export const routes = [
  {
    path: '/movie/:id',
    component: Movie
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/schedule',
    component: Schedule
  },
  {
    path: '/movie-ticket/:id',
    component: MovieTicket
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/sign-up',
    component: SignUp
  },
  {
    path: '/',
    component: Home
  },
];