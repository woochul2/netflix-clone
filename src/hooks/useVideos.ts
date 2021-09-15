import axios from 'axios';
import { useEffect, useState } from 'react';

type VariantType = 'tv' | 'movie';

const getVideosLink = (variant: VariantType, id: number): string => {
  return `https://api.themoviedb.org/3/${variant}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko`;
};

export function useVideos(variant: VariantType, id: number): Videos.RootObject | undefined {
  const [videos, setVideos] = useState<Videos.RootObject>();

  useEffect(() => {
    (async function () {
      const link = getVideosLink(variant, id);
      const response = await axios.get<Videos.RootObject>(link);
      setVideos(response.data);
    })();
  }, [variant, id]);

  return videos;
}
