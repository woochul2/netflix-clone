import mockTvDetail from '../mock/mock-tv-detail.json';
import mockTvShows from '../mock/mock-tv-shows.json';
import mockTvVideos from '../mock/mock-tv-videos.json';

export const getMockTvShows = (genreId: number): TvShows.Result[] => {
  return mockTvShows.results.filter((result) => result.genre_ids[0] === genreId);
};

export const getMockTvDetail = (): TvDetail.RootObject => mockTvDetail;

export const getMockTvVideos = (): TvVideos.RootObject => mockTvVideos;
