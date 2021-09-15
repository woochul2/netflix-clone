import React, { useState } from 'react';
import { contentTransitionDuration } from '../Content/styles/Content';
import * as Styled from './styles/ContentThumbnail';

interface Props {
  contentThumbnailsRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  variant: 'tv' | 'movie';
  contentInfo: any;
  index: number;
  sliderContentCount: number;
  sliderStartIndex: number;
  isSliderMoving: boolean;
  hasClickedContent: boolean;
  setHasClickedContent: React.Dispatch<React.SetStateAction<boolean>>;
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
}

export default function ContentThumbnail({
  contentThumbnailsRef,
  variant,
  contentInfo,
  index,
  sliderContentCount,
  sliderStartIndex,
  isSliderMoving,
  hasClickedContent,
  setHasClickedContent,
  content,
  setContent,
}: Props) {
  const { backdrop_path, id } = contentInfo;
  const title = variant === 'tv' ? contentInfo.name : contentInfo.title;
  let isMouseOnThumbnail = false;
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  const handleMouseEnterContentThumbnail = () => {
    if (index < sliderStartIndex) return;
    if (index >= sliderStartIndex + sliderContentCount) return;
    isMouseOnThumbnail = true;

    setTimeout(() => {
      if (!isMouseOnThumbnail) return;
      setContent({ ...contentInfo, transform_origin: getTransformOrigin() });
    }, contentTransitionDuration);
  };

  const handleMouseLeaveContentThumbnail = () => {
    isMouseOnThumbnail = false;
  };

  const checkContentExists = (): boolean => {
    if (!content) return false;
    if (content.id === id) return true;
    return false;
  };

  const getImgButtonTabIndex = (): number | undefined => {
    if (content) return -1;
    if (hasClickedContent) return -1;
    if (index < sliderStartIndex) return -1;
    if (index >= sliderStartIndex + sliderContentCount) return -1;
    return;
  };

  const getTransformOrigin = (): 'center' | 'left' | 'right' => {
    if (index % sliderContentCount === sliderStartIndex % sliderContentCount) return 'left';
    if (index % sliderContentCount === (sliderStartIndex + sliderContentCount - 1) % sliderContentCount) return 'right';
    return 'center';
  };

  const getImageLink = (img: string | null): string => `https://image.tmdb.org/t/p/w500${img}`;

  const handleImageLoad = () => setHasImageLoaded(true);

  const handleClickImgButton = () => {
    if (index < sliderStartIndex) return;
    if (index >= sliderStartIndex + sliderContentCount) return;

    if (content) return;
    if (isSliderMoving) return;
    setContent({ ...contentInfo, transform_origin: getTransformOrigin() });
    setTimeout(() => {
      setHasClickedContent(true);
    }, 0);
    const contentThumbnail = contentThumbnailsRef.current[`${id}`];
    if (!contentThumbnail) return;
    contentThumbnail.blur();
  };

  const getImgButtonStyle = (): React.CSSProperties | undefined => {
    if (index === sliderStartIndex - 1 || index === sliderStartIndex + sliderContentCount) return { cursor: 'default' };
  };

  return (
    <Styled.Container
      onMouseEnter={handleMouseEnterContentThumbnail}
      onMouseLeave={handleMouseLeaveContentThumbnail}
      style={{ boxShadow: checkContentExists() ? 'none' : '' }}
      ref={(element) => (contentThumbnailsRef.current[`${id}`] = element)}
    >
      {checkContentExists() ? (
        <Styled.Img />
      ) : (
        <>
          <Styled.ImgButton
            tabIndex={getImgButtonTabIndex()}
            onClick={handleClickImgButton}
            style={getImgButtonStyle()}
          >
            <Styled.Img src={getImageLink(backdrop_path)} alt={`${title} 썸네일`} onLoad={handleImageLoad} />
          </Styled.ImgButton>
          {hasImageLoaded && (
            <Styled.Title className={`${title.length < 7 && 'short'}`} onClick={handleClickImgButton}>
              {title}
            </Styled.Title>
          )}
        </>
      )}
    </Styled.Container>
  );
}
