import React, { useEffect, useRef } from 'react';
import { BREAKPOINTS } from '../../constants';
import { useTvVideos } from '../../hooks/useTvVideos';
import CloseIcon from '../../icons/CloseIcon';
import { HoveredContent } from '../../types';
import { changeRemToPx } from '../../utils/changeRemToPx';
import { getScrollbarWidth } from '../../utils/getScrollbarWidth';
import ContentBottomPanel from '../ContentBottomPanel';
import * as Styled from './styles/Content';
import { contentTransitionDuration } from './styles/Content';

interface Props {
  homeRef: React.RefObject<HTMLDivElement>;
  contentsWrappersRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  slidersRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  contentThumbnailsRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  content: HoveredContent;
  setContent: React.Dispatch<React.SetStateAction<HoveredContent | null>>;
  contentWidth: number;
  hasClickedContent: boolean;
  setHasClickedContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Content({
  homeRef,
  contentsWrappersRef,
  slidersRef,
  contentThumbnailsRef,
  content,
  setContent,
  contentWidth,
  hasClickedContent,
  setHasClickedContent,
}: Props) {
  const HOVER_SCALE_RATIO = 2;

  const contentRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentBottomPanelRef = useRef<HTMLDivElement>(null);

  const { backdrop_path, genre_ids, id, name, transform_origin } = content;
  const fontSize = contentWidth / 10;
  const tvVideos = useTvVideos(id);

  const getSliderTranslationX = (): number => {
    const genreId = genre_ids[0];
    const slider = slidersRef.current[`${genreId}`];
    if (!slider) return 0;
    const sliderTransformMaxtrix = getComputedStyle(slider).transform;
    return parseFloat(sliderTransformMaxtrix.split(', ')[4]);
  };

  const getInsideDefaultPosition = (): { top: number; left: number } => {
    const genreId = genre_ids[0];
    const contentsWrapper = contentsWrappersRef.current[`${genreId}`];
    if (!contentsWrapper) return { top: 0, left: 0 };
    const contentThumbnail = contentThumbnailsRef.current[`${id}`];
    if (!contentThumbnail) return { top: 0, left: 0 };
    return {
      top: contentsWrapper.offsetTop,
      left: contentsWrapper.offsetLeft + contentThumbnail.offsetLeft + getSliderTranslationX(),
    };
  };

  const removeInsideHoverStyles = () => {
    if (!insideRef.current) return;

    const { top, left } = getInsideDefaultPosition();
    insideRef.current.style.top = `${top}px`;
    insideRef.current.style.left = `${left}px`;
    insideRef.current.style.width = `${contentWidth}px`;
    insideRef.current.style.fontSize = `${fontSize}px`;
  };

  const closeModal = () => {
    setHasClickedContent(false);
    removeInsideHoverStyles();
    if (!contentBottomPanelRef.current) return;
    contentBottomPanelRef.current.style.visibility = '';

    setTimeout(() => {
      setContent(null);
    }, contentTransitionDuration);
  };

  const closeEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', closeEvent);

    return () => {
      window.removeEventListener('keydown', closeEvent);
    };
    // eslint-disable-next-line
  }, []);

  const handleClickContent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === contentRef.current) closeModal();
  };

  const getContentStyle = (): React.CSSProperties | undefined => {
    if (!homeRef.current) return;
    const height = `${homeRef.current.clientHeight + homeRef.current.scrollTop}px`;

    if (!hasClickedContent) {
      const genreId = content.genre_ids[0];
      const contentsWrapper = contentsWrappersRef.current[`${genreId}`];
      if (!contentsWrapper) return;
      const contentThumbnail = contentThumbnailsRef.current[`${content.id}`];
      if (!contentThumbnail) return;

      return {
        height,
        fontSize: `${fontSize}px`,
      };
    }

    return {
      height,
      fontSize: `${fontSize}px`,
    };
  };

  const getInsideHoverPosition = (): { top: number; left: number } => {
    const contentThumbnail = contentThumbnailsRef.current[`${id}`];
    if (!contentThumbnail) return { top: 0, left: 0 };
    const { top, left } = getInsideDefaultPosition();
    const newTop = top - contentThumbnail.clientHeight * (HOVER_SCALE_RATIO - 1);

    if (transform_origin === 'left') {
      return {
        top: newTop,
        left,
      };
    }

    if (transform_origin === 'right') {
      return {
        top: newTop,
        left: left - contentWidth * (HOVER_SCALE_RATIO - 1),
      };
    }

    return {
      top: newTop,
      left: left - (contentWidth * (HOVER_SCALE_RATIO - 1)) / 2,
    };
  };

  const addInsideHoverStyles = () => {
    if (!insideRef.current) return;

    const { top, left } = getInsideHoverPosition();
    insideRef.current.style.top = `${top}px`;
    insideRef.current.style.left = `${left}px`;
    insideRef.current.style.width = `${contentWidth * HOVER_SCALE_RATIO}px`;
    insideRef.current.style.fontSize = `${fontSize * HOVER_SCALE_RATIO}px`;

    if (!contentBottomPanelRef.current) return;
    contentBottomPanelRef.current.style.visibility = 'visible';
  };

  useEffect(() => {
    addInsideHoverStyles();
    // eslint-disable-next-line
  }, []);

  const handleMouseLeaveInside = () => {
    if (hasClickedContent) return;
    removeInsideHoverStyles();

    setTimeout(() => {
      setContent(null);
    }, contentTransitionDuration);
  };

  const getHomeWidth = () => {
    if (!homeRef.current) return 0;
    return homeRef.current.offsetWidth - getScrollbarWidth();
  };

  const getScaleRatio = (): number => {
    if (!homeRef.current) return 0;

    const maxWidth = 996;
    if (getHomeWidth() > maxWidth) return maxWidth / contentWidth;

    const fullScaleRatio = getHomeWidth() / contentWidth;
    if (window.innerWidth < changeRemToPx(BREAKPOINTS.SM)) return fullScaleRatio * 0.99;
    return fullScaleRatio * 0.97;
  };

  const getInsideStyle = (): React.CSSProperties | undefined => {
    if (!hasClickedContent) {
      const { top, left } = getInsideDefaultPosition();

      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${contentWidth}px`,
      };
    }

    if (!homeRef.current) return;

    const width = contentWidth * getScaleRatio();

    return {
      top: `${homeRef.current.scrollTop + 50}px`,
      left: `${(getHomeWidth() - width) / 2}px`,
      width: `${width}px`,
      fontSize: `${fontSize * getScaleRatio()}px`,
    };
  };

  const toggleModal = () => {
    if (hasClickedContent) {
      closeModal();
      return;
    }

    if (!contentBottomPanelRef.current) return;

    setHasClickedContent(true);
    contentBottomPanelRef.current.style.visibility = '';
    return;
  };

  useEffect(() => {
    if (!imgRef.current) return;
    imgRef.current.src = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  }, [backdrop_path]);

  const getYoutubeLink = (key: string): string => `https://www.youtube.com/embed/${key}?autoplay=1&mute=1`;

  const getIframeSize = (): { width: number; height: number } => {
    const contentThumbnail = contentThumbnailsRef.current[`${content.id}`];
    if (!contentThumbnail) return { width: 0, height: 0 };

    if (hasClickedContent) {
      return {
        width: contentThumbnail.clientWidth * getScaleRatio(),
        height: contentThumbnail.clientHeight * getScaleRatio(),
      };
    }

    return {
      width: contentThumbnail.clientWidth * HOVER_SCALE_RATIO,
      height: contentThumbnail.clientHeight * HOVER_SCALE_RATIO,
    };
  };

  const ImgOrVideo = (): JSX.Element => {
    const contentThumbnail = contentThumbnailsRef.current[`${content.id}`];
    if (!contentThumbnail) return <></>;

    const video = tvVideos?.results
      .filter((result) => result.type === 'Trailer')
      .find((result) => result.site === 'YouTube');

    if (video) {
      const size = getIframeSize();

      return (
        <Styled.Iframe
          title={video.name}
          width={size.width}
          height={size.height}
          src={getYoutubeLink(video.key)}
        ></Styled.Iframe>
      );
    }

    return (
      <>
        <Styled.Img
          src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          alt={`${name} 썸네일`}
          onClick={toggleModal}
          ref={imgRef}
        />
        <Styled.Title className={`${name.length < 7 && 'short'}`} onClick={toggleModal}>
          {name}
        </Styled.Title>
      </>
    );
  };

  return (
    <Styled.Container
      className={hasClickedContent ? 'clicked' : ''}
      onClick={handleClickContent}
      style={getContentStyle()}
      ref={contentRef}
    >
      <Styled.Inside onMouseLeave={handleMouseLeaveInside} style={getInsideStyle()} ref={insideRef}>
        <Styled.ImgContainer>
          {ImgOrVideo()}
          {hasClickedContent && (
            <Styled.CloseButton aria-label="닫기" onClick={closeModal}>
              <CloseIcon />
            </Styled.CloseButton>
          )}
        </Styled.ImgContainer>
        <ContentBottomPanel
          contentBottomPanelRef={contentBottomPanelRef}
          id={id}
          hasClickedContent={hasClickedContent}
          setHasClickedContent={setHasClickedContent}
        />
      </Styled.Inside>
    </Styled.Container>
  );
}
