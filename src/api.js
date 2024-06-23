import fetchData from './utils/fetchData';

const API_ENDPOINT = '/api';

/**
 * 해당 장르의 콘텐츠들을 가져온다.
 *
 * @param {'tv'|'movie'} variant
 * @param {string} genreID
 * @param {number} page
 * @returns {Promise<TVShows|Movies>}
 */
export async function getGenreContents(variant, genreID, page) {
  const url = `${API_ENDPOINT}/contents?variant=${variant}&genreID=${genreID}&page=${page}`;
  const response = await fetchData(url);
  return response;
}

/**
 * 콘텐츠의 비디오 링크를 가져온다.
 *
 * @param {'tv'|'movie'} variant
 * @param {string} contentID
 * @returns {Promise<Videos>}
 */
export async function getVideos(variant, contentID) {
  const url = `${API_ENDPOINT}/videos?variant=${variant}&contentID=${contentID}`;
  const response = await fetchData(url);
  return response;
}

/**
 * 콘텐츠의 상세 정보를 가져온다.
 *
 * @param {'tv'|'movie'} variant
 * @param {string} contentID
 * @returns {Promise<TVShowDetail|MovieDetail>}
 */
export async function getContentDetail(variant, contentID) {
  const url = `${API_ENDPOINT}/content?variant=${variant}&contentID=${contentID}`;
  const response = await fetchData(url);
  return response;
}
