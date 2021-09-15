import Browse from '../../components/Browse';
import movieGenres from './movie-genres.json';

export default function Movies() {
  return <Browse variant="movie" genres={movieGenres} />;
}
