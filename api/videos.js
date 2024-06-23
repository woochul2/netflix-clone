const { API_ENDPOINT } = require('../server-utils/constants.js');
const getQueryParams = require('../server-utils/getQueryParams.js');
const responseToJson = require('../server-utils/responseToJson.js');
const fetchData = require('../server-utils/fetchData.js');

/**
 * @param {Request} request
 */
export async function GET(request) {
  const { variant, contentID } = getQueryParams(request);

  const url = `${API_ENDPOINT}/${variant}/${contentID}/videos?api_key=${process.env.TMDB_API_KEY}&language=ko`;
  const response = await fetchData(url);
  return await responseToJson(response);
}
