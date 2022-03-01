import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<TVShows />} />
        <Route path="movies" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
