import React, { useEffect, useState } from 'react';
import * as BREAKPOINTS from '../../constants/breakpoints';
import CloseIcon from '../../icons/CloseIcon';
import { changeRemToPx } from '../../utils/changeRemToPx';
import ContentBottomPanel from '../ContentBottomPanel';
import * as Styled from './styles/Content';

const getImageLink = (img: string | null): string => `https://image.tmdb.org/t/p/original${img}`;

const disableBackdropKeyboardTab = () => {
  const anchors = document.querySelectorAll('a');
  anchors.forEach((anchor) => {
    anchor.tabIndex = -1;
  });
};

const enableBackdropKeyboardTab = () => {
  const anchors = document.querySelectorAll('a');
  anchors.forEach((anchor) => {
    if (anchor.tabIndex === -1) anchor.tabIndex = 0;
  });
};

const hideSliderControlButton = () => {
  const sliderControlButtons = document.querySelectorAll<HTMLElement>('.slider-control-button');
  sliderControlButtons.forEach((button) => {
    button.style.display = 'none';
  });
};

const showSliderControlButton = () => {
  const sliderControlButtons = document.querySelectorAll<HTMLElement>('.slider-control-button');
  sliderControlButtons.forEach((button) => {
    button.style.display = '';
  });
};

interface Props {
  item: TvShows.Result;
  transformOrigin: 'center' | 'left' | 'right';
}

