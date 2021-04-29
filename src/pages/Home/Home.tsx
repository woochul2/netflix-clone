import React, { useEffect, useState } from 'react';
import Row from '../../components/Row';
import * as Styled from './styles/Home';
import tvGenres from './tv-genres.json';

export default function Home() {
  const [isMouseOnContent, setIsMouseOnContent] = useState(false);

  const checkHeaderLocation = () => {
    const header = document.querySelector('.home-header') as HTMLElement;
    window.scrollY > 0 ? header.classList.add('scroll-down') : header.classList.remove('scroll-down');
  };

  const setContentTitleFontSize = () => {
    const contentImgContainer = document.querySelector('.content-img-container') as HTMLElement;
    // 컨텐츠 제목 크기가 이미지 너비의 1/10로 했을 때가 가장 적절함
    const fontSize = `${contentImgContainer.offsetWidth / 10}px`;
    document.documentElement.style.setProperty('--content-font-size', fontSize);
  };

  const initContentTitleFontSize = () => {
    const contentTitleFontSize = getComputedStyle(document.documentElement)
      .getPropertyValue('--content-font-size')
      .trim();

    if (contentTitleFontSize === '0px') {
      setContentTitleFontSize();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkHeaderLocation);
    window.addEventListener('resize', setContentTitleFontSize);

    return () => {
      window.removeEventListener('scroll', checkHeaderLocation);
      window.removeEventListener('resize', setContentTitleFontSize);
    };
  }, []);

  return (
    <Styled.Container>
      <Styled.Header className="home-header">
        <Styled.LogoLink href="#">NETFLIX.clone</Styled.LogoLink>
      </Styled.Header>
      <Styled.Main>
        <Styled.Notification>
          모든 TV 프로그램 데이터베이스는
          <Styled.TMDbLogo href="https://www.themoviedb.org/">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
              alt="The Movie DB Logo"
            />
          </Styled.TMDbLogo>
          에서 받아왔습니다.
        </Styled.Notification>
        {tvGenres.map((tvGenre) => (
          <Row
            key={tvGenre.id}
            genreId={tvGenre.id}
            genreName={tvGenre.name}
            initContentTitleFontSize={initContentTitleFontSize}
            isMouseOnContent={isMouseOnContent}
            setIsMouseOnContent={setIsMouseOnContent}
          />
        ))}
      </Styled.Main>
    </Styled.Container>
  );
}
