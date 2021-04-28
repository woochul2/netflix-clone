export const getJsonFromLink = <JsonType>(link: string): Promise<JsonType> => {
  return new Promise((resolve) => {
    fetch(link).then((response) => {
      resolve(response.json());
    });
  });
};
