import React from 'react';
import { HoveredContent } from '../../types';
import { contentTransitionDuration } from '../Content/styles/Content';
import * as Styled from './styles/ContentThumbnail';

interface Props {
  contentThumbnailsRef: React.MutableRefObject<{ [key: string]: HTMLButtonElement | null }>;
  tvShow: TvShows.Result;
  index: number;
  sliderContentCount: number;
  sliderStartIndex: number;
  hasClickedContent: boolean;
  content: HoveredContent | null;
  setContent: React.Dispatch<React.SetStateAction<HoveredContent | null>>;
}

export default function ContentThumbnail({
  contentThumbnailsRef,
  tvShow,
  index,
  sliderContentCount,
  sliderStartIndex,
  hasClickedContent,
  content,
  setContent,
}: Props) {
  const { backdrop_path, id, name } = tvShow;
  let isMouseOnThumbnail = false;

  const getTransformOrigin = (): 'center' | 'left' | 'right' => {
    if (index % sliderContentCount === sliderStartIndex % sliderContentCount) return 'left';
    if (index % sliderContentCount === (sliderStartIndex + sliderContentCount - 1) % sliderContentCount) return 'right';
    return 'center';
  };

  const handleMouseEnterContentThumbnail = () => {
    isMouseOnThumbnail = true;

    setTimeout(() => {
      if (!isMouseOnThumbnail) return;
      setContent({ ...tvShow, transform_origin: getTransformOrigin() });
    }, contentTransitionDuration);
  };

  const handleMouseLeaveContentThumbnail = () => {
    isMouseOnThumbnail = false;
  };

  const getContentThumbnailTabIndex = (): number | undefined => {
    if (content) return -1;
    if (hasClickedContent) return -1;
    if (index < sliderStartIndex) return -1;
    if (index >= sliderStartIndex + sliderContentCount) return -1;
    return;
  };

  const checkContentExists = (): boolean => {
    if (!content) return false;
    if (content.id === id) return true;
    return false;
  };

  const getImageLink = (img: string | null): string => `https://image.tmdb.org/t/p/original${img}`;

  return (
    <Styled.Container
      onMouseEnter={handleMouseEnterContentThumbnail}
      onMouseLeave={handleMouseLeaveContentThumbnail}
      tabIndex={getContentThumbnailTabIndex()}
      style={{ boxShadow: checkContentExists() ? 'none' : '' }}
      ref={(element) => (contentThumbnailsRef.current[`${id}`] = element)}
    >
      {checkContentExists() ? (
        <Styled.Img />
      ) : (
        <>
          <Styled.Img src={getImageLink(backdrop_path)} alt={`${name} 썸네일`} />
          <Styled.Title className={`${name.length < 7 && 'short'}`}>{name}</Styled.Title>
        </>
      )}
    </Styled.Container>
  );
}
