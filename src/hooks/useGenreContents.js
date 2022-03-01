import { useEffect, useState } from 'react';
import { getGenreContents } from '../api';

/**
 * 해당 장르의 콘텐츠들을 불러온 후 가공하여 반환한다.
 *
 * @param {'tv'|'movie'} variant
 * @param {string} id
 * @param {number} pageCount
 * @returns {TVShowResult[]|MovieResult[]}
 */
function useGenreContents(variant, id, pageCount) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const setFilteredContents = async () => {
      const filteredContents = [];

      for (let i = 1; i <= pageCount; i++) {
        const response = await getGenreContents(variant, id, i);
        const results = response.results.filter(
          ({ genre_ids }) => genre_ids[0] === id
        );
        filteredContents.push(...results);
      }

      setContents(filteredContents);
    };

    setFilteredContents();
  }, [variant, id, pageCount]);

  return contents;
}

export default useGenreContents;
