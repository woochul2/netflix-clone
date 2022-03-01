import isMobile from 'ismobilejs';

/**
 * 해당 index의 콘텐츠에 포커스를 옮긴다.
 *
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
 * @param {number} index
 */
const focusContent = (event, index) => {
  if (isMobile().any) return;

  const contentsWrapper = event.target.closest('.contents-wrapper');
  const selector = `.content[data-index="${index}"]`;
  const content = contentsWrapper.querySelector(selector);
  content.focus();
};

export default focusContent;
