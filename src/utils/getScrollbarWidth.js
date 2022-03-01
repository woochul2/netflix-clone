/**
 * 스크롤바의 너비를 구한다.
 *
 * @param {HTMLElement | undefined} element
 */
const getScrollbarWidth = (element) => {
  if (element) return element.offsetWidth - element.clientWidth;

  const el = document.createElement('div');
  el.style.visibility = 'hidden';
  el.style.overflow = 'scroll';
  document.body.appendChild(el);
  const scrollbarWidth = el.offsetWidth - el.clientWidth;
  document.body.removeChild(el);
  return scrollbarWidth;
};

export default getScrollbarWidth;
