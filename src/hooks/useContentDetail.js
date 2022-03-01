import { useEffect, useState } from 'react';
import { getContentDetail } from '../api';

/**
 * 콘텐츠의 상세 정보를 가져온다.
 *
 * @param {'tv'|'movie'} variant
 * @param {string} contentID
 * @returns {TVShowDetail|MovieDetail}
 */
function useContentDetail(variant, contentID) {
  const [contentDetail, setContentDetail] = useState(null);

  useEffect(() => {
    getContentDetail(variant, contentID).then((detail) => {
      setContentDetail(detail);
    });
  }, [variant, contentID]);

  return contentDetail;
}

export default useContentDetail;
