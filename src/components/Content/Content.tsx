import React, { useRef } from 'react';
import * as BREAKPOINTS from '../../constants/breakpoints';
import CloseIcon from '../../icons/CloseIcon';
import { homeSidePadding } from '../../pages/Home/styles/Home';
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
  const { backdrop_path, genre_ids, id, name, transform_origin } = content;
  const contentRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  let isMouseOnContent = false;

  const closeModal = () => {
    setHasClickedContent(false);
    setTimeout(() => {
      setContent(null);
    }, contentTransitionDuration);
  };

  const handleClickContent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === contentRef.current) closeModal();
  };

  const handleMouseEnterContent = () => {
    isMouseOnContent = true;
  };

  const handleMouseLeaveContent = () => {
    isMouseOnContent = false;

    setTimeout(() => {
      if (isMouseOnContent) return;
      if (hasClickedContent) return;

      setContent(null);
    }, contentTransitionDuration);
  };

  const getContentStyle = (): React.CSSProperties | undefined => {
    if (!hasClickedContent) {
      const genreId = content.genre_ids[0];
      const contentsWrapper = contentsWrappersRef.current[`${genreId}`];
      if (!contentsWrapper) return;
      const contentThumbnail = contentThumbnailsRef.current[`${content.id}`];
      if (!contentThumbnail) return;

      return {
        top: `${contentsWrapper.offsetTop}px`,
        left: `${contentsWrapper.offsetLeft + contentThumbnail.offsetLeft + getSliderTranslationX()}px`,
        fontSize: `${contentWidth / 10}px`,
      };
    }

    if (!homeRef.current) return;
    return {
      top: '0px',
      left: '0px',
      height: `${homeRef.current.clientHeight + homeRef.current.scrollTop}px`,
      fontSize: `${contentWidth / 10}px`,
    };
  };

  const getScaleRatio = (): number => {
    if (!homeRef.current) return 0;
    if (!insideRef.current) return 0;
    const fullScaleRatio = homeRef.current.clientWidth / insideRef.current.clientWidth;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.XL)) return fullScaleRatio * 0.4;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.LG)) return fullScaleRatio * 0.55;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.MD)) return fullScaleRatio * 0.75;
    return fullScaleRatio * 0.995;
  };

  const getSliderTranslationX = (): number => {
    const genreId = genre_ids[0];
    const slider = slidersRef.current[`${genreId}`];
    if (!slider) return 0;
    const sliderTransformMaxtrix = getComputedStyle(slider).transform;
    return parseFloat(sliderTransformMaxtrix.split(', ')[4]);
  };

  const getHomeSidePadding = (): string => {
    if (window.innerWidth < changeRemToPx(BREAKPOINTS.SM)) return homeSidePadding.SM;
    if (window.innerWidth < changeRemToPx(BREAKPOINTS.MD)) return homeSidePadding.MD;
    return homeSidePadding.default;
  };

  const getTranslationX = (): number => {
    const genreId = genre_ids[0];

    if (!homeRef.current) return 0;
    const contentsWrapper = contentsWrappersRef.current[`${genreId}`];
    if (!contentsWrapper) return 0;
    const contentThumbnail = contentThumbnailsRef.current[`${id}`];
    if (!contentThumbnail) return 0;
    if (!insideRef.current) return 0;

    const homeSidePadding = getHomeSidePadding();
    const rightPadding = changeRemToPx(homeSidePadding);
    const leftPadding = homeRef.current.clientWidth - insideRef.current.clientWidth * getScaleRatio() - rightPadding;

    if (transform_origin === 'right') return (rightPadding - leftPadding) / 2;
    if (transform_origin === 'left') return (leftPadding - rightPadding) / 2;
    return (
      -contentsWrapper.offsetLeft -
      contentThumbnail.offsetLeft +
      homeRef.current.clientWidth / 2 -
      insideRef.current.clientWidth / 2 -
      getSliderTranslationX()
    );
  };

  const getInsideStyle = (): React.CSSProperties | undefined => {
    if (!hasClickedContent) {
      return {
        width: `${contentWidth}px`,
        transformOrigin: transform_origin,
      };
    }

    const genreId = genre_ids[0];

    if (!homeRef.current) return;
    const contentsWrapper = contentsWrappersRef.current[`${genreId}`];
    if (!contentsWrapper) return;
    const contentThumbnail = contentThumbnailsRef.current[`${id}`];
    if (!contentThumbnail) return;
    if (!insideRef.current) return;

    const translationY =
      homeRef.current.scrollTop - contentsWrapper.offsetTop + (insideRef.current.clientHeight * getScaleRatio()) / 2;

    return {
      top: `${contentsWrapper.offsetTop}px`,
      left: `${contentsWrapper.offsetLeft + contentThumbnail.offsetLeft + getSliderTranslationX()}px`,
      width: `${contentWidth}px`,
      transform: `translate(${getTranslationX()}px, ${translationY}px) scale(${getScaleRatio()})`,
      transformOrigin: transform_origin,
    };
  };

  const toggleModal = () => {
    hasClickedContent ? closeModal() : setHasClickedContent(true);
  };

  const getImageLink = (img: string | null): string => `https://image.tmdb.org/t/p/original${img}`;

  return (
    <Styled.Container
      className={hasClickedContent ? 'clicked' : ''}
      onClick={handleClickContent}
      onMouseEnter={handleMouseEnterContent}
      onMouseLeave={handleMouseLeaveContent}
      style={getContentStyle()}
      ref={contentRef}
    >
      <Styled.Inside style={getInsideStyle()} ref={insideRef}>
        <Styled.ImgContainer onClick={toggleModal}>
          <Styled.Img src={getImageLink(backdrop_path)} alt={`${name} 썸네일`} />
          <Styled.Title className={`${name.length < 7 && 'short'}`}>{name}</Styled.Title>
          {hasClickedContent && (
            <Styled.CloseButton aria-label="닫기">
              <CloseIcon />
            </Styled.CloseButton>
          )}
        </Styled.ImgContainer>
        <ContentBottomPanel id={id} hasClickedContent={hasClickedContent} setHasClickedContent={setHasClickedContent} />
      </Styled.Inside>
    </Styled.Container>
  );
}
