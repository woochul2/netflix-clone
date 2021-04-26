import React, { useEffect, useState } from 'react';
import Row from '../../components/Row';
import {
  Container,
  Header,
  LogoLink,
  Main,
  Nav,
  Navtab,
  Notification,
  TMDbLogo,
} from './BrowseStyles';
import tvGenresData from './tv-genres';

export default function Browse() {
  const [isHeaderOnTop, setIsHeaderOnTop] = useState(false);
  const [contentTitleFontSize, setContentTitleFontSize] = useState('0px');
  const [isMouseOnContent, setIsMouseOnContent] = useState(false);

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

  const getContentContainerWidth = () => {
    const width = document.querySelector('.browse-content-img-container')
      .offsetWidth;
    setContentTitleFontSize(`${width / 10}px`);
  };

  const initContentTitleFontSize = () => {
    if (contentTitleFontSize == '0px') {
      getContentContainerWidth();
    }
  };

  useEffect(() => {
    checkHeaderLocation();
    window.addEventListener('scroll', checkHeaderLocation);
    window.addEventListener('resize', getContentContainerWidth);

    return () => {
      window.removeEventListener('scroll', checkHeaderLocation);
      window.removeEventListener('resize', getContentContainerWidth);
    };
  }, []);

  return (
    <Container fontSize={contentTitleFontSize}>
      <Header isHeaderOnTop={isHeaderOnTop}>
        <Nav>
          <LogoLink href="#">NETFLIX.clone</LogoLink>
          <Navtab href="#">TV 프로그램</Navtab>
        </Nav>
      </Header>
      <Main>
        <Notification>
          모든 TV 프로그램 데이터베이스는
          <TMDbLogo href="https://www.themoviedb.org/">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
              alt="The Movie DB Logo"
            />
          </TMDbLogo>
          에서 받아왔습니다.
        </Notification>
        {tvGenresData.map((item) => (
          <Row
            key={item.id}
            genreId={item.id}
            genreName={item.name}
            initContentTitleFontSize={initContentTitleFontSize}
            isMouseOnContent={isMouseOnContent}
            setIsMouseOnContent={setIsMouseOnContent}
          />
        ))}
      </Main>
    </Container>
  );
}
