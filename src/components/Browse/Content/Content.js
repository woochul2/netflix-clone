import React, { useState, useEffect } from 'react';
import {
  Container,
  ImgContainer,
  Title,
  Img,
  CloseButton,
  BottomPanel,
  PanelButton,
  Text,
  ModalBackground,
  transitionDuration,
} from './ContentStyles';
import * as BREAKPOINTS from '../../../constants/breakpoints';
import { IoCloseOutline } from 'react-icons/io5';
import { BsChevronDown } from 'react-icons/bs';

const TMDB_IMAGE_LINK = `https://image.tmdb.org/t/p/original/`;

export default function Content({
  item,
  initContentTitleFontSize,
  isMouseOnContent,
  setIsMouseOnContent,
}) {
  const {
    name,
    backdrop_path,
    id,
    first_air_date,
    overview,
    vote_average,
  } = item;
  const containerClassName = `browse-content-${id}`;
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isMouseLeave, setIsMouseLeave] = useState(false);
  // transLength는 모달 이벤트가 발생했을 때, 컨텐츠를 화면에서 얼마나 옮길지에 대한 정보를 가진다.
  // 모달 이벤트가 발생했는가를 판단하기 위해서도 사용했다.
  const [transLength, setTransLength] = useState(null);
  const [scaleRatio, setScaleRatio] = useState(0);

  useEffect(() => {
    initContentTitleFontSize();
  }, []);

  useEffect(() => {
    // isMouseLeave는 컨텐츠 위에 마우스를 올렸다가 뗐을 때,
    // 줄어드는 동안에도 z-index를 주변의 컨텐츠보다 높게 설정하기 위해 만든 변수이다.
    // 모달 이벤트가 발생한 뒤 컨텐츠가 줄어들 때도 z-index를 제어하기 위해 사용했다.
    // isMouseOnContent는 컨텐츠 위에 마우스를 올렸다가 다른 컨텐츠로 즉시 마우스를 옮겼을 때,
    // 늘어나는 컨텐츠의 z-index가 줄어드는 컨텐츠의 z-index보다 높게 하려고 만든 변수이다.
    if (isMouseOnContent || transLength) {
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
    if (scaleRatio != 0) {
      getTransLength();
    }
  }, [scaleRatio]);

  const getFullScaleRatio = () => {
    return (
      document.querySelector('body').offsetWidth /
      document.querySelector(`.${containerClassName}`).offsetWidth
    );
  };

  const changeRemToPx = (remVal) => {
    const body = document.querySelector('body');
    const bodyFontSize = parseFloat(
      window.getComputedStyle(body).getPropertyValue('font-size')
    );
    return remVal.split('rem')[0] * bodyFontSize;
  };

  const handletoggleModal = () => {
    if (transLength) {
      setScaleRatio(0);
      setTransLength(null);
      setIsMouseLeave(true);
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
        isMouseLeave={isMouseLeave}
        transLength={transLength}
        scaleRatio={scaleRatio}
      >
        <ImgContainer
          className="browse-content-img-container"
          isMouseOn={isMouseOn}
          transLength={transLength}
          onClick={handletoggleModal}
        >
          <Title length={name.length}>{name}</Title>
          <Img src={TMDB_IMAGE_LINK + backdrop_path} />
          {transLength && (
            <CloseButton>
              <IoCloseOutline />
            </CloseButton>
          )}
        </ImgContainer>
        <BottomPanel isMouseOn={isMouseOn} transLength={transLength}>
          {!transLength && (
            <PanelButton onClick={handletoggleModal}>
              <BsChevronDown />
            </PanelButton>
          )}
          {transLength && (
            <>
              <Text>
                {overview.split('. ').join('.\n').split('?').join('?\n')}
              </Text>
              <Text>첫 방송 날짜: {first_air_date.split('-').join('.')}</Text>
              <Text>회원 평점: {vote_average}</Text>
            </>
          )}
        </BottomPanel>
      </Container>
      {transLength && (
        <ModalBackground
          height={`${document.querySelector('body').offsetHeight}px`}
          onClick={handletoggleModal}
        />
      )}
    </>
  );
}
