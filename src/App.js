import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuthListener } from './hooks';
import * as PATHS from './constants/paths';
import { RedirectedRoute, PrivateRoute } from './helpers/routes';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Browse from './components/Browse';

export default function App() {
  const { user } = useAuthListener();
  const [email, setEmail] = useState('');

  return (
    <Router>
      <Switch>
        <RedirectedRoute
          user={user}
          redirectedPath={PATHS.BROWSE}
          path={PATHS.SIGN_IN}
        >
          <SignIn />
        </RedirectedRoute>
        <RedirectedRoute
          user={user}
          redirectedPath={PATHS.BROWSE}
          path={PATHS.SIGN_UP}
        >
          <SignUp email={email} />
        </RedirectedRoute>
        <RedirectedRoute
          user={user}
          redirectedPath={PATHS.BROWSE}
          path={PATHS.SIGN_UP}
        >
          <SignUp email={email} />
        </RedirectedRoute>
        <PrivateRoute user={user} path={PATHS.BROWSE}>
          <Browse />
        </PrivateRoute>
        <RedirectedRoute
          user={user}
          redirectedPath={PATHS.BROWSE}
          path={PATHS.HOME}
        >
          <Home email={email} setEmail={setEmail} />
        </RedirectedRoute>
      </Switch>
    </Router>
  );
}
