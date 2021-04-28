import { useEffect, useState } from 'react';
import Row from '../../components/Row';
import * as Styled from './styles/Home';
import tvGenres from './tv-genres.json';

export default function Home() {
  const [isHeaderOnTop, setIsHeaderOnTop] = useState(false);
  const [contentTitleFontSize, setContentTitleFontSize] = useState('0px');
  const [isMouseOnContent, setIsMouseOnContent] = useState(false);

  const checkHeaderLocation = () => {
    if (window.scrollY > 0) {
      setIsHeaderOnTop(true);
      return;
    }

    if (window.scrollY === 0) {
      setIsHeaderOnTop(false);
      return;
    }
  };

  const getContentContainerWidth = () => {
    const contentImgContainer = document.querySelector('.content-img-container') as HTMLElement;
    setContentTitleFontSize(`${contentImgContainer.offsetWidth / 10}px`);
  };

  const initContentTitleFontSize = () => {
    if (contentTitleFontSize === '0px') {
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
    <Styled.Container fontSize={contentTitleFontSize}>
      <Styled.Header isHeaderOnTop={isHeaderOnTop}>
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
