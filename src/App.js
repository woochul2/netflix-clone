import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Browse from './components/Browse';
import * as ROUTES from './constants/routes';

export default function App() {
  const [email, setEmail] = useState('');

  return (
    <Router>
      <Route exact path={ROUTES.HOME}>
        <Home email={email} setEmail={setEmail} />
      </Route>
      <Route exact path={ROUTES.SIGN_IN}>
        <SignIn />
      </Route>
      <Route exact path={ROUTES.SIGN_UP}>
        <SignUp email={email} />
      </Route>
      <Route exact path={ROUTES.BROWSE}>
        <Browse />
      </Route>
    </Router>
  );
}
