import fetchData from './utils/fetchData';

const API_ENDPOINT = 'https://api.themoviedb.org/3/discover';

/**
 * 해당 장르의 콘텐츠들을 가져온다.
 *
 * @param {'tv'|'movie'} variant
 * @param {string} genreID
 * @param {number} page
 * @returns {Promise<TVShows|Movies>}
 */
export async function getGenreContents(variant, genreID, page) {
  const baseURL = `${API_ENDPOINT}/${variant}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=${page}&with_genres=${genreID}`;
  const url =
    variant === 'tv'
      ? `${baseURL}&with_networks=213`
      : `${baseURL}&region=KR&with_watch_providers=8&watch_region=KR`;
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
  const url = `https://api.themoviedb.org/3/${variant}/${contentID}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko`;
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
  const url = `https://api.themoviedb.org/3/${variant}/${contentID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko`;
  const response = await fetchData(url);
  if (response.success === false) {
    const error = `status code: ${response.status_code}. ${response.status_message}`;
    throw new Error(error);
  }
  return response;
}
