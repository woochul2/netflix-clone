import React, { useEffect, useRef } from 'react';
import { BREAKPOINTS } from '../../constants';
import { useVideos } from '../../hooks/useVideos';
import CloseIcon from '../../icons/CloseIcon';
import { changeRemToPx } from '../../utils/changeRemToPx';
import { getScrollbarWidth } from '../../utils/getScrollbarWidth';
import ContentBottomPanel from '../ContentBottomPanel';
import * as Styled from './styles/Content';
import { contentTransitionDuration } from './styles/Content';

interface Props {
  variant: 'tv' | 'movie';
  browseRef: React.RefObject<HTMLDivElement>;
  contentsWrappersRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  slidersRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  contentThumbnailsRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
  contentWidth: number;
  hasClickedContent: boolean;
  setHasClickedContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Content({
  variant,
  browseRef,
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

  const { backdrop_path, genre_ids, id, transform_origin } = content;
  const title = variant === 'tv' ? content.name : content.title;
  const fontSize = contentWidth / 10;
  const videos = useVideos(variant, id);

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
    if (!browseRef.current) return;
    const height = `${browseRef.current.clientHeight + browseRef.current.scrollTop}px`;

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
    if (!browseRef.current) return 0;
    return browseRef.current.offsetWidth - getScrollbarWidth();
  };

  const getScaleRatio = (): number => {
    if (!browseRef.current) return 0;

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

    if (!browseRef.current) return;

    const width = contentWidth * getScaleRatio();

    return {
      top: `${browseRef.current.scrollTop + 50}px`,
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

    const video = videos?.results
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
          alt={`${title} 썸네일`}
          onClick={toggleModal}
          ref={imgRef}
        />
        <Styled.Title className={`${title.length < 7 && 'short'}`} onClick={toggleModal}>
          {title}
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
          variant={variant}
          id={id}
          hasClickedContent={hasClickedContent}
          setHasClickedContent={setHasClickedContent}
        />
      </Styled.Inside>
    </Styled.Container>
  );
}
