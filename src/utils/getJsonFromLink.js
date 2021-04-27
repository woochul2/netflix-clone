/**
 * @param {string} link
 */
export const getJsonFromLink = (link) => {
  return new Promise((resolve, _) => {
    fetch(link).then((response) => {
      resolve(response.json());
    });
  });
};
