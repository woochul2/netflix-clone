import axios from 'axios';
import { useEffect, useState } from 'react';

const getTvVideosLink = (id: number): string => {
  return `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko`;
};

export function useTvVideos(id: number): TvVideos.RootObject | undefined {
  const [tvVideos, setTvVideos] = useState<TvVideos.RootObject>();

  useEffect(() => {
    (async function () {
      const link = getTvVideosLink(id);
      const response = await axios.get<TvVideos.RootObject>(link);
      setTvVideos(response.data);
    })();
  }, [id]);

  return tvVideos;
}
