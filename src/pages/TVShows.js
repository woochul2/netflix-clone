import Browse from '../components/Browse';
import tvGenres from '../fixtures/tv-genres.json';

function TVShows() {
  return <Browse variant="tv" genres={tvGenres} />;
}

export default TVShows;
