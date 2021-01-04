/**
 * @param {string} link
 */
export default (link) => {
  return new Promise((resolve, reject) => {
    fetch(link).then((response) => {
      resolve(response.json());
    });
  });
};
