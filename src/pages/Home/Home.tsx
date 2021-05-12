import React, { useEffect, useRef, useState } from 'react';
import Content from '../../components/Content';
import { contentTransitionDuration } from '../../components/Content/styles/Content';
import Row from '../../components/Row';
import * as BREAKPOINTS from '../../constants/breakpoints';
import { HoveredContent } from '../../types';
import { changeRemToPx } from '../../utils/changeRemToPx';
import * as Styled from './styles/Home';
import tvGenres from './tv-genres.json';

export default function Home() {
  const home = useRef<HTMLDivElement>(null);
  const contentsWrappers = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const sliders = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const contentThumbnails = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const content = useRef<HTMLDivElement>(null);

  const [isScrollDown, setIsScrollDown] = useState(false);
  const [sliderContentCount, setSliderContentCount] = useState(6);
  const [hoveredContent, setHoveredContent] = useState<HoveredContent | null>(null);
  const [hasClickedContent, setHasClickedContent] = useState(false);
  let isMouseOnContent = false;

  const handleScrollHome = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    (event.target as HTMLDivElement).scrollTop > 0 ? setIsScrollDown(true) : setIsScrollDown(false);
  };

  const setContentStyles = () => {
    let newSliderContentCount = 6;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.XL)) newSliderContentCount = 6;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.LG)) newSliderContentCount = 5;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.MD)) newSliderContentCount = 4;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.SM)) newSliderContentCount = 3;
    else newSliderContentCount = 2;
    setSliderContentCount(newSliderContentCount);

    const firstKey = Object.keys(contentsWrappers.current)[0];
    const contentsWrapper = contentsWrappers.current[firstKey];
    if (!contentsWrapper) return;
    const gap = parseFloat(getComputedStyle(contentsWrapper).gap);
    const contentWidth = (contentsWrapper.clientWidth - gap * (newSliderContentCount - 1)) / newSliderContentCount;
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

      if (content.current?.classList.contains('clicked')) return;

      const contentThumbnail = contentThumbnails.current[`${hoveredContent.id}`];
      if (!contentThumbnail) return;
      contentThumbnail.style.boxShadow = '';

      setHoveredContent(null);
    }, contentTransitionDuration);
  };

  return (
    <Styled.Container onScroll={handleScrollHome} ref={home}>
      <Styled.Header className={isScrollDown ? 'scroll-down' : ''}>
        <Styled.LogoLink href="#" aria-label="Netflix Clone" tabIndex={hasClickedContent ? -1 : undefined}>
          NETFLIX.clone
        </Styled.LogoLink>
      </Styled.Header>
      <Styled.Main>
        <Styled.Notification>
          모든 TV 프로그램 데이터베이스는
          <Styled.TMDbLogo
            href="https://www.themoviedb.org/"
            aria-label="The Movie DB"
            tabIndex={hasClickedContent ? -1 : undefined}
          >
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
            contentsWrappers={contentsWrappers}
            sliders={sliders}
            contentThumbnails={contentThumbnails}
            genreId={tvGenre.id}
            genreName={tvGenre.name}
            initContentStyles={initContentStyles}
            sliderContentCount={sliderContentCount}
            hoveredContent={hoveredContent}
            setHoveredContent={setHoveredContent}
            hasClickedContent={hasClickedContent}
          />
        ))}
        {hoveredContent && (
          <Content
            key={hoveredContent.id}
            home={home}
            contentsWrappers={contentsWrappers}
            sliders={sliders}
            contentThumbnails={contentThumbnails}
            content={content}
            item={hoveredContent}
            onMouseEnter={handleMouseEnterContent}
            onMouseLeave={handleMouseLeaveContent}
            hoveredContent={hoveredContent}
            hasClickedContent={hasClickedContent}
            setHasClickedContent={setHasClickedContent}
          />
        )}
      </Styled.Main>
    </Styled.Container>
  );
}
