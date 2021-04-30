import React, { useEffect } from 'react';
import Row from '../../components/Row';
import { setContentFontSize } from '../../utils/setContentFontSize';
import * as Styled from './styles/Home';
import tvGenres from './tv-genres.json';

export default function Home() {
  const changeHeaderBackground = () => {
    const header = document.querySelector('.home-header') as HTMLElement;
    window.scrollY > 0 ? header.classList.add('scroll-down') : header.classList.remove('scroll-down');
  };

  useEffect(() => {
    window.addEventListener('scroll', changeHeaderBackground);
    window.addEventListener('resize', setContentFontSize);

    return () => {
      window.removeEventListener('scroll', changeHeaderBackground);
      window.removeEventListener('resize', setContentFontSize);
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
          <Row key={tvGenre.id} genreId={tvGenre.id} genreName={tvGenre.name} />
        ))}
      </Styled.Main>
    </Styled.Container>
  );
}
