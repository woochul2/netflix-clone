import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuthListener } from './hooks';
import * as PATHS from './constants/paths';
import { RedirectedRoute, PrivateRoute } from './helpers/routes';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Browse from './components/Browse';
import NotFound from './components/NotFound';

export default function App() {
  const { user } = useAuthListener();
  const [email, setEmail] = useState('');

  return (
    <Router>
      <Switch>
        <RedirectedRoute
          user={user}
          redirectedPath={PATHS.BROWSE}
          exact
          path={PATHS.HOME}
        >
          <Home email={email} setEmail={setEmail} />
        </RedirectedRoute>
        <RedirectedRoute
          user={user}
          redirectedPath={PATHS.BROWSE}
          exact
          path={PATHS.SIGN_IN}
        >
          <SignIn />
        </RedirectedRoute>
        <RedirectedRoute
          user={user}
          redirectedPath={PATHS.BROWSE}
          exact
          path={PATHS.SIGN_UP}
        >
          <SignUp email={email} />
        </RedirectedRoute>
        <PrivateRoute user={user} exact path={PATHS.BROWSE}>
          <Browse />
        </PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
