import { Route, Routes } from 'react-router-dom';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';
import TVShows from './pages/TVShows';
import { URLS } from './constants';

function App() {
  return (
    <Routes>
      <Route path={URLS.home} element={<TVShows />}>
        <Route path="tv/:id" element={<></>} />
      </Route>
      <Route path={URLS.movie} element={<Movies />}>
        <Route path=":id" element={<></>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
