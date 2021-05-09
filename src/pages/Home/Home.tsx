import React, { useEffect, useState } from 'react';
import Content from '../../components/Content';
import { contentTransitionDuration } from '../../components/Content/styles/Content';
import Row from '../../components/Row';
import * as BREAKPOINTS from '../../constants/breakpoints';
import { HoveredContent } from '../../types';
import { changeRemToPx } from '../../utils/changeRemToPx';
import * as Styled from './styles/Home';
import tvGenres from './tv-genres.json';

export default function Home() {
  const [sliderContentCount, setSliderContentCount] = useState(6);
  const [hoveredContent, setHoveredContent] = useState<HoveredContent | null>(null);
  let isMouseOnContent = false;

  const changeHeaderBackground = () => {
    const home = document.querySelector<HTMLElement>('.home');
    if (!home) return;
    const header = document.querySelector<HTMLElement>('.home-header');
    if (!header) return;
    home.scrollTop > 0 ? header.classList.add('scroll-down') : header.classList.remove('scroll-down');
  };

  useEffect(() => {
    const home = document.querySelector<HTMLElement>('.home');
    if (!home) return;
    home.addEventListener('scroll', changeHeaderBackground);

    return () => {
      home.removeEventListener('scroll', changeHeaderBackground);
    };
  }, []);

  const setContentStyles = () => {
    let newSliderContentCount = 6;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.XL)) newSliderContentCount = 6;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.LG)) newSliderContentCount = 5;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.MD)) newSliderContentCount = 4;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.SM)) newSliderContentCount = 3;
    else newSliderContentCount = 2;
    setSliderContentCount(newSliderContentCount);

    const rowContentsWrapper = document.querySelector<HTMLElement>('.row-contents-wrapper');
    if (!rowContentsWrapper) return;
    const gap = parseFloat(getComputedStyle(rowContentsWrapper).gap);
    const contentWidth = (rowContentsWrapper.clientWidth - gap * (newSliderContentCount - 1)) / newSliderContentCount;
    document.documentElement.style.setProperty('--content-width', `${contentWidth}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', setContentStyles);

    return () => {
      window.removeEventListener('resize', setContentStyles);
    };
  }, []);

  const initContentStyles = () => {
    const contentWidth = getComputedStyle(document.documentElement).getPropertyValue('--content-width').trim();
    if (contentWidth === '0px') setContentStyles();
  };

  const handleMouseEnterContent = () => {
    isMouseOnContent = true;
  };

  const handleMouseLeaveContent = () => {
    isMouseOnContent = false;
    setTimeout(() => {
      if (isMouseOnContent) return;
      if (!hoveredContent) return;

      const content = document.querySelector<HTMLElement>(`.content-${hoveredContent.id}.clicked`);
      if (content) return;

      const contentThumbnail = document.querySelector<HTMLElement>(`.content-thumbnail-${hoveredContent.id}`);
      if (!contentThumbnail) return;
      contentThumbnail.style.boxShadow = '';

      setHoveredContent(null);
    }, contentTransitionDuration);
  };

  return (
    <Styled.Container className="home">
      <Styled.Header className="home-header">
        <Styled.LogoLink href="#" aria-label="Netflix Clone">
          NETFLIX.clone
        </Styled.LogoLink>
      </Styled.Header>
      <Styled.Main>
        <Styled.Notification>
          모든 TV 프로그램 데이터베이스는
          <Styled.TMDbLogo href="https://www.themoviedb.org/" aria-label="The Movie DB">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
              alt="The Movie DB 로고"
            />
          </Styled.TMDbLogo>
          에서 받아왔습니다.
        </Styled.Notification>
        {tvGenres.map((tvGenre) => (
          <Row
            key={tvGenre.id}
            genreId={tvGenre.id}
            genreName={tvGenre.name}
            initContentStyles={initContentStyles}
            sliderContentCount={sliderContentCount}
            hoveredContent={hoveredContent}
            setHoveredContent={setHoveredContent}
          />
        ))}
        {hoveredContent && (
          <Content
            key={hoveredContent.id}
            item={hoveredContent}
            onMouseEnter={handleMouseEnterContent}
            onMouseLeave={handleMouseLeaveContent}
            hoveredContent={hoveredContent}
          />
        )}
      </Styled.Main>
    </Styled.Container>
  );
}
