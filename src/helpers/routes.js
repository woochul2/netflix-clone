import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as PAHTS from '../constants/paths';

export function RedirectedRoute({ user, redirectedPath, path, children }) {
  return (
    <Route
      path={path}
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          return <Redirect to={{ pathname: redirectedPath }} />;
        }

        return null;
      }}
    />
  );
}

export function PrivateRoute({ user, path, children }) {
  return (
    <Route
      path={path}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{ pathname: PAHTS.HOME, state: { from: location } }}
            />
          );
        }

        return null;
      }}
    />
  );
}
