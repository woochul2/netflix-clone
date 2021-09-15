import mockTvDetail from '../mock/mock-tv-detail.json';
import mockTvShows from '../mock/mock-tv-shows.json';
import mockVideos from '../mock/mock-videos.json';
import mockMovieDetail from '../mock/mock-movie-detail.json';
import mockMovies from '../mock/mock-movies.json';

function isFirstGenre(result: TvShows.Result | Movies.Result, genreId: number): boolean {
  return result.genre_ids[0] === genreId;
}

export const getMockTvShows = (genreId: number): TvShows.Result[] => {
  return mockTvShows.results.filter((result) => isFirstGenre(result, genreId));
};

export const getMockMovies = (genreId: number): Movies.Result[] => {
  return mockMovies.results.filter((result) => isFirstGenre(result, genreId));
};

export const getMockTvDetail = (): TvDetail.RootObject => mockTvDetail;

export const getMovieDetail = (): MovieDetail.RootObject => mockMovieDetail;

export const getMockVideos = (): Videos.RootObject => mockVideos;
