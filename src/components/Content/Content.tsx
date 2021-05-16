import React, { useEffect, useRef, useState } from 'react';
import * as BREAKPOINTS from '../../constants/breakpoints';
import { useTvVideos } from '../../hooks/useTvVideos';
import CloseIcon from '../../icons/CloseIcon';
import { HoveredContent } from '../../types';
import { changeRemToPx } from '../../utils/changeRemToPx';
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
  hasContentExpanded: boolean;
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
  hasContentExpanded,
}: Props) {
  const { backdrop_path, genre_ids, id, name, transform_origin } = content;
  const fontSize = contentWidth / 10;
  const hoverScaleRatio = 2;
  const contentRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const contentBottomPanelRef = useRef<HTMLDivElement>(null);
  const [isShrinkingAfterHover, setIsShrinkingAfterHover] = useState(false);
  const [isShrinkingAfterClick, setIsShrinkingAfterClick] = useState(false);
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
    setIsShrinkingAfterClick(true);
    if (!contentBottomPanelRef.current) return;
    contentBottomPanelRef.current.style.visibility = '';

    setTimeout(() => {
      setContent(null);
    }, contentTransitionDuration);
  };

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
    const newTop = top - contentThumbnail.clientHeight * (hoverScaleRatio - 1);

    if (transform_origin === 'left') {
      return {
        top: newTop,
        left,
      };
    }

    if (transform_origin === 'right') {
      return {
        top: newTop,
        left: left - contentWidth * (hoverScaleRatio - 1),
      };
    }

    return {
      top: newTop,
      left: left - (contentWidth * (hoverScaleRatio - 1)) / 2,
    };
  };

  const addInsideHoverStyles = () => {
    if (!insideRef.current) return;

    const { top, left } = getInsideHoverPosition();
    insideRef.current.style.top = `${top}px`;
    insideRef.current.style.left = `${left}px`;
    insideRef.current.style.width = `${contentWidth * hoverScaleRatio}px`;
    insideRef.current.style.fontSize = `${fontSize * hoverScaleRatio}px`;

    if (!contentBottomPanelRef.current) return;
    contentBottomPanelRef.current.style.visibility = 'visible';
  };

  const handleMouseOverInside = () => {
    if (hasClickedContent) return;
    if (isShrinkingAfterHover) return;
    if (isShrinkingAfterClick) return;
    addInsideHoverStyles();
  };

  useEffect(() => {
    addInsideHoverStyles();
    // eslint-disable-next-line
  }, []);

  const handleMouseLeaveInside = () => {
    if (hasClickedContent) return;
    setIsShrinkingAfterHover(true);

    removeInsideHoverStyles();

    setTimeout(() => {
      setIsShrinkingAfterHover(false);
      setContent(null);
    }, contentTransitionDuration);
  };

  const getScaleRatio = (): number => {
    if (!homeRef.current) return 0;

    const maxWidth = 996;
    if (homeRef.current.offsetWidth > maxWidth) return maxWidth / contentWidth;

    const fullScaleRatio = homeRef.current.offsetWidth / contentWidth;
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
      left: `${(homeRef.current.offsetWidth - width) / 2}px`,
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

  const getImageLink = (img: string | null): string => {
    if (hasContentExpanded) return `https://image.tmdb.org/t/p/original${img}`;
    return `https://image.tmdb.org/t/p/w500${img}`;
  };

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

    if (isShrinkingAfterClick || isShrinkingAfterHover) {
      return {
        width: contentThumbnail.clientWidth,
        height: contentThumbnail.clientHeight,
      };
    }

    return {
      width: contentThumbnail.clientWidth * hoverScaleRatio,
      height: contentThumbnail.clientHeight * hoverScaleRatio,
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
        <Styled.Img src={getImageLink(backdrop_path)} alt={`${name} 썸네일`} onClick={toggleModal} />
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
      <Styled.Inside
        onMouseOver={handleMouseOverInside}
        onMouseLeave={handleMouseLeaveInside}
        style={getInsideStyle()}
        ref={insideRef}
      >
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
