/**
 * @param {Request} request
 */
function getQueryParams(request) {
  const queryParams = Object.fromEntries(new URL(request.url).searchParams);
  return queryParams;
}

module.exports = getQueryParams;
