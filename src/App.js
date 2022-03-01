import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';
import TVShows from './pages/TVShows';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TVShows />} />
        <Route path="movies" element={<Movies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
