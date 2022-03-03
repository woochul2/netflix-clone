import { useEffect, useState } from 'react';
import { getVideos } from '../api';
import useIsMounted from './useIsMounted';

/**
 * 콘텐츠의 비디오 링크를 가져와 유튜브 티저나 트레일러만 반환한다.
 *
 * @param {'tv'|'movie'} variant
 * @param {string} contentID
 * @returns {VideoResult[]}
 */
export function useVideos(variant, contentID) {
  const [videos, setVideos] = useState([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    getVideos(variant, contentID).then((videos) => {
      if (!isMounted()) return;

      const youtubeVideos = videos.results.filter(({ site, type }) => {
        const isYoutube = site === 'YouTube';
        const isTeaser = type === 'Teaser';
        const isTrailer = type === 'Trailer';
        return isYoutube && (isTeaser || isTrailer);
      });
      setVideos(youtubeVideos);
    });
  }, [variant, contentID, isMounted]);

  return videos;
}
