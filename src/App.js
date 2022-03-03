import { Route, Routes } from 'react-router-dom';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';
import TVShows from './pages/TVShows';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TVShows />}>
        <Route path="tv/:id" element={<></>} />
      </Route>
      <Route path="movie" element={<Movies />}>
        <Route path=":id" element={<></>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
