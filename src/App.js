import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, SignIn, SignUp } from './pages';
import * as ROUTES from './constants/routes';

export default function App() {
  return (
    <Router>
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
      <Route exact path={ROUTES.SIGN_IN}>
        <SignIn />
      </Route>
      <Route exact path={ROUTES.SIGN_UP}>
        <SignUp />
      </Route>
    </Router>
  );
}
