import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, SignIn } from './pages';
import * as ROUTES from './constants/routes';

export default function App() {
  return (
    <Router>
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
      <Route exact path={ROUTES.Sign_In}>
        <SignIn />
      </Route>
    </Router>
  );
}
