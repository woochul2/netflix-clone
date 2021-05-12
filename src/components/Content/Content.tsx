import React, { useEffect, useRef } from 'react';
import * as BREAKPOINTS from '../../constants/breakpoints';
import CloseIcon from '../../icons/CloseIcon';
import { homeSidePadding } from '../../pages/Home/styles/Home';
import { HoveredContent } from '../../types';
import { changeRemToPx } from '../../utils/changeRemToPx';
import ContentBottomPanel from '../ContentBottomPanel';
import * as Styled from './styles/Content';

interface Props {
  item: HoveredContent;
  home: React.RefObject<HTMLDivElement>;
  contentsWrappers: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  sliders: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  contentThumbnails: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  content: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredContent: HoveredContent | null;
  hasClickedContent: boolean;
  setHasClickedContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Content({
  item,
  home,
  contentsWrappers,
  sliders,
  contentThumbnails,
  content,
  onMouseEnter,
  onMouseLeave,
  hoveredContent,
  hasClickedContent,
  setHasClickedContent,
}: Props) {
  const contentInside = useRef<HTMLDivElement>(null);
  const { backdrop_path, genre_ids, id, name } = item;

  useEffect(() => {
    if (!contentInside.current) return;
    contentInside.current.style.transformOrigin = item.transform_origin;
  }, [id, item]);

  const setContentShrinking = () => {
    if (hasClickedContent) return;

    if (!content.current) return;
    content.current.classList.add('shrinking');
    setTimeout(() => {
      if (!content.current) return;
      content.current.classList.remove('shrinking');
    }, Styled.contentTransitionDuration);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
    setContentShrinking();
  };

  const getScaleRatio = (): number => {
    if (!home.current) return 0;
    if (!contentInside.current) return 0;
    const fullScaleRatio = home.current.clientWidth / contentInside.current.clientWidth;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.XL)) return fullScaleRatio * 0.4;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.LG)) return fullScaleRatio * 0.55;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.MD)) return fullScaleRatio * 0.75;
    return fullScaleRatio * 0.995;
  };

  const openModal = () => {
    const genreId = genre_ids[0];

    if (!home.current) return;
    const contentsWrapper = contentsWrappers.current[`${genreId}`];
    if (!contentsWrapper) return;
    const slider = sliders.current[`${genreId}`];
    if (!slider) return;
    if (!content.current) return;
    const contentThumbnail = contentThumbnails.current[`${id}`];
    if (!contentThumbnail) return;
    if (!contentInside.current) return;

    home.current.style.overflowY = 'hidden';
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.SM)) home.current.style.paddingRight = '17px';

    content.current.style.top = `0px`;
    content.current.style.left = `0px`;
    content.current.style.height = `${home.current.clientHeight + home.current.scrollTop}px`;

    contentInside.current.style.top = `${contentInside.current.offsetTop + contentsWrapper.offsetTop}px`;
    contentInside.current.style.left = `${
      contentThumbnail.offsetLeft +
      contentsWrapper.offsetLeft +
      parseFloat(getComputedStyle(slider).transform.split(', ')[4])
    }px`;

    const scaleRatio = getScaleRatio();

    let xTransLength =
      -contentThumbnail.offsetLeft +
      home.current.clientWidth / 2 -
      contentInside.current.clientWidth / 2 -
      (contentsWrapper.offsetLeft + parseFloat(getComputedStyle(slider).transform.split(', ')[4]));
    const rightPadding = changeRemToPx(homeSidePadding);
    const leftPadding = home.current.clientWidth - contentInside.current.clientWidth * scaleRatio - rightPadding;
    if (item.transform_origin === 'right') xTransLength = -(leftPadding - rightPadding) / 2;
    if (item.transform_origin === 'left') xTransLength = -(rightPadding - leftPadding) / 2;

    const yTransLength =
      home.current.scrollTop + (contentInside.current.clientHeight * scaleRatio) / 2 - contentsWrapper.offsetTop;

    contentInside.current.classList.add('clicked');
    contentInside.current.style.transform = `translate(${xTransLength}px, ${yTransLength}px) scale(${scaleRatio})`;

    content.current.classList.add('clicked');

    setHasClickedContent(true);
  };

  const closeModal = () => {
    const genreId = genre_ids[0];

    if (!home.current) return;
    const contentsWrapper = contentsWrappers.current[`${genreId}`];
    if (!contentsWrapper) return;
    const slider = sliders.current[`${genreId}`];
    if (!slider) return;
    const contentThumbnail = contentThumbnails.current[`${id}`];
    if (!contentThumbnail) return;
    if (!content.current) return;
    if (!contentInside.current) return;

    home.current.style.overflowY = '';
    home.current.style.paddingRight = '';

    content.current.classList.remove('clicked');
    content.current.style.top = `${contentsWrapper.offsetTop}px`;
    content.current.style.left = `${
      contentsWrapper.offsetLeft +
      contentThumbnail.offsetLeft +
      parseFloat(getComputedStyle(slider).transform.split(', ')[4])
    }px`;
    content.current.style.height = '';

    contentInside.current.classList.remove('clicked');
    contentInside.current.classList.add('shrinking');
    contentInside.current.style.top = '';
    contentInside.current.style.left = '';
    contentInside.current.style.transform = '';

    setTimeout(() => {
      if (!contentInside.current) return;
      contentInside.current.classList.remove('shrinking');
    }, Styled.contentTransitionDuration);

    setHasClickedContent(false);
  };

  const toggleModal = () => {
    hasClickedContent ? closeModal() : openModal();
  };

  const getImageLink = (img: string | null): string => `https://image.tmdb.org/t/p/original${img}`;

  const handleClickContent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!content.current) return;
    if (event.target === content.current) closeModal();
  };

  const setContentPosition = () => {
    if (!hoveredContent) return;

    const genreId = hoveredContent.genre_ids[0];
    const contentsWrapper = contentsWrappers.current[`${genreId}`];
    if (!contentsWrapper) return;
    const slider = sliders.current[`${genreId}`];
    if (!slider) return;
    const contentThumbnail = contentThumbnails.current[`${hoveredContent.id}`];
    if (!contentThumbnail) return;

    return {
      top: `${contentsWrapper.offsetTop}px`,
      left: `${
        contentsWrapper.offsetLeft +
        contentThumbnail.offsetLeft +
        parseFloat(getComputedStyle(slider).transform.split(', ')[4])
      }px`,
    };
  };

  return (
    <Styled.Container
      onClick={handleClickContent}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={setContentPosition()}
      ref={content}
    >
      <Styled.Inside ref={contentInside}>
        <Styled.ImgContainer className="content-img-container" onClick={toggleModal}>
          <Styled.Img src={getImageLink(backdrop_path)} alt={`${name} 썸네일`} />
          <Styled.Title className={`${name.length < 7 && 'short'}`}>{name}</Styled.Title>
          {hasClickedContent && (
            <Styled.CloseButton aria-label="닫기">
              <CloseIcon />
            </Styled.CloseButton>
          )}
        </Styled.ImgContainer>
        <ContentBottomPanel id={id} hasClickedContent={hasClickedContent} toggleModal={toggleModal} />
      </Styled.Inside>
    </Styled.Container>
  );
}
