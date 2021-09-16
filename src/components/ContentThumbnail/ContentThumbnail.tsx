import React, { useEffect, useRef, useState } from 'react';
import { contentTransitionDuration } from '../Content/styles/Content';
import * as Styled from './styles/ContentThumbnail';

interface Props {
  browseRef: React.RefObject<HTMLDivElement>;
  nextButtonRef: React.RefObject<HTMLButtonElement>;
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
  browseRef,
  nextButtonRef,
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
  const imgRef = useRef<HTMLImageElement>(null);
  const { backdrop_path, id } = contentInfo;
  const title = variant === 'tv' ? contentInfo.name : contentInfo.title;
  let isMouseOnThumbnail = false;
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  useEffect(() => {
    const $browse = browseRef.current;
    const $nextButton = nextButtonRef.current;
    if (!$browse) return;
    if (!$nextButton) return;

    const removeEvent = () => {
      $browse.removeEventListener('scroll', lazyLoad);
      $nextButton.removeEventListener('click', lazyLoad);
      window.removeEventListener('resize', lazyLoad);
    };

    const lazyLoad = () => {
      const $contentThumbnail = contentThumbnailsRef.current[`${id}`];
      const $img = imgRef.current;
      if (!$contentThumbnail) return;
      if (!$img) return;

      const rect = $contentThumbnail.getBoundingClientRect();
      if (rect.top < $browse.clientHeight) {
        $img.src = $img.dataset.src as string;
        removeEvent();
      }
    };

    lazyLoad();
    $browse.addEventListener('scroll', lazyLoad);
    $nextButton.addEventListener('click', lazyLoad);
    window.addEventListener('resize', lazyLoad);

    return removeEvent;
  }, [browseRef, contentThumbnailsRef, nextButtonRef, id]);

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
            <Styled.Img
              data-src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
              alt={`${title} 썸네일`}
              onLoad={handleImageLoad}
              ref={imgRef}
            />
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
