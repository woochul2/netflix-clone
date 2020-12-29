import React from 'react';
import { Container, Img } from './ContentStyles';

const TMDB_IMAGE_LINK = `https://image.tmdb.org/t/p/w500/`;

export default function Content({ poster }) {
  return (
    <Container>
      <Img src={TMDB_IMAGE_LINK + poster} />
    </Container>
  );
}
