import Browse from '../components/Browse';
import movieGenres from '../fixtures/movie-genres.json';

function Movies() {
  return <Browse variant="movie" genres={movieGenres} />;
}

export default Movies;
