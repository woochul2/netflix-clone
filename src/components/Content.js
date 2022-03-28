import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ContentTitle from './ContentTitle';
import LazyImg from './LazyImg';

/**
 * @param {Object} props
 * @param {'tv'|'movie'} props.variant
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
  variant,
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
  const { name, title, backdrop_path, id } = content;

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
      to={`/${variant}/${id}`}
      state={{ hasPrevHistory: true }}
      className="content"
      aria-label={`${name || title} 상세 정보 보기`}
      tabIndex={imgButtonTabIndex}
      data-index={index}
      onMouseEnter={handleMouseEnterContent}
      onMouseLeave={onMouseLeaveContent}
      onClick={handleClickContent}
    >
      <LazyImg
        src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
        alt={name || title}
        onLoad={onImgLoad}
      />
      {imgLoaded && <ContentTitle name={name || title} />}
    </ContentBlock>
  );
}

const ContentBlock = styled(Link)`
  cursor: pointer;
  position: relative;
  width: var(--content-width);
  font-size: calc(var(--content-width) / 10);
  border-radius: 0.2vw;
  overflow: hidden;
  color: hsl(0, 0%, 90%);
`;

export default Content;
