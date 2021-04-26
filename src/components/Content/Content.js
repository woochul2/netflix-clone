import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import * as BREAKPOINTS from '../../constants/breakpoints';
import { changeRemToPx } from '../../utils';
import ContentBottomPanel from '../ContentBottomPanel';
import * as Styled from './styles/Content';

const getImageLink = (img) => {
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
    if (anchor.tabIndex == -1) {
      anchor.tabIndex = 0;
    }
  });
};

export default function Content({
  item,
  initContentTitleFontSize,
  isMouseOnContent,
  setIsMouseOnContent,
}) {
  const { name, backdrop_path, id } = item;
  const modalClassName = `modal-${id}`;
  const contentClassName = `browse-content-${id}`;
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isContentOnTopZ, setIsContentOnTopZ] = useState(false);
  const [contentOffset, setContentOffset] = useState(null);
  const [transLength, setTransLength] = useState(null);
  const [scaleRatio, setScaleRatio] = useState(null);

  useEffect(() => {
    initContentTitleFontSize();
  }, []);

  useEffect(() => {
    if (isMouseOnContent) {
      setIsContentOnTopZ(false);
      return;
    }

    if (isContentOnTopZ) {
      setTimeout(() => {
        setIsContentOnTopZ(false);
      }, Styled.transitionDuration);
    }
  }, [isContentOnTopZ]);

  const handleMouseEnter = () => {
    setIsMouseOn(true);
    setIsMouseOnContent(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOn(false);
    setIsMouseOnContent(false);
    if (!transLength) {
      setIsContentOnTopZ(true);
    }
  };

  useEffect(() => {
    const body = document.querySelector('body');
    const html = document.querySelector('html');
    if (transLength) {
      body.style.overflowY = 'hidden';
      if (window.innerWidth > changeRemToPx(BREAKPOINTS.SM)) {
        body.style.paddingRight = '15px';
      }
      html.style.backgroundColor = 'var(--black)';
      return;
    }

    if (!transLength) {
      body.style.overflowY = 'visible';
      body.style.paddingRight = '0';
      html.style.backgroundColor = '0';
    }
  }, [transLength]);

  const getOffset = () => {
    const container = document.querySelector(`.${contentClassName}`);
    setContentOffset({
      top: `${container.offsetTop}px`,
      left: `${container.offsetLeft}px`,
      width: `${container.offsetWidth}px`,
      height: `${container.offsetHeight}px`,
    });
  };

  const getTransLength = () => {
    const body = document.querySelector('body');
    const container = document.querySelector(`.${contentClassName}`);
    const xTransLength =
      body.offsetWidth / 2 - container.offsetLeft - container.offsetWidth / 2;
    const yTransLength =
      window.scrollY -
      container.offsetTop +
      (container.offsetHeight * scaleRatio) / 2;
    setTransLength({ x: `${xTransLength}px`, y: `${yTransLength}px` });
  };

  useEffect(() => {
    if (scaleRatio) {
      getOffset();
      getTransLength();
    }
  }, [scaleRatio]);

  const getFullScaleRatio = () => {
    return (
      document.querySelector('body').offsetWidth /
      document.querySelector(`.${contentClassName}`).offsetWidth
    );
  };

  const toggleModal = () => {
    if (transLength) {
      setScaleRatio(0);
      setContentOffset(null);
      setTransLength(null);
      setIsContentOnTopZ(true);
      enableBackdropKeyboardTab();
      return;
    }

    disableBackdropKeyboardTab();

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

  const handleClickModal = (event) => {
    const modal = document.querySelector(`.${modalClassName}`);
    if (event.target == modal) {
      toggleModal();
    }
  };

  return (
    <>
      <Styled.Container
        className={modalClassName}
        isMouseOn={isMouseOn}
        isContentOnTopZ={isContentOnTopZ}
        transLength={transLength}
        contentHeight={`${window.innerHeight + window.scrollY}px`}
        onClick={handleClickModal}
      >
        <Styled.Inner
          className={contentClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isMouseOn={isMouseOn}
          transLength={transLength}
          contentOffset={contentOffset}
          scaleRatio={scaleRatio}
        >
          <Styled.ImgContainer
            className="browse-content-img-container"
            isMouseOn={isMouseOn}
            transLength={transLength}
            onClick={toggleModal}
          >
            <Styled.Title length={name.length}>{name}</Styled.Title>
            <Styled.Img src={getImageLink(backdrop_path)} />
            {transLength && (
              <Styled.CloseButton>
                <IoCloseOutline />
              </Styled.CloseButton>
            )}
          </Styled.ImgContainer>
          <ContentBottomPanel
            id={id}
            isMouseOn={isMouseOn}
            transLength={transLength}
            toggleModal={toggleModal}
          />
        </Styled.Inner>
      </Styled.Container>
      {transLength && (
        <Styled.FakeContent contentOffset={contentOffset}></Styled.FakeContent>
      )}
    </>
  );
}
