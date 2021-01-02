import React, { useState, useEffect } from 'react';
import {
  Container,
  ImgContainer,
  Title,
  Img,
  BottomPanel,
  RoundButton,
  transitionDuration,
} from './ContentStyles';
import { BsChevronDown } from 'react-icons/bs';

const TMDB_IMAGE_LINK = `https://image.tmdb.org/t/p/w500/`;

export default function Content({
  item,
  initContentTitleFontSize,
  isMouseOnContent,
  setIsMouseOnContent,
}) {
  const { name, backdrop_path } = item;
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isMouseLeave, setIsMouseLeave] = useState(false);

  useEffect(() => {
    initContentTitleFontSize();
  }, []);

  useEffect(() => {
    if (isMouseOnContent) {
      setIsMouseLeave(false);
      return;
    }

    if (isMouseLeave) {
      setTimeout(() => {
        setIsMouseLeave(false);
      }, transitionDuration);
    }
  }, [isMouseLeave]);

  const handleMouseEnter = () => {
    setIsMouseOn(true);
    setIsMouseOnContent(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOn(false);
    setIsMouseOnContent(false);
    setIsMouseLeave(true);
  };

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isMouseOn={isMouseOn}
      isMouseLeave={isMouseLeave}
    >
      <ImgContainer
        className="browse-content-img-container"
        isMouseOn={isMouseOn}
      >
        <Title length={name.length}>{name}</Title>
        <Img src={TMDB_IMAGE_LINK + backdrop_path} />
      </ImgContainer>
      <BottomPanel isMouseOn={isMouseOn}>
        <RoundButton>
          <BsChevronDown />
        </RoundButton>
      </BottomPanel>
    </Container>
  );
}
