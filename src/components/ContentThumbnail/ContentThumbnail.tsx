import React, { useEffect, useRef, useState } from 'react';
import { throttle } from '../../utils/throttle';
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
  const [hasTouchedContentThumbnail, setHasTouchedContentThumbnail] = useState(false);

  useEffect(() => {
    const $browse = browseRef.current;
    if (!$browse) return;

    const removeEvent = () => {
      $browse.removeEventListener('scroll', lazyLoad);
      window.removeEventListener('resize', lazyLoad);
      window.removeEventListener('orientationchange', orientationChangeEvent);
      const $nextButton = nextButtonRef.current;
      if ($nextButton) $nextButton.removeEventListener('click', lazyLoad);
    };

    const lazyLoad = throttle((event?: Event) => {
      const $contentThumbnail = contentThumbnailsRef.current[`${id}`];
      const $img = imgRef.current;
      if (!$contentThumbnail) return;
      if (!$img) return;

      const rect = $contentThumbnail.getBoundingClientRect();
      const isInsideScreenHeight = rect.top < $browse.clientHeight + 100 && rect.left < $browse.clientWidth;
      // NextButton 클릭 직후 rect.left는 슬라이더 이동 애니메이션이 발생하기 전의 위치이므로 화면 너비의 두 배를 기준으로 비교했다.
      const isInsideScreenWidth = event?.type === 'click' && rect.left < $browse.clientWidth * 2;
      if (isInsideScreenHeight || isInsideScreenWidth) {
        $img.src = $img.dataset.src as string;
        $img.classList.remove('hidden');
        removeEvent();
      }
    }, 20);

    const orientationChangeEvent = () => {
      setTimeout(() => {
        lazyLoad();
      }, 1);
    };

    $browse.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', orientationChangeEvent);
    const $nextButton = nextButtonRef.current;
    if ($nextButton) $nextButton.addEventListener('click', lazyLoad);
    lazyLoad();

    return removeEvent;
  }, [browseRef, contentThumbnailsRef, nextButtonRef, id]);

  const handleMouseEnterContentThumbnail = () => {
    if (hasTouchedContentThumbnail) return;
    if (index < sliderStartIndex) return;
    if (index >= sliderStartIndex + sliderContentCount) return;
    isMouseOnThumbnail = true;

    setTimeout(() => {
      if (!isMouseOnThumbnail) return;
      setContent({ ...contentInfo, transform_origin: getTransformOrigin() });
    }, contentTransitionDuration);
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

  const handleClickContentThumbnail = () => {
    if (index < sliderStartIndex) return;
    if (index >= sliderStartIndex + sliderContentCount) return;
    if (content) return;
    if (isSliderMoving) return;

    setContent({ ...contentInfo, transform_origin: getTransformOrigin() });
    setHasTouchedContentThumbnail(false);
    setTimeout(() => {
      setHasClickedContent(true);
    }, 0);
  };

  const getImgButtonStyle = (): React.CSSProperties | undefined => {
    if (index === sliderStartIndex - 1 || index === sliderStartIndex + sliderContentCount) return { cursor: 'default' };
  };

  return (
    <Styled.Container
      onTouchStart={() => {
        setHasTouchedContentThumbnail(true);
      }}
      onMouseEnter={handleMouseEnterContentThumbnail}
      onMouseLeave={() => {
        isMouseOnThumbnail = false;
      }}
      onClick={handleClickContentThumbnail}
      style={{ boxShadow: checkContentExists() ? 'none' : '' }}
      ref={(element) => (contentThumbnailsRef.current[`${id}`] = element)}
    >
      <div></div>
      <Styled.ImgButton
        tabIndex={getImgButtonTabIndex()}
        style={getImgButtonStyle()}
        className={checkContentExists() ? 'hidden' : ''}
        aria-label={`${title} 열기`}
      >
        <Styled.Img
          data-src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          className="hidden"
          alt={`${title} 썸네일`}
          onLoad={() => {
            setHasImageLoaded(true);
          }}
          ref={imgRef}
        />
      </Styled.ImgButton>
      {hasImageLoaded && !checkContentExists() && (
        <Styled.Title className={`${title.length < 7 && 'short'}`}>{title}</Styled.Title>
      )}
    </Styled.Container>
  );
}
