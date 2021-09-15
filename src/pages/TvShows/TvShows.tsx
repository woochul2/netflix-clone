import Browse from '../../components/Browse';
import tvGenres from './tv-genres.json';

export default function TvShows() {
  return <Browse variant="tv" genres={tvGenres} />;
}
