import React, { useState } from 'react';

import * as authAPI from '../../../api/authAPI';

import { Spinner } from 'react-bootstrap';

import classes from './Login.module.scss';
import { useStoreActions } from 'easy-peasy';
import { Redirect } from 'react-router-dom';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setLoginToken = useStoreActions(actions => actions.auth.setLoginToken);

  const onLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    authAPI.login(username, password)
      .then((response) => {
        setLoginToken(response.data.token);
        setIsLoggedIn(true);
        setIsLoading(false);
        setErrorMessage('');
      })
      .catch(err => {
        setIsLoading(false);
        setErrorMessage('Wrong username or password. Please try again.');
      })
  }

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes['page-content']}>
      <div className={`${classes['login-card']} card`}>
        <div className="card-header">
          <div className={classes['card-header-text']}>Sign In</div>
        </div>
        <div className="card-body">
          <div style={{color: 'red', marginBottom: 5}}>{errorMessage}</div>
          <form onSubmit={(event) => onLogin(event)}>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                style={{fontSize: 22}}
                value={username}
                onChange={(event) => {setUsername(event.target.value)}}
              />
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                style={{fontSize: 22}}
                value={password}
                onChange={(event) => {setPassword(event.target.value)}}
              />
            </div>
            <div className={`${classes['remember-and-login-btn-container']}`}>
              <div>
                <label><input type="checkbox" /> Remember Me</label>
              </div>
              <div className="form-group">
                <button type="submit" className={classes['login-btn']} disabled={isLoading}>
                  {
                    isLoading ?
                    <Spinner animation="border" size="md" />
                    :
                    'Login'
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-center links">
            Don't have an account?<a href="/sign-up" className="ml-2 font-weight-bold">Sign Up</a>
          </div>
          <div className="d-flex justify-content-center">
            <a href="/" className="font-weight-bold">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;