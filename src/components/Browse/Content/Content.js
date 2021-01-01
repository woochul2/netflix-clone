import React, { useEffect } from 'react';
import { Container, Title, Img } from './ContentStyles';

const TMDB_IMAGE_LINK = `https://image.tmdb.org/t/p/w500/`;

export default function Content({
  item,
  contentTitleFontSize,
  getContentContainerWidth,
}) {
  const { name, backdrop_path } = item;

  useEffect(() => {
    getContentContainerWidth();
  }, []);

  return (
    <Container className="browse-content-container">
      <Title length={name.length} fontSize={contentTitleFontSize}>
        {name}
      </Title>
      <Img src={TMDB_IMAGE_LINK + backdrop_path} />
    </Container>
  );
}
