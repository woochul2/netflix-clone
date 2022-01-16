import React, { useEffect, useRef, useState } from 'react';
import { BREAKPOINTS, PATHS } from '../../constants';
import GithubIcon from '../../icons/GithubIcon';
import { changeRemToPx } from '../../utils/changeRemToPx';
import { getScrollbarWidth } from '../../utils/getScrollbarWidth';
import { getWindowHeight } from '../../utils/getWindowHeight';
import Content from '../Content';
import Row from '../Row';
import { sliderGap } from '../Row/styles/Row';
import * as Styled from './styles/Browse';

interface Props {
  variant: 'tv' | 'movie';
  genres: { id: number; name: string }[];
}

export default function Browse({ variant, genres }: Props) {
  const browseRef = useRef<HTMLDivElement>(null);
  const contentsWrappersRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const slidersRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const contentThumbnailsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [isScrollDown, setIsScrollDown] = useState(false);
  const [sliderContentCount, setSliderContentCount] = useState(6);
  const [content, setContent] = useState<any>(null);
  const [hasClickedContent, setHasClickedContent] = useState(false);

  useEffect(() => {
    const changeContentWidth = () => {
      let newSliderContentCount = 6;
      if (document.body.clientWidth > changeRemToPx(BREAKPOINTS.XL)) newSliderContentCount = 6;
      else if (document.body.clientWidth > changeRemToPx(BREAKPOINTS.LG)) newSliderContentCount = 5;
      else if (document.body.clientWidth > changeRemToPx(BREAKPOINTS.MD)) newSliderContentCount = 4;
      else if (document.body.clientWidth > changeRemToPx(BREAKPOINTS.SM)) newSliderContentCount = 3;
      else newSliderContentCount = 2;
      setSliderContentCount(newSliderContentCount);

      const contentsWrapper = contentsWrappersRef.current[Object.keys(contentsWrappersRef.current)[0]];
      if (!contentsWrapper) return;
      const gap = changeRemToPx(sliderGap);
      const newContentWidth = (contentsWrapper.clientWidth - gap * (newSliderContentCount - 1)) / newSliderContentCount;
      document.documentElement.style.setProperty('--content-width', `${newContentWidth}px`);
    };

    const changeBrowseHeight = () => {
      if (!browseRef.current) return;
      browseRef.current.style.height = `${getWindowHeight()}px`;
    };

    const resizeEvent = () => {
      changeContentWidth();
      changeBrowseHeight();
    };

    const orientationChangeEvent = () => {
      setTimeout(() => {
        resizeEvent();
      }, 1);
    };

    changeContentWidth();

    window.addEventListener('resize', resizeEvent);
    window.addEventListener('orientationchange', orientationChangeEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent);
      window.removeEventListener('orientationchange', orientationChangeEvent);
    };
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    (event.target as HTMLDivElement).scrollTop > 0 ? setIsScrollDown(true) : setIsScrollDown(false);
  };

  const getBrowseStyle = (): React.CSSProperties | undefined => {
    const common = { height: getWindowHeight() };

    if (hasClickedContent) {
      return {
        ...common,
        overflow: 'hidden',
        paddingRight: getScrollbarWidth(),
      };
    }

    return common;
  };

  const handleClickLink = () => {
    (browseRef.current as HTMLDivElement).scrollTop = 0;
  };

  return (
    <Styled.Container onScroll={handleScroll} style={getBrowseStyle()} ref={browseRef}>
      <Styled.Header
        className={isScrollDown ? 'scroll-down' : ''}
        style={{ marginRight: hasClickedContent ? `${-getScrollbarWidth()}px` : '' }}
      >
        <Styled.LogoLink
          to={PATHS.TV_SHOWS}
          aria-label="Netflix Clone"
          tabIndex={content ? -1 : undefined}
          onClick={handleClickLink}
        >
          NETFLIX.clone
        </Styled.LogoLink>
        <Styled.Nav>
          <Styled.NavTab
            exact
            to={PATHS.TV_SHOWS}
            aria-label="TV 프로그램"
            tabIndex={content ? -1 : undefined}
            onClick={handleClickLink}
          >
            TV 프로그램
          </Styled.NavTab>
          <Styled.NavTab
            exact
            to={PATHS.MOVIES}
            aria-label="영화"
            tabIndex={content ? -1 : undefined}
            onClick={handleClickLink}
          >
            영화
          </Styled.NavTab>
        </Styled.Nav>
        <Styled.GithubLink
          href="https://github.com/woochul2/netflix-clone"
          aria-label="깃허브"
          tabIndex={content ? -1 : undefined}
          target="blank"
          style={{ marginRight: hasClickedContent ? `${getScrollbarWidth()}px` : '' }}
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
            browseRef={browseRef}
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
            browseRef={browseRef}
            contentsWrappersRef={contentsWrappersRef}
            slidersRef={slidersRef}
            contentThumbnailsRef={contentThumbnailsRef}
            variant={variant}
            content={content}
            setContent={setContent}
            hasClickedContent={hasClickedContent}
            setHasClickedContent={setHasClickedContent}
          />
        )}
      </Styled.Main>
    </Styled.Container>
  );
}
