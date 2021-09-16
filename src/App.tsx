import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PATHS } from './constants';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={PATHS.MOVIES}>
          <Movies />
        </Route>
        <Route exact path={PATHS.TV_SHOWS}>
          <TvShows />
        </Route>
        <Redirect to={PATHS.TV_SHOWS} />
      </Switch>
    </Router>
  );
}
