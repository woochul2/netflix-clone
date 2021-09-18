import React, { useEffect, useRef, useState } from 'react';
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
  hasClickedContent,
  setHasClickedContent,
}: Props) {
  const HOVER_SCALE_RATIO = 2;
  const { backdrop_path, genre_ids, id, transform_origin } = content;
  const title = variant === 'tv' ? content.name : content.title;

  const $browse = browseRef.current as HTMLDivElement;
  const $contentsWrapper = contentsWrappersRef.current[`${genre_ids[0]}`] as HTMLDivElement;
  const $slider = slidersRef.current[`${genre_ids[0]}`] as HTMLDivElement;
  const $contentThumbnail = contentThumbnailsRef.current[`${id}`] as HTMLDivElement;
  const contentRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentBottomPanelRef = useRef<HTMLDivElement>(null);

  const browseWidth = $browse.offsetWidth - getScrollbarWidth();
  const [contentWidth, setContentWidth] = useState($contentThumbnail.getBoundingClientRect().width);
  const contentHeight = $contentThumbnail.getBoundingClientRect().height;
  const fontSize = contentWidth / 10;
  const videos = useVideos(variant, id);

  useEffect(() => {
    const resizeEvent = () => {
      setContentWidth($contentThumbnail.getBoundingClientRect().width);
    };
    window.addEventListener('resize', resizeEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
    // eslint-disable-next-line
  }, []);

  const getContentStyle = (): React.CSSProperties => {
    return {
      height: `${$browse.clientHeight + $browse.scrollTop}px`,
      fontSize: `${fontSize}px`,
    };
  };

  const getSliderTranslationX = (): number => {
    // sliderTransformMaxtrix: matrix(a, b, c, d, tx, ty)
    const sliderTransformMaxtrix = getComputedStyle($slider).transform;
    return parseFloat(sliderTransformMaxtrix.split(', ')[4]);
  };

  const getScaleRatio = (): number => {
    const MAX_WIDTH = 996;
    if (browseWidth > MAX_WIDTH) return MAX_WIDTH / contentWidth;

    const fullScaleRatio = browseWidth / contentWidth;
    if (browseWidth < changeRemToPx(BREAKPOINTS.SM)) return fullScaleRatio * 0.99;
    return fullScaleRatio * 0.97;
  };

  const getInsideBaseStyle = (): { top: number; left: number; width: number; fontSize: number; transform: string } => {
    return {
      top: $contentsWrapper.offsetTop,
      left: $contentsWrapper.offsetLeft + $contentThumbnail.offsetLeft + getSliderTranslationX(),
      width: contentWidth * getScaleRatio(),
      fontSize: fontSize * getScaleRatio(),
      transform: `scale(${1 / getScaleRatio()})`,
    };
  };

  const addInsideHoverStyles = () => {
    const $inside = insideRef.current as HTMLDivElement;

    const getTranslateX = (): number => {
      if (transform_origin === 'left') return 0;
      if (transform_origin === 'right') return -contentWidth * (HOVER_SCALE_RATIO - 1);
      return (-contentWidth * (HOVER_SCALE_RATIO - 1)) / 2;
    };

    const translate = `translate(${getTranslateX()}px, ${-contentHeight * (HOVER_SCALE_RATIO - 1)}px)`;
    const scale = `scale(${(1 / getScaleRatio()) * HOVER_SCALE_RATIO})`;
    const baseStyle = getInsideBaseStyle();
    $inside.style.transform = `${baseStyle.transform}px`;
    $inside.style.transform = `${translate} ${scale}`;

    (contentBottomPanelRef.current as HTMLDivElement).style.visibility = 'visible';
  };

  useEffect(() => {
    addInsideHoverStyles();
    // eslint-disable-next-line
  }, []);

  const removeInsideHoverStyles = () => {
    const $inside = insideRef.current as HTMLDivElement;
    const baseStyle = getInsideBaseStyle();
    $inside.style.width = `${baseStyle.width}px`;
    $inside.style.fontSize = `${baseStyle.fontSize}px`;
    $inside.style.transform = baseStyle.transform;
  };

  const handleMouseLeaveInside = () => {
    if (hasClickedContent) return;
    removeInsideHoverStyles();

    setTimeout(() => {
      setContent(null);
    }, contentTransitionDuration);
  };

  const closeModal = () => {
    setHasClickedContent(false);
    removeInsideHoverStyles();
    (contentBottomPanelRef.current as HTMLDivElement).style.visibility = '';

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

  const getInsideStyle = (): React.CSSProperties | undefined => {
    const baseStyle = getInsideBaseStyle();
    if (!hasClickedContent) return baseStyle;
    const translateX = -baseStyle.left + (browseWidth - baseStyle.width) / 2;
    const translateY = -baseStyle.top + 50 + $browse.scrollTop;
    return {
      ...baseStyle,
      transform: `translate(${translateX}px, ${translateY}px) scale(1)`,
    };
  };

  const toggleModal = () => {
    if (hasClickedContent) {
      closeModal();
    } else {
      setHasClickedContent(true);
      (contentBottomPanelRef.current as HTMLDivElement).style.visibility = '';
    }
  };

  useEffect(() => {
    const $img = imgRef.current;
    if ($img) $img.src = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  }, [backdrop_path]);

  const ImgOrVideo = (): JSX.Element => {
    const video = videos?.results
      .filter((result) => result.type === 'Trailer')
      .find((result) => result.site === 'YouTube');

    if (video) {
      const baseStyle = getInsideBaseStyle();
      return (
        <Styled.Iframe
          title={video.name}
          width={baseStyle.width}
          height={contentHeight * getScaleRatio()}
          src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1`}
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
