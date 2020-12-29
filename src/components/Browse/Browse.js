import React, { useState, useEffect } from 'react';
import * as STYLES from '../../constants/styles';
import {
  Container,
  Header,
  LogoLinkContainer,
  Nav,
  Navtab,
  Main,
} from './BrowseStyles';
import LogoLink from '../LogoLink';
import Row from './Row';
import Footer from '../Footer';

export default function Browse() {
  const [isHeaderOnTop, setIsHeaderOnTop] = useState(false);

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

  return (
    <Container>
      <Header isHeaderOnTop={isHeaderOnTop}>
        <LogoLink Container={LogoLinkContainer} />
        <Nav>
          <Navtab to="#">Home</Navtab>
        </Nav>
      </Header>
      <Main>
        <Row />
        <Row />
      </Main>
      <Footer variant="browse" padding={STYLES.browsePadding} />
    </Container>
  );
}
