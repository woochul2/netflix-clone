/**
 * fetch로 서버에 요청을 보내고 응답을 반환한다.
 *
 * @param {string} url
 * @param {RequestInit} option
 */
async function fetchData(url, option) {
  try {
    const response = await fetch(url, option);
    if (!response.ok) throw new Error(`OKError. status: ${response.status}`);

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = fetchData;
