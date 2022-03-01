/**
 * px 값을 rem 값으로 바꾼다.
 *
 * @param {string | number} value
 */
const pxToRem = (value) => {
  const styles = window.getComputedStyle(document.documentElement);
  return parseFloat(value) / parseFloat(styles.fontSize);
};

export default pxToRem;
