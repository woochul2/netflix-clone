import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentTitle from './ContentTitle';
import LazyImg from './LazyImg';

/**
 * @param {Object} props
 * @param {TVShowResult|MovieResult} props.content
 * @param {number} props.index
 * @param {number} props.firstContentIndex
 * @param {number} props.sliderContentCount
 * @param {boolean} props.imgLoaded
 * @param {function} props.onImgLoad
 * @param {function} props.onMouseEnterContent
 * @param {function} props.onMouseLeaveContent
 * @param {function} props.onClickContent
 */
function Content({
  content,
  index,
  firstContentIndex,
  sliderContentCount,
  imgLoaded,
  onImgLoad,
  onMouseEnterContent,
  onMouseLeaveContent,
  onClickContent,
}) {
  const [imgButtonTabIndex, setImgButtonTabIndex] = useState(null);
  const { name, title, backdrop_path } = content;

  useEffect(() => {
    const isOnLeft = index < firstContentIndex;
    const isOnRight = index >= firstContentIndex + sliderContentCount;
    setImgButtonTabIndex(isOnLeft || isOnRight ? -1 : null);
  }, [index, firstContentIndex, sliderContentCount]);

  const handleMouseEnterContent = (event) => {
    onMouseEnterContent(event, content, index);
  };

  const handleClickContent = (event) => {
    onClickContent(event, content, index);
  };

  return (
    <ContentBlock
      className="content"
      data-index={index}
      onMouseEnter={handleMouseEnterContent}
      onMouseLeave={onMouseLeaveContent}
    >
      <ImgButton
        aria-label={`${name || title} 상세 정보 보기`}
        tabIndex={imgButtonTabIndex}
        onClick={handleClickContent}
      >
        <LazyImg
          src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          onLoad={onImgLoad}
        />
      </ImgButton>
      {imgLoaded && <ContentTitle name={name || title} />}
    </ContentBlock>
  );
}

const ContentBlock = styled.div`
  position: relative;
  width: var(--content-width);
  font-size: calc(var(--content-width) / 10);
  color: hsl(0, 0%, 90%);

  &.hidden {
    visibility: hidden;
  }
`;

const ImgButton = styled.button`
  cursor: pointer;
  display: block;
  overflow: hidden;
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0.2vw;
  background: none;
`;

export default Content;
