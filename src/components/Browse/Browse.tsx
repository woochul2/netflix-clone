import React, { useEffect, useRef, useState } from 'react';
import { BREAKPOINTS, PATHS } from '../../constants';
import GithubIcon from '../../icons/GithubIcon';
import { changeRemToPx } from '../../utils/changeRemToPx';
import { getScrollbarWidth } from '../../utils/getScrollbarWidth';
import Content from '../Content';
import Row from '../Row';
import { sliderGap } from '../Row/styles/Row';
import * as Styled from './styles/Browse';

interface Props {
  variant: 'tv' | 'movie';
  genres: { id: number; name: string }[];
}

export default function Browse({ variant, genres }: Props) {
  const homeRef = useRef<HTMLDivElement>(null);
  const contentsWrappersRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const slidersRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const contentThumbnailsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [isScrollDown, setIsScrollDown] = useState(false);
  const [sliderContentCount, setSliderContentCount] = useState(6);
  const [content, setContent] = useState<any>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [hasClickedContent, setHasClickedContent] = useState(false);

  const changeContentWidth = () => {
    let newSliderContentCount = 6;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.XL)) newSliderContentCount = 6;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.LG)) newSliderContentCount = 5;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.MD)) newSliderContentCount = 4;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.SM)) newSliderContentCount = 3;
    else newSliderContentCount = 2;
    setSliderContentCount(newSliderContentCount);

    const contentsWrapper = contentsWrappersRef.current[Object.keys(contentsWrappersRef.current)[0]];
    if (!contentsWrapper) return;
    const gap = changeRemToPx(sliderGap);
    const newContentWidth = (contentsWrapper.clientWidth - gap * (newSliderContentCount - 1)) / newSliderContentCount;
    document.documentElement.style.setProperty('--content-width', `${newContentWidth}px`);
    setContentWidth(newContentWidth);
  };

  useEffect(() => {
    changeContentWidth();
    window.addEventListener('resize', changeContentWidth);

    return () => {
      window.removeEventListener('resize', changeContentWidth);
    };
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    (event.target as HTMLDivElement).scrollTop > 0 ? setIsScrollDown(true) : setIsScrollDown(false);
  };

  const getHomeStyle = (): React.CSSProperties | undefined => {
    if (hasClickedContent) {
      return {
        overflow: 'hidden',
        paddingRight: getScrollbarWidth(),
      };
    }
  };

  return (
    <Styled.Container onScroll={handleScroll} style={getHomeStyle()} ref={homeRef}>
      <Styled.Header className={isScrollDown ? 'scroll-down' : ''}>
        <Styled.LogoLink to={PATHS.TV} aria-label="Netflix Clone" tabIndex={content ? -1 : undefined}>
          NETFLIX.clone
        </Styled.LogoLink>
        <Styled.Nav>
          <Styled.NavTab to={PATHS.TV} aria-label="TV 프로그램" tabIndex={content ? -1 : undefined}>
            TV 프로그램
          </Styled.NavTab>
          <Styled.NavTab to={PATHS.MOVIES} aria-label="영화" tabIndex={content ? -1 : undefined}>
            영화
          </Styled.NavTab>
        </Styled.Nav>
        <Styled.GithubLink
          href="https://github.com/woochul2/netflix-clone"
          aria-label="깃허브"
          tabIndex={content ? -1 : undefined}
          target="blank"
        >
          <GithubIcon />
        </Styled.GithubLink>
      </Styled.Header>
      <Styled.Main>
        <Styled.Notification>
          모든 데이터베이스는
          <Styled.TMDbLogoLink
            href="https://www.themoviedb.org/"
            aria-label="The Movie DB"
            tabIndex={content ? -1 : undefined}
          >
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
              alt="The Movie DB 로고"
            />
          </Styled.TMDbLogoLink>
          에서 받아왔습니다.
        </Styled.Notification>
        {genres.map((genre) => (
          <Row
            key={genre.id}
            contentsWrappersRef={contentsWrappersRef}
            slidersRef={slidersRef}
            contentThumbnailsRef={contentThumbnailsRef}
            variant={variant}
            genre={genre}
            sliderContentCount={sliderContentCount}
            hasClickedContent={hasClickedContent}
            setHasClickedContent={setHasClickedContent}
            content={content}
            setContent={setContent}
          />
        ))}
        {content && (
          <Content
            key={content.id}
            homeRef={homeRef}
            contentsWrappersRef={contentsWrappersRef}
            slidersRef={slidersRef}
            contentThumbnailsRef={contentThumbnailsRef}
            variant={variant}
            content={content}
            setContent={setContent}
            contentWidth={contentWidth}
            hasClickedContent={hasClickedContent}
            setHasClickedContent={setHasClickedContent}
          />
        )}
      </Styled.Main>
    </Styled.Container>
  );
}
