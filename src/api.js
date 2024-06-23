import fetchData from './utils/fetchData';

const API_ENDPOINT = '/api';

function queryParamsToString(queryParams) {
  return Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join('&');
}

function buildURL(pathname, queryParams) {
  return `${API_ENDPOINT}/${pathname}/?${queryParamsToString(queryParams)}`;
}

/**
 * 해당 장르의 콘텐츠들을 가져온다.
 *
 * @param {'tv'|'movie'} variant
 * @param {string} genreID
 * @param {number} page
 * @returns {Promise<TVShows|Movies>}
 */
export async function getGenreContents(variant, genreID, page) {
  const url = buildURL('contents', { variant, genreID, page });
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
  const url = buildURL('videos', { variant, contentID });
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
  const url = buildURL('content', { variant, contentID });
  const response = await fetchData(url);
  return response;
}
