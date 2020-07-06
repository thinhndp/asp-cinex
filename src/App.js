import React, { useEffect } from 'react';
import axios from 'axios';

import * as authAPI from './api/authAPI';
import { StoreProvider } from 'easy-peasy';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';

import Layout from './layout/Layout';
import ScrollIntoView from './utils/ScrollIntoView';

import './styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-aspect-ratio/aspect-ratio.css';
import 'react-image-lightbox/style.css';

axios.defaults.baseURL = 'http://localhost:8585/api';

function App() {
  // const setToken = useStoreActions(actions => actions.auth.setToken);
  // const setToken = store.getActions().auth.setToken;

  useEffect(() => {
    checkTokenLoggedIn();
  }, []);

  const checkTokenLoggedIn = () => {
    const tokenStr = localStorage.getItem('token');
    if (tokenStr) {
      authAPI.checkToken(tokenStr)
        .then(response => {
          if (response.data.isValid === true) {
            // TODO: Find out if this is the right way to dispatch action in App.js
            store.getActions().auth.setLoginToken(tokenStr);

            // // Attach Token to request header
            // axios.interceptors.request.use(function (config) {
            //   config.headers.Authorization = tokenStr;
            //   return config;
            // });
          } else {
            store.getActions().auth.removeLoginToken();
          }
        })
        .catch(err => {
          store.getActions().auth.removeLoginToken();
        })
    } else {
      store.getActions().auth.removeLoginToken();
    }
  }

  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <ScrollIntoView>
          <Layout></Layout>
        </ScrollIntoView>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
