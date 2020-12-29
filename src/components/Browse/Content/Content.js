import React from 'react';
import { Container, Img } from './ContentStyles';

export default function Content({ src }) {
  return (
    <Container>
      <Img src={src} />
    </Container>
  );
}
