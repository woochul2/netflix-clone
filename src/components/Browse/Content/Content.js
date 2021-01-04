import React, { useState, useEffect } from 'react';
import {
  Container,
  ImgContainer,
  Title,
  Img,
  CloseButton,
  ModalBackground,
  transitionDuration,
} from './ContentStyles';
import * as BREAKPOINTS from '../../../constants/breakpoints';
import { changeRemToPx } from '../../../utils';
import { IoCloseOutline } from 'react-icons/io5';
import ContentBottomPanel from '../ContentBottomPanel';

const getImageLink = (img) => {
  return `https://image.tmdb.org/t/p/original/${img}`;
};

export default function Content({
  item,
  initContentTitleFontSize,
  isMouseOnContent,
  setIsMouseOnContent,
}) {
  const { name, backdrop_path, id } = item;
  const containerClassName = `browse-content-${id}`;
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isContentOnTopZ, setIsContentOnTopZ] = useState(false);
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
      }, transitionDuration);
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

  const getTransLength = () => {
    const body = document.querySelector('body');
    const container = document.querySelector(`.${containerClassName}`);
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
      getTransLength();
    }
  }, [scaleRatio]);

  const getFullScaleRatio = () => {
    return (
      document.querySelector('body').offsetWidth /
      document.querySelector(`.${containerClassName}`).offsetWidth
    );
  };

  const toggleModal = () => {
    if (transLength) {
      setScaleRatio(0);
      setTransLength(null);
      setIsContentOnTopZ(true);
      return;
    }

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
    setScaleRatio(fullScaleRatio);
  };

  return (
    <>
      <Container
        className={containerClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isMouseOn={isMouseOn}
        isContentOnTopZ={isContentOnTopZ}
        transLength={transLength}
        scaleRatio={scaleRatio}
      >
        <ImgContainer
          className="browse-content-img-container"
          isMouseOn={isMouseOn}
          transLength={transLength}
          onClick={toggleModal}
        >
          <Title length={name.length}>{name}</Title>
          <Img src={getImageLink(backdrop_path)} />
          {transLength && (
            <CloseButton>
              <IoCloseOutline />
            </CloseButton>
          )}
        </ImgContainer>
        <ContentBottomPanel
          id={id}
          isMouseOn={isMouseOn}
          transLength={transLength}
          toggleModal={toggleModal}
        />
      </Container>
      {transLength && (
        <ModalBackground
          onClick={toggleModal}
          height={`${document.querySelector('body').offsetHeight}px`}
        />
      )}
    </>
  );
}
