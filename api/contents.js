const { API_ENDPOINT } = require('../server-utils/constants.js');
const getQueryParams = require('../server-utils/getQueryParams.js');
const responseToJson = require('../server-utils/responseToJson.js');
const fetchData = require('../server-utils/fetchData.js');

/**
 * @param {Request} request
 */
export async function GET(request) {
  const { variant, genreID, page } = getQueryParams(request);

  const baseURL = `${API_ENDPOINT}/discover/${variant}?api_key=${process.env.TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=${page}&with_genres=${genreID}`;
  const url =
    variant === 'tv'
      ? `${baseURL}&with_networks=213`
      : `${baseURL}&region=KR&with_watch_providers=8&watch_region=KR`;

  const response = await fetchData(url);
  return await responseToJson(response);
}
