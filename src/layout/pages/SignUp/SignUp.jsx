import React, { useState } from 'react';

import * as authAPI from '../../../api/authAPI';

import classes from './SignUp.module.scss';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onSignUp = (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      // TODO: Display error
      console.log('Passwords does not match.');
      return;
    }

    authAPI.signUp(email, username, password)
      .then((response) => {
        console.log(response);
        window.location.href = '/login';
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className={classes['page-content']}>
      <div className={`${classes['signUp-card']} card`}>
        <div className="card-header">
          <div className={classes['card-header-text']}>Sign Up</div>
        </div>
        <div className="card-body">
          <form onSubmit={(event) => onSignUp(event)}>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                style={{fontSize: 22}}
                value={email}
                onChange={(event) => {setEmail(event.target.value)}}
              />
            </div>
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
            <div className="row">
              <div className="col-6">
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
              </div>
              <div className="col-6">
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Repeat Password"
                    style={{fontSize: 22}}
                    value={repeatPassword}
                    onChange={(event) => {setRepeatPassword(event.target.value)}}
                  />
                </div>
              </div>
            </div>
            {/* <div className="input-group form-group">
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
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Repeat Password"
                style={{fontSize: 22}}
                value={repeatPassword}
                onChange={(event) => {setRepeatPassword(event.target.value)}}
              />
            </div> */}
            <div className={`${classes['remember-and-signUp-btn-container']}`}>
              <div className="form-group">
                <input type="submit" value="Sign Up" className={classes['signUp-btn']} />
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-center links">
            <a href="/login" className="font-weight-bold">Go to login.</a>
          </div>
          <div className="d-flex justify-content-center">
            <a href="/" className="font-weight-bold">Forgot your password?</a> {/** TODO: API */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;