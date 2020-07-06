import React from 'react';
import { routes } from '../routes';
import MyNavbar from './components/MyNavbar/MyNavbar';
import {
  Switch,
  Route,
} from 'react-router-dom';

function Layout() {
  const renderRouter = () => {
    return routes.map(route => (
      <Route path={route.path} key={route.path} exact component={route.component}>
      </Route>
    ));
  }

  return (
    <div>
      <MyNavbar></MyNavbar>
      <div style={{paddingBottom: 0}}>
        <Switch>
          { renderRouter() }
        </Switch>
      </div>
    </div>
  )
}

export default Layout;
