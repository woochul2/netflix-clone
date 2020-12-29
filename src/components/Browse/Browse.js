import React, { useState, useEffect } from 'react';
import * as STYLES from '../../constants/styles';
import { TMDB_API_KEY } from '../../private-config';
import {
  Container,
  Header,
  LogoLinkContainer,
  Nav,
  Navtab,
  Main,
  Notification,
  TMDbLogo,
} from './BrowseStyles';
import LogoLink from '../LogoLink';
import Row from './Row';
import Footer from '../Footer';

const TMDB_TV_GENRES_LINK = `https://api.themoviedb.org/3/genre/tv/list?api_key=${TMDB_API_KEY}&language=ko`;

export default function Browse() {
  const [isHeaderOnTop, setIsHeaderOnTop] = useState(false);
  const [tvGenres, setTvGenres] = useState([]);

  const checkHeaderLocation = () => {
    if (window.scrollY > 0) {
      setIsHeaderOnTop(true);
      return;
    }
    if (window.scrollY == 0) {
      setIsHeaderOnTop(false);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkHeaderLocation);
  }, []);

  const getTvGenres = async () => {
    const response = await fetch(TMDB_TV_GENRES_LINK);
    const json = await response.json();
    setTvGenres(json.genres);
  };

  useEffect(() => {
    getTvGenres();
  }, []);

  return (
    <Container>
      <Header isHeaderOnTop={isHeaderOnTop}>
        <LogoLink Container={LogoLinkContainer} />
        <Nav>
          <Navtab to="#">TV Shows</Navtab>
        </Nav>
      </Header>
      <Main>
        <Notification>
          모든 TV Show 데이터베이스는
          <TMDbLogo href="https://www.themoviedb.org/">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
              alt="The Movie DB Logo"
            />
          </TMDbLogo>
          에서 받아왔습니다.
        </Notification>
        {tvGenres.map((item) => (
          <Row key={item.id} genreId={item.id} genreName={item.name} />
        ))}
      </Main>
      <Footer variant="browse" padding={STYLES.browsePadding} />
    </Container>
  );
}
