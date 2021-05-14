import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Content from '../../components/Content';
import Row from '../../components/Row';
import * as BREAKPOINTS from '../../constants/breakpoints';
import { HoveredContent } from '../../types';
import { changeRemToPx } from '../../utils/changeRemToPx';
import * as Styled from './styles/Home';
import tvGenres from './tv-genres.json';

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const contentsWrappersRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const slidersRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const contentThumbnailsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [isScrollDown, setIsScrollDown] = useState(false);
  const [sliderContentCount, setSliderContentCount] = useState(6);
  const [content, setContent] = useState<HoveredContent | null>(null);
  const [hasClickedContent, setHasClickedContent] = useState(false);
  const [hasClickedContentThumbnail, setHasClickedContentThumbnail] = useState(false);

  const setContentWidth = () => {
    let newSliderContentCount = 6;
    if (window.innerWidth > changeRemToPx(BREAKPOINTS.XL)) newSliderContentCount = 6;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.LG)) newSliderContentCount = 5;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.MD)) newSliderContentCount = 4;
    else if (window.innerWidth > changeRemToPx(BREAKPOINTS.SM)) newSliderContentCount = 3;
    else newSliderContentCount = 2;
    setSliderContentCount(newSliderContentCount);

    const contentsWrapper = contentsWrappersRef.current[Object.keys(contentsWrappersRef.current)[0]];
    if (!contentsWrapper) return;
    const slider = slidersRef.current[Object.keys(slidersRef.current)[0]];
    if (!slider) return;
    const gap = parseFloat(getComputedStyle(slider).gap);
    const contentWidth = (contentsWrapper.clientWidth - gap * (newSliderContentCount - 1)) / newSliderContentCount;
    document.documentElement.style.setProperty('--content-width', `${contentWidth}px`);
  };

  const removeContent = () => {
    if (isMobile) return;
    setContent(null);
    setHasClickedContent(false);
  };

  useEffect(() => {
    setContentWidth();
    window.addEventListener('resize', setContentWidth);
    window.addEventListener('resize', removeContent);

    return () => {
      window.removeEventListener('resize', setContentWidth);
      window.addEventListener('resize', removeContent);
    };
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    (event.target as HTMLDivElement).scrollTop > 0 ? setIsScrollDown(true) : setIsScrollDown(false);
  };

  const getHomePaddingRight = (): string => {
    if (isMobile) return '';
    if (!homeRef.current) return '';
    return '17px';
  };

  const getHomeStyle = (): React.CSSProperties | undefined => {
    if (hasClickedContent) {
      return {
        overflow: 'hidden',
        paddingRight: getHomePaddingRight(),
      };
    }
  };

  useEffect(() => {
    if (hasClickedContentThumbnail) {
      setHasClickedContent(true);
      setHasClickedContentThumbnail(false);
    }
  }, [content, hasClickedContentThumbnail]);

  return (
    <Styled.Container onScroll={handleScroll} style={getHomeStyle()} ref={homeRef}>
      <Styled.Header className={isScrollDown ? 'scroll-down' : ''}>
        <Styled.LogoLink href="#" aria-label="Netflix Clone" tabIndex={content ? -1 : undefined}>
          NETFLIX.clone
        </Styled.LogoLink>
      </Styled.Header>
      <Styled.Main>
        <Styled.Notification>
          모든 TV 프로그램 데이터베이스는
          <Styled.TMDbLogo
            href="https://www.themoviedb.org/"
            aria-label="The Movie DB"
            tabIndex={content ? -1 : undefined}
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
            contentsWrappersRef={contentsWrappersRef}
            slidersRef={slidersRef}
            contentThumbnailsRef={contentThumbnailsRef}
            tvGenre={tvGenre}
            sliderContentCount={sliderContentCount}
            hasClickedContent={hasClickedContent}
            content={content}
            setContent={setContent}
            setHasClickedContentThumbnail={setHasClickedContentThumbnail}
          />
        ))}
        {content && (
          <Content
            key={content.id}
            homeRef={homeRef}
            contentsWrappersRef={contentsWrappersRef}
            slidersRef={slidersRef}
            contentThumbnailsRef={contentThumbnailsRef}
            content={content}
            hasClickedContent={hasClickedContent}
            setHasClickedContent={setHasClickedContent}
            setContent={setContent}
          />
        )}
      </Styled.Main>
    </Styled.Container>
  );
}
