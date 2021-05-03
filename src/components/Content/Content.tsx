import React, { useEffect, useState } from 'react';
import * as BREAKPOINTS from '../../constants/breakpoints';
import CloseIcon from '../../icons/CloseIcon';
import { changeRemToPx } from '../../utils/changeRemToPx';
import ContentBottomPanel from '../ContentBottomPanel';
import * as Styled from './styles/Content';

const getImageLink = (img: string | null): string => {
  return `https://image.tmdb.org/t/p/original${img}`;
};

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

interface Props {
  item: TvShows.Result;
}

export default function Content({ item }: Props) {
  const { name, backdrop_path, id } = item;
  const modalClassName = `modal-${id}`;
  const contentClassName = `content-${id}`;
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isContentOnTopZ, setIsContentOnTopZ] = useState(false);
  const [contentOffset, setContentOffset] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [transLength, setTransLength] = useState<{ x: string; y: string } | null>(null);
  const [scaleRatio, setScaleRatio] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: '', left: '' });
  const home = document.querySelector<HTMLElement>('.home') as HTMLElement;
  // if (!home) return;

  useEffect(() => {
    if (isContentOnTopZ) {
      setTimeout(() => {
        setIsContentOnTopZ(false);
      }, Styled.transitionDuration);
    }
  }, [isContentOnTopZ]);

  const handleMouseEnter = () => {
    setIsMouseOn(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOn(false);

    if (!transLength) setIsContentOnTopZ(true);
  };

  useEffect(() => {
    const home = document.querySelector<HTMLElement>('.home');
    if (!home) return;

    if (transLength) {
      home.style.overflowY = 'hidden';
      return;
    }

    if (!transLength) {
      home.style.overflowY = 'visible';
      home.style.paddingRight = '0';
    }
  }, [transLength]);

  useEffect(() => {
    const genreId = item.genre_ids[0];
    const rowContentsContainer = document.querySelector<HTMLElement>(
      `.row-contents-container.row-contents-container-${genreId}`
    );
    if (!rowContentsContainer) return;
    const rowSlider = document.querySelector<HTMLElement>(`.row-slider.row-slider-${genreId}`);
    if (!rowSlider) return;

    const getOffset = () => {
      const container = document.querySelector(`.${contentClassName}`) as HTMLElement;
      setContentOffset({
        top: `${container.offsetTop + rowContentsContainer.offsetTop}px`,
        left: `${
          container.offsetLeft +
          rowContentsContainer.offsetLeft +
          parseFloat(getComputedStyle(rowSlider).transform.split(', ')[4])
        }px`,
      });
    };

    const getTransLength = () => {
      const home = document.querySelector<HTMLElement>('.home');
      if (!home) return;
      const container = document.querySelector(`.${contentClassName}`) as HTMLElement;
      const xTransLength = home.clientWidth / 2 - container.offsetLeft - container.clientWidth / 2;
      const yTransLength = home.scrollTop - container.offsetTop + (container.clientHeight * (scaleRatio as number)) / 2;
      setTransLength({
        x: `${
          xTransLength -
          (rowContentsContainer.offsetLeft + parseFloat(getComputedStyle(rowSlider).transform.split(', ')[4]))
        }px`,
        y: `${yTransLength - rowContentsContainer.offsetTop}px`,
      });
    };

    if (scaleRatio) {
      getOffset();
      getTransLength();
    }
  }, [scaleRatio, contentClassName, item.genre_ids]);

  const getFullScaleRatio = (): number => {
    const home = document.querySelector<HTMLElement>('.home') as HTMLElement;
    return home.clientWidth / (document.querySelector(`.${contentClassName}`) as HTMLElement).clientWidth;
  };

  const toggleModal = () => {
    const genreId = item.genre_ids[0];
    const rowContentsContainer = document.querySelector<HTMLElement>(
      `.row-contents-container.row-contents-container-${genreId}`
    );
    if (!rowContentsContainer) return;
    const rowSlider = document.querySelector<HTMLElement>(`.row-slider.row-slider-${genreId}`);
    if (!rowSlider) return;

    if (transLength) {
      setScaleRatio(0);
      setContentOffset(null);
      setTransLength(null);
      setIsContentOnTopZ(true);
      enableBackdropKeyboardTab();
      setTimeout(() => {
        rowContentsContainer.style.zIndex = 'auto';
      }, Styled.transitionDuration);
      document.documentElement.style.setProperty('--slider-control-button-display', 'initial');
      setModalPosition({ top: '', left: '' });
      return;
    }

    disableBackdropKeyboardTab();
    rowContentsContainer.style.zIndex = '990';
    document.documentElement.style.setProperty('--slider-control-button-display', 'none');
    setModalPosition({
      top: `${-rowContentsContainer.offsetTop}px`,
      left: `${-(
        rowContentsContainer.offsetLeft + parseFloat(getComputedStyle(rowSlider).transform.split(', ')[4])
      )}px`,
    });

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
    const modal = document.querySelector(`.${modalClassName}`) as HTMLElement;
    if (event.target === modal) toggleModal();
  };

  return (
    <>
      <Styled.Container
        className={modalClassName}
        isMouseOn={isMouseOn}
        isContentOnTopZ={isContentOnTopZ}
        transLength={transLength}
        contentHeight={`${home.clientHeight + home.scrollTop}px`}
        modalPosition={modalPosition}
        onClick={handleClickModal}
      >
        <Styled.Inner
          className={`${contentClassName} content`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isMouseOn={isMouseOn}
          transLength={transLength}
          contentOffset={contentOffset}
          scaleRatio={scaleRatio}
        >
          <Styled.ImgContainer
            className="content-img-container"
            isMouseOn={isMouseOn}
            transLength={transLength}
            onClick={toggleModal}
          >
            <Styled.Title length={name.length}>{name}</Styled.Title>
            <Styled.Img src={getImageLink(backdrop_path)} />
            {transLength && (
              <Styled.CloseButton>
                <CloseIcon />
              </Styled.CloseButton>
            )}
          </Styled.ImgContainer>
          <ContentBottomPanel id={id} isMouseOn={isMouseOn} transLength={transLength} toggleModal={toggleModal} />
        </Styled.Inner>
      </Styled.Container>
      {transLength && <Styled.FakeContent></Styled.FakeContent>}
    </>
  );
}
