import React from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import classes from './MyNavbar.module.scss';

function MyNavbar() {
  const authState = useStoreState(state => state.auth.authState);
  const removeLoginToken = useStoreActions(actions => actions.auth.removeLoginToken);

  var history = useHistory();

  const onLogoClick = () => {
    history.push('/');
  }

  const onScheduleClick = () => {
    history.push('/schedule');
  }

  const onLogoutClick = () => {
    removeLoginToken();
    window.location.reload();
  }

  return (
    <div className={classes['navbar']}>
      <Container className={classes['navbar-inner-container']}>
        <div
          className={classes['navbar-brand']}
          onClick={onLogoClick}
        >
          <img src="https://i.imgur.com/xiNxSJa.png" alt="Cinex" className={classes['navbar-brand-img']} />
          <span>Cinex</span>
        </div>
        <div className={classes['navbar-right']}>
          <div
            className={classes['nav-item']}
            onClick={onScheduleClick}
          >Schedule</div>

          <Dropdown>
            <Dropdown.Toggle as={TestComponent} id="dropdown-basic">
            </Dropdown.Toggle>

            {
              authState.isLoggedIn === false ?
              <>
                <Dropdown.Menu>
                  <Dropdown.Item href="/login">Login</Dropdown.Item>
                </Dropdown.Menu>
              </>
              :
              <>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => onLogoutClick()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </>
            }
          </Dropdown>
        </div>
      </Container>
    </div>
  );
}

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const TestComponent = React.forwardRef(({ children, onClick }, ref) => (
  <img
    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    alt="Profile"
    className={classes['profile']}
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  />
))

export default MyNavbar;