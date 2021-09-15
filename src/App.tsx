import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Route path={PATHS.TV}>
          <TvShows />
        </Route>
      </Switch>
    </Router>
  );
}
