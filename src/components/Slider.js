import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SLIDER_GAP, TRANSITION_DURATION } from '../constants';
import pxToRem from '../utils/pxToRem';
import Content from './Content';

/**
 * @param {Object} props
 * @param {TVShowResult[]|MovieResult[]} props.contents
 * @param {number} props.firstContentIndex
 * @param {'tv'|'movie'} props.variant
 * @param {number} props.sliderContentCount
 * @param {boolean} props.imgLoaded
 * @param {function} props.onImgLoad
 * @param {function} props.onMouseEnterContent
 * @param {function} props.onMouseLeaveContent
 * @param {function} props.onClickContent
 */
function Slider({ contents, firstContentIndex, ...rest }) {
  const sliderRef = useRef(null);

  const moveSlider = () => {
    const slider = sliderRef.current;
    const styles = getComputedStyle(document.documentElement);
    const contentWidth = parseFloat(styles.getPropertyValue('--content-width'));
    const gap = parseFloat(SLIDER_GAP);
    const leftWidth = firstContentIndex * (contentWidth + gap);
    const sliderWidth = pxToRem(slider.clientWidth);
    const translate = `translateX(${-(leftWidth / sliderWidth) * 100}%)`;
    slider.style.transform = translate;
  };

  useEffect(moveSlider, [firstContentIndex]);

  return (
    <SliderBlock ref={sliderRef}>
      {contents.map((content, index) => (
        <Content
          key={content.id}
          content={content}
          index={index}
          firstContentIndex={firstContentIndex}
          {...rest}
        />
      ))}
    </SliderBlock>
  );
}

const SliderBlock = styled.div`
  display: flex;
  gap: ${SLIDER_GAP};
  transform: translateX(0);
  transition: transform ${TRANSITION_DURATION};
`;

export default Slider;
