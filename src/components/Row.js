import isMobile from 'ismobilejs';
import { useState } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS, TRANSITION_DURATION } from '../constants';
import useGenreContents from '../hooks/useGenreContents';
import focusContent from '../utils/focusContent';
import ContentsPlaceholder from './ContentsPlaceholder';
import Slider from './Slider';
import SliderButton from './SliderButton';

let isSliderMoving = false;

const setSliderMoving = () => {
  isSliderMoving = true;
  setTimeout(() => {
    isSliderMoving = false;
  }, parseInt(TRANSITION_DURATION));
};

/**
 * @param {Object} props
 * @param {'tv'|'movie'} props.variant
 * @param {Genre} props.genre
 * @param {number} props.sliderContentCount
 * @param {function} props.onMouseEnterContent
 * @param {function} props.onClickContent
 * @param {React.MutableRefObject<HTMLElement>} props.contentsWrapperRef
 * @param {function} props.onMouseLeaveContent
 */
function Row({
  variant,
  genre,
  sliderContentCount,
  onMouseEnterContent,
  onClickContent,
  contentsWrapperRef,
  ...rest
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [firstContentIndex, setFirstContentIndex] = useState(0);
  const { id, name } = genre;
  const contents = useGenreContents(variant, id, 2);

  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  const handleClickPrevButton = (event) => {
    if (isSliderMoving) return;

    const prevIndex = Math.max(firstContentIndex - sliderContentCount, 0);
    setFirstContentIndex(prevIndex);
    focusContent(event, firstContentIndex - 1);
    setSliderMoving();
  };

  const handleClickNextButton = (event) => {
    if (isSliderMoving) return;

    const nextIndex = firstContentIndex + sliderContentCount;
    setFirstContentIndex(nextIndex);
    focusContent(event, nextIndex);
    setSliderMoving();
  };

  const getContentTransformOrigin = (index) => {
    const current = index % sliderContentCount;
    const first = firstContentIndex % sliderContentCount;
    if (current === first) return 'left';

    const lastIndex = firstContentIndex + sliderContentCount - 1;
    const last = lastIndex % sliderContentCount;
    if (current === last) return 'right';
  };

  const handleMouseEnterContent = (event, info, index) => {
    const transformOrigin = getContentTransformOrigin(index);
    onMouseEnterContent(event, info, transformOrigin);
  };

  const handleClickContent = (event, info, index) => {
    const transformOrigin = getContentTransformOrigin(index);
    onClickContent(event, info, transformOrigin);
  };

  return (
    <RowBlock>
      <Title>{name}</Title>
      <ContentsWrapper
        ref={contentsWrapperRef}
        className={`contents-wrapper${isMobile().any ? ' mobile' : ''}`}
      >
        {!imgLoaded && <ContentsPlaceholder />}
        {firstContentIndex > 0 && (
          <SliderButton
            variant="prev"
            onClick={handleClickPrevButton}
            style={{
              display: !isMobile().any && imgLoaded ? '' : 'none',
            }}
          />
        )}
        <Slider
          contents={contents}
          firstContentIndex={firstContentIndex}
          variant={variant}
          sliderContentCount={sliderContentCount}
          imgLoaded={imgLoaded}
          onImgLoad={handleImgLoad}
          onMouseEnterContent={handleMouseEnterContent}
          onClickContent={handleClickContent}
          {...rest}
        />
        {firstContentIndex + sliderContentCount < contents.length && (
          <SliderButton
            variant="next"
            onClick={handleClickNextButton}
            style={{
              display: !isMobile().any && imgLoaded ? '' : 'none',
            }}
          />
        )}
      </ContentsWrapper>
    </RowBlock>
  );
}

const RowBlock = styled.div`
  margin-bottom: 4vw;
`;

const Title = styled.h2`
  font-size: 1.4vw;
  margin-bottom: 0.5%;

  @media (max-width: ${BREAKPOINTS.xl}) {
    font-size: 1.7vw;
  }

  @media (max-width: ${BREAKPOINTS.lg}) {
    font-size: 2vw;
  }

  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: 1rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 0.875rem;
  }
`;

const ContentsWrapper = styled.div`
  position: relative;
  display: flex;

  &.mobile {
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default Row;
