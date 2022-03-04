import isMobile from 'ismobilejs';
import { useLayoutEffect, useState } from 'react';
import { BREAKPOINTS, SLIDER_GAP } from '../constants';
import pxToRem from '../utils/pxToRem';

const getNextSliderContentCount = () => {
  const bodyWidth = pxToRem(document.body.clientWidth);
  if (bodyWidth > parseFloat(BREAKPOINTS.xl)) return 6;
  if (bodyWidth > parseFloat(BREAKPOINTS.lg)) return 5;
  if (bodyWidth > parseFloat(BREAKPOINTS.md)) return 4;
  if (bodyWidth > parseFloat(BREAKPOINTS.sm)) return 3;
  return 2;
};

/**
 * 화면 너비에 따라 슬라이더에 들어갈 콘텐츠 개수를 정하고,
 * 콘텐츠 너비를 css 변수로 저장한다.
 *
 * @param {string} initialID
 * @param {React.MutableRefObject<HTMLElement>} contentsWrapperRef
 */
function useContentWidth(initialID, contentsWrapperRef) {
  const [sliderContentCount, setSliderContentCount] = useState(0);

  useLayoutEffect(() => {
    if (initialID) return;
    const contentsWrapper = contentsWrapperRef.current;

    const setContentWidth = (nextSliderContentCount) => {
      const gap = parseFloat(SLIDER_GAP);
      const mobilePadding = isMobile().any ? 1.5 : 0;
      const wrapperWidth = pxToRem(contentsWrapper.clientWidth) - mobilePadding;
      const contentsWidth = wrapperWidth - gap * (nextSliderContentCount - 1);
      const contentWidth = contentsWidth / nextSliderContentCount;
      const html = document.documentElement;
      html.style.setProperty('--content-width', `${contentWidth}rem`);
    };

    const setAll = () => {
      const nextSliderContentCount = getNextSliderContentCount();
      setSliderContentCount(nextSliderContentCount);
      setContentWidth(nextSliderContentCount);
    };

    setAll();
    const resizeObserver = new ResizeObserver(setAll);
    resizeObserver.observe(contentsWrapper);

    return () => {
      resizeObserver.unobserve(contentsWrapper);
      document.documentElement.style.removeProperty('--content-width');
    };
  }, [initialID, contentsWrapperRef]);

  return sliderContentCount;
}

export default useContentWidth;
