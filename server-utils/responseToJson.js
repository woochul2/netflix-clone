async function responseToJson(response) {
  const json = await response.json();
  return new Response(JSON.stringify(json));
}

module.exports = responseToJson;