export default function Content({ item, transformOrigin }: Props) {
  const { backdrop_path, genre_ids, id, name } = item;
  const [isClicked, setIsClicked] = useState(false);
  const [scaleRatio, setScaleRatio] = useState<number | null>(null);

  const getContentHeight = (): string => {
    const home = document.querySelector<HTMLElement>('.home');
    if (!home) return '';
    return `${home.clientHeight + home.scrollTop}px`;
  };

  const handleMouseLeave = () => {
    if (isClicked) return;
    const content = document.querySelector<HTMLElement>(`.content-${id}`);
    if (!content) return;
    content.style.zIndex = '1';
    setTimeout(() => {
      content.style.zIndex = '';
    }, Styled.transitionDuration);
  };

  useEffect(() => {
    const home = document.querySelector<HTMLElement>('.home');
    if (!home) return;

    if (isClicked) {
      home.style.overflowY = 'hidden';
      if (window.innerWidth > changeRemToPx(BREAKPOINTS.SM)) {
        home.style.paddingRight = '17px';
      }
      return;
    }

    if (!isClicked) {
      home.style.overflowY = 'visible';
      home.style.paddingRight = '0';
    }
  }, [isClicked]);

  useEffect(() => {
    if (scaleRatio) {
      const genreId = genre_ids[0];

      const home = document.querySelector<HTMLElement>('.home');
      if (!home) return;
      const rowContentsContainer = document.querySelector<HTMLElement>(`.row-contents-container-${genreId}`);
      if (!rowContentsContainer) return;
      const slider = document.querySelector<HTMLElement>(`.slider-${genreId}`);
      if (!slider) return;
      const content = document.querySelector<HTMLElement>(`.content-${id}`);
      if (!content) return;
      const contentInner = document.querySelector<HTMLElement>(`.content-inner-${id}`);
      if (!contentInner) return;

      contentInner.style.top = `${contentInner.offsetTop + rowContentsContainer.offsetTop}px`;
      contentInner.style.left = `${
        contentInner.offsetLeft +
        rowContentsContainer.offsetLeft +
        parseFloat(getComputedStyle(slider).transform.split(', ')[4])
      }px`;

      const xTransLength =
        -contentInner.offsetLeft +
        home.clientWidth / 2 -
        contentInner.clientWidth / 2 -
        (rowContentsContainer.offsetLeft + parseFloat(getComputedStyle(slider).transform.split(', ')[4]));
      const yTransLength =
        home.scrollTop + (contentInner.clientHeight * scaleRatio) / 2 - rowContentsContainer.offsetTop;
      setIsClicked(true);
      content.classList.add('clicked');
      contentInner.classList.add('clicked');
      contentInner.style.transform = `translate(${xTransLength}px, ${yTransLength}px) scale(${scaleRatio})`;
    }
  }, [scaleRatio, id, genre_ids]);

  const getFullScaleRatio = (): number => {
    const home = document.querySelector<HTMLElement>('.home');
    if (!home) return 0;
    const contentInner = document.querySelector<HTMLElement>(`.content-inner-${id}`);
    if (!contentInner) return 0;
    return home.clientWidth / contentInner.clientWidth;
  };

  const toggleModal = () => {
    const genreId = genre_ids[0];
    const rowContentsContainer = document.querySelector<HTMLElement>(`.row-contents-container-${genreId}`);
    if (!rowContentsContainer) return;
    const slider = document.querySelector<HTMLElement>(`.slider-${genreId}`);
    if (!slider) return;
    const contentInner = document.querySelector<HTMLElement>(`.content-inner-${id}`);
    if (!contentInner) return;
    const content = document.querySelector<HTMLElement>(`.content-${id}`);
    if (!content) return;

    if (isClicked) {
      setScaleRatio(0);
      contentInner.style.top = '';
      contentInner.style.left = '';
      setIsClicked(false);
      enableBackdropKeyboardTab();
      content.classList.remove('clicked');
      contentInner.classList.remove('clicked');
      content.style.zIndex = '1';
      contentInner.classList.add('shrinking');
      setTimeout(() => {
        content.style.zIndex = '';
        contentInner.classList.remove('shrinking');
      }, Styled.transitionDuration);
      setTimeout(() => {
        rowContentsContainer.style.zIndex = 'auto';
      }, Styled.transitionDuration);
      showSliderControlButton();
      content.style.top = '';
      content.style.left = '';
      contentInner.style.transform = '';
      return;
    }

    disableBackdropKeyboardTab();
    rowContentsContainer.style.zIndex = '990';
    hideSliderControlButton();
    content.style.top = `${-rowContentsContainer.offsetTop}px`;
    content.style.left = `${-(
      rowContentsContainer.offsetLeft + parseFloat(getComputedStyle(slider).transform.split(', ')[4])
    )}px`;

    const fullScaleRatio = getFullScaleRatio();
    const { innerWidth } = window;
    if (innerWidth > changeRemToPx(BREAKPOINTS.XL)) {
      setScaleRatio(fullScaleRatio * 0.4);
      return;
    }
    if (innerWidth > changeRemToPx(BREAKPOINTS.LG)) {
      setScaleRatio(fullScaleRatio * 0.5);
      return;
    }
    if (innerWidth > changeRemToPx(BREAKPOINTS.MD)) {
      setScaleRatio(fullScaleRatio * 0.75);
      return;
    }
    setScaleRatio(fullScaleRatio * 0.995);
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const content = document.querySelector<HTMLElement>(`.content-${id}`);
    if (!content) return;
    if (event.target === content) toggleModal();
  };

  return (
    <>
      <Styled.Container className={`content-${id}`} contentHeight={getContentHeight()} onClick={handleClickModal}>
        <Styled.Inner
          className={`content-inner-${id}`}
          onMouseLeave={handleMouseLeave}
          transformOrigin={transformOrigin}
        >
          <Styled.ImgContainer className="content-img-container" onClick={toggleModal}>
            <Styled.Title length={name.length}>{name}</Styled.Title>
            <Styled.Img src={getImageLink(backdrop_path)} alt={`${name} 썸네일`} />
            {isClicked && (
              <Styled.CloseButton>
                <CloseIcon />
              </Styled.CloseButton>
            )}
          </Styled.ImgContainer>
          <ContentBottomPanel id={id} isClicked={isClicked} toggleModal={toggleModal} />
        </Styled.Inner>
      </Styled.Container>
      {isClicked && <Styled.FakeContent></Styled.FakeContent>}
    </>
  );
}
