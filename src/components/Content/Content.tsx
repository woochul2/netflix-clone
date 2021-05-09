import React, { useEffect, useState } from 'react';
import * as BREAKPOINTS from '../../constants/breakpoints';
import CloseIcon from '../../icons/CloseIcon';
import { homeSidePadding } from '../../pages/Home/styles/Home';
import { HoveredContent } from '../../types';
import { changeRemToPx } from '../../utils/changeRemToPx';
import ContentBottomPanel from '../ContentBottomPanel';
import * as Styled from './styles/Content';

interface Props {
  item: HoveredContent;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredContent: HoveredContent | null;
}

export default function Content({ item, onMouseEnter, onMouseLeave, hoveredContent }: Props) {
  const { backdrop_path, genre_ids, id, name } = item;
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const contentInside = document.querySelector<HTMLElement>(`.content-inside-${id}`);
    if (!contentInside) return;
    contentInside.style.transformOrigin = item.transform_origin;
  }, [id, item]);

  const setContentShrinking = () => {
    if (isClicked) return;

    const content = document.querySelector<HTMLElement>(`.content-${id}`);
    if (!content) return;
    content.classList.add('shrinking');
    setTimeout(() => {
      content.classList.remove('shrinking');
    }, Styled.contentTransitionDuration);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
    setContentShrinking();
  };

  const disableAnchorsKeyboardTab = () => {
    const anchors = document.querySelectorAll('a');
    anchors.forEach((anchor) => (anchor.tabIndex = -1));
  };

  const enableAnchorsKeyboardTab = () => {
    const anchors = document.querySelectorAll('a');
    Array.from(anchors)
      .filter((anchor) => anchor.tabIndex === -1)
      .forEach((anchor) => anchor.removeAttribute('tabindex'));
  };

  const hideSliderControlButtons = () => {
    const sliderControlButtons = document.querySelectorAll<HTMLElement>('.slider-control-button');
    sliderControlButtons.forEach((button) => (button.style.display = 'none'));
  };

  const showSliderControlButtons = () => {
    const sliderControlButtons = document.querySelectorAll<HTMLElement>('.slider-control-button');
    sliderControlButtons.forEach((button) => (button.style.display = ''));
  };

  const getScaleRatio = (): number => {
    const home = document.querySelector<HTMLElement>('.home');
    if (!home) return 0;
    const contentInside = document.querySelector<HTMLElement>(`.content-inside-${id}`);
    if (!contentInside) return 0;
    const fullScaleRatio = home.clientWidth / contentInside.clientWidth;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.XL)) return fullScaleRatio * 0.4;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.LG)) return fullScaleRatio * 0.55;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.MD)) return fullScaleRatio * 0.75;
    return fullScaleRatio * 0.995;
  };

  const openModal = () => {
    const genreId = genre_ids[0];

    const home = document.querySelector<HTMLElement>('.home');
    if (!home) return;
    const rowContentsWrapper = document.querySelector<HTMLElement>(`.row-contents-wrapper-${genreId}`);
    if (!rowContentsWrapper) return;
    const slider = document.querySelector<HTMLElement>(`.slider-${genreId}`);
    if (!slider) return;
    const content = document.querySelector<HTMLElement>(`.content-${id}`);
    if (!content) return;
    const contentThumbnail = document.querySelector<HTMLElement>(`.content-thumbnail-${id}`);
    if (!contentThumbnail) return;
    const contentInside = document.querySelector<HTMLElement>(`.content-inside-${id}`);
    if (!contentInside) return;

    disableAnchorsKeyboardTab();
    hideSliderControlButtons();

    home.style.overflowY = 'hidden';
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.SM)) home.style.paddingRight = '17px';

    content.style.top = `0px`;
    content.style.left = `0px`;
    content.style.height = `${home.clientHeight + home.scrollTop}px`;

    contentInside.style.top = `${contentInside.offsetTop + rowContentsWrapper.offsetTop}px`;
    contentInside.style.left = `${
      contentThumbnail.offsetLeft +
      rowContentsWrapper.offsetLeft +
      parseFloat(getComputedStyle(slider).transform.split(', ')[4])
    }px`;

    const scaleRatio = getScaleRatio();

    let xTransLength =
      -contentThumbnail.offsetLeft +
      home.clientWidth / 2 -
      contentInside.clientWidth / 2 -
      (rowContentsWrapper.offsetLeft + parseFloat(getComputedStyle(slider).transform.split(', ')[4]));
    const rightPadding = changeRemToPx(homeSidePadding);
    const leftPadding = home.clientWidth - contentInside.clientWidth * scaleRatio - rightPadding;
    if (item.transform_origin === 'right') xTransLength = -(leftPadding - rightPadding) / 2;
    if (item.transform_origin === 'left') xTransLength = -(rightPadding - leftPadding) / 2;

    const yTransLength = home.scrollTop + (contentInside.clientHeight * scaleRatio) / 2 - rowContentsWrapper.offsetTop;

    contentInside.classList.add('clicked');
    contentInside.style.transform = `translate(${xTransLength}px, ${yTransLength}px) scale(${scaleRatio})`;

    content.classList.add('clicked');

    setIsClicked(true);
  };

  const closeModal = () => {
    const genreId = genre_ids[0];

    const home = document.querySelector<HTMLElement>('.home');
    if (!home) return;
    const rowContentsWrapper = document.querySelector<HTMLElement>(`.row-contents-wrapper-${genreId}`);
    if (!rowContentsWrapper) return;
    const slider = document.querySelector<HTMLElement>(`.slider-${genreId}`);
    if (!slider) return;
    const contentThumbnail = document.querySelector<HTMLElement>(`.content-thumbnail-${id}`);
    if (!contentThumbnail) return;
    const content = document.querySelector<HTMLElement>(`.content-${id}`);
    if (!content) return;
    const contentInside = document.querySelector<HTMLElement>(`.content-inside-${id}`);
    if (!contentInside) return;

    enableAnchorsKeyboardTab();
    showSliderControlButtons();

    home.style.overflowY = '';
    home.style.paddingRight = '';

    content.classList.remove('clicked');
    content.style.top = `${rowContentsWrapper.offsetTop}px`;
    content.style.left = `${
      rowContentsWrapper.offsetLeft +
      contentThumbnail.offsetLeft +
      parseFloat(getComputedStyle(slider).transform.split(', ')[4])
    }px`;
    content.style.height = '';

    contentInside.classList.remove('clicked');
    contentInside.classList.add('shrinking');
    contentInside.style.top = '';
    contentInside.style.left = '';
    contentInside.style.transform = '';

    setTimeout(() => {
      contentInside.classList.remove('shrinking');
    }, Styled.contentTransitionDuration);

    setIsClicked(false);
  };

  const toggleModal = () => {
    isClicked ? closeModal() : openModal();
  };

  const getImageLink = (img: string | null): string => `https://image.tmdb.org/t/p/original${img}`;

  const handleClickContent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const content = document.querySelector<HTMLElement>(`.content-${id}`);
    if (!content) return;
    if (event.target === content) closeModal();
  };

  const setContentPosition = () => {
    if (!hoveredContent) return;

    const genreId = hoveredContent.genre_ids[0];
    const rowContentsWrapper = document.querySelector<HTMLElement>(`.row-contents-wrapper-${genreId}`);
    if (!rowContentsWrapper) return;
    const slider = document.querySelector<HTMLElement>(`.slider-${genreId}`);
    if (!slider) return;
    const contentThumbnail = document.querySelector<HTMLElement>(`.content-thumbnail-${hoveredContent.id}`);
    if (!contentThumbnail) return;

    return {
      top: `${rowContentsWrapper.offsetTop}px`,
      left: `${
        rowContentsWrapper.offsetLeft +
        contentThumbnail.offsetLeft +
        parseFloat(getComputedStyle(slider).transform.split(', ')[4])
      }px`,
    };
  };

  return (
    <Styled.Container
      className={`content content-${id}`}
      onClick={handleClickContent}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={setContentPosition()}
    >
      <Styled.Inside className={`content-inside-${id}`}>
        <Styled.ImgContainer className="content-img-container" onClick={toggleModal}>
          <Styled.Img src={getImageLink(backdrop_path)} alt={`${name} 썸네일`} />
          <Styled.Title className={`content-title-${id} ${name.length < 7 && 'short'}`}>{name}</Styled.Title>
          {isClicked && (
            <Styled.CloseButton aria-label="닫기">
              <CloseIcon />
            </Styled.CloseButton>
          )}
        </Styled.ImgContainer>
        <ContentBottomPanel id={id} isClicked={isClicked} toggleModal={toggleModal} />
      </Styled.Inside>
    </Styled.Container>
  );
}
