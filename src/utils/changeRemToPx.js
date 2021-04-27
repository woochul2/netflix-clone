/**
 * px 단위가 없는 숫자로 반환한다.
 * @param {string} remVal
 */
export const changeRemToPx = (remVal) => {
  const html = document.querySelector('html');
  const htmlFontSize = window
    .getComputedStyle(html)
    .getPropertyValue('font-size');

  return parseFloat(remVal) * parseFloat(htmlFontSize);
};
