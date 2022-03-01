import { useEffect, useState } from 'react';
import { getVideos } from '../api';

/**
 * 콘텐츠의 비디오 링크를 가져와 유튜브 티저나 트레일러만 반환한다.
 *
 * @param {'tv'|'movie'} variant
 * @param {string} contentID
 * @returns {VideoResult[]}
 */
export function useVideos(variant, contentID) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos(variant, contentID).then((videos) => {
      const youtubeVideos = videos.results.filter(({ site, type }) => {
        const isYoutube = site === 'YouTube';
        const isTeaser = type === 'Teaser';
        const isTrailer = type === 'Trailer';
        return isYoutube && (isTeaser || isTrailer);
      });
      setVideos(youtubeVideos);
    });
  }, [variant, contentID]);

  return videos;
}
