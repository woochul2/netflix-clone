/**
 * 조건을 만족하면 콤마를 붙여 반환한다.
 *
 * @param {string} value
 * @param {boolean} condition
 */
const addComma = (value, condition) => {
  if (condition) return `${value}, `;
  return value;
};

export default addComma;
