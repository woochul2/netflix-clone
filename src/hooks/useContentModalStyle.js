import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { TRANSITION_DURATION } from '../constants';
import doOnNextFrame from '../utils/doOnNextFrame';
import getScrollbarWidth from '../utils/getScrollbarWidth';

/** 단위: px */
const MAX_WIDTH = 970;
const HOVER_SCALE_RATIO = 1.5;

/**
 * 초기화한 모달의 스타일, 줄어드는 동작을 하는 함수,
 * 모달을 열고 닫는 동작을 하는 함수를 반환한다.
 *
 * @param {Content} content
 * @param {React.MutableRefObject<HTMLElement>} browseRef
 * @param {boolean} isOpen
 */
function useContentModalStyle(content, browseRef, isOpen) {
  const [contentModalStyle, setContentModalStyle] = useState(null);
  const [initialFullScaleRatio, setInitialFullScaleRatio] = useState(0);

  useLayoutEffect(() => {
    const { scrollTop } = browseRef.current;
    const { width, top, left } = content.element.getBoundingClientRect();
    const browseWidth = document.body.clientWidth - getScrollbarWidth();
    const fullScaleRatio = Math.min(browseWidth * 0.99, MAX_WIDTH) / width;
    const modalWidth = width * fullScaleRatio;

    setInitialFullScaleRatio(fullScaleRatio);
    setContentModalStyle({
      width: `${modalWidth}px`,
      fontSize: `${modalWidth / 10}px`,
      top: `${top + scrollTop}px`,
      left: `${left - (modalWidth - width) / 2}px`,
      transition: 'none',
      transform: `scale(${1 / fullScaleRatio})`,
    });
  }, [content, browseRef]);

  const hover = () => {
    if (isOpen || !initialFullScaleRatio) return;

    const { width, height } = content.element.getBoundingClientRect();

    const getTranslateX = () => {
      const { transformOrigin } = content;
      const translateX = (width * (HOVER_SCALE_RATIO - 1)) / 2;
      switch (transformOrigin) {
        case 'left':
          return `${translateX}px`;
        case 'right':
          return `${-translateX}px`;
        default:
          return 0;
      }
    };

    const translateY = `${-height * (HOVER_SCALE_RATIO - 1) * 1.25}px`;
    const translate = `translate(${getTranslateX()}, ${translateY})`;
    const scaleRatio = HOVER_SCALE_RATIO / initialFullScaleRatio;

    setContentModalStyle((prev) => ({
      ...prev,
      transition: '',
      transform: `${translate} scale(${scaleRatio})`,
      borderRadius: `${0.375 / scaleRatio}rem`,
    }));
  };

  useEffect(hover, [isOpen, initialFullScaleRatio, content]);

  const shrinkModal = () => {
    setContentModalStyle((prev) => ({
      ...prev,
      transform: `scale(${1 / initialFullScaleRatio})`,
    }));
  };

  const openModal = useCallback(() => {
    const browse = browseRef.current;
    browse.style.paddingRight = `${getScrollbarWidth(browse)}px`;
    browse.classList.add('open-modal');

    const background = browse.querySelector('.content-modal-background');
    background.classList.add('open');

    const { width, top, left } = content.element.getBoundingClientRect();
    const modalWidth = width * initialFullScaleRatio;
    const browseWidth = document.body.clientWidth - getScrollbarWidth();
    const sidePadding = browseWidth - modalWidth;
    const translateX = `${-left + (modalWidth - width + sidePadding) / 2}px`;
    const translateY = `${-top + 32}px`;
    const translate = `translate(${translateX}, ${translateY})`;

    setContentModalStyle((prev) => ({
      ...prev,
      borderRadius: '',
      transition: '',
      top: `${top}px`,
      transform: `${translate} scale(1)`,
    }));
  }, [initialFullScaleRatio, content, browseRef]);

  useEffect(() => {
    const resizeModal = () => {
      if (!isOpen) return;

      const resize = () => {
        const { width, top, left } = content.element.getBoundingClientRect();
        const browseWidth = document.body.clientWidth - getScrollbarWidth();
        const fullScaleRatio = Math.min(browseWidth * 0.99, MAX_WIDTH) / width;
        const modalWidth = width * fullScaleRatio;
        const sidePadding = browseWidth - modalWidth;
        const transX = `${-left + (modalWidth - width + sidePadding) / 2}px`;
        const transY = `${-top + 32}px`;
        const translate = `translate(${transX}, ${transY})`;

        setContentModalStyle((prev) => ({
          ...prev,
          width: `${modalWidth}px`,
          fontSize: `${modalWidth / 10}px`,
          top: `${top}px`,
          left: `${left - (modalWidth - width) / 2}px`,
          transition: 'none',
          transform: `${translate} scale(1)`,
        }));
      };

      resize();
      doOnNextFrame(resize);
    };

    window.addEventListener('resize', resizeModal);

    return () => {
      window.removeEventListener('resize', resizeModal);
    };
  }, [isOpen, content]);

  const closeModal = () => {
    const browse = browseRef.current;

    const browseWidth = document.body.clientWidth - getScrollbarWidth();
    const { width } = content.element.getBoundingClientRect();
    const fullScaleRatio = Math.min(browseWidth * 0.99, MAX_WIDTH) / width;
    const background = browse.querySelector('.content-modal-background');
    background.style.background = 'none';

    setContentModalStyle((prev) => ({
      ...prev,
      transition: '',
      boxShadow: 'none',
      transform: `scale(${1 / fullScaleRatio})`,
    }));

    setTimeout(() => {
      browse.style.paddingRight = '';
      browse.classList.remove('open-modal');
    }, parseInt(TRANSITION_DURATION));
  };

  return { contentModalStyle, shrinkModal, openModal, closeModal };
}

export default useContentModalStyle;
