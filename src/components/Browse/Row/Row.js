import React from 'react';
import { Container, Title, ContentsContainer } from './RowStyles';
import Content from '../Content';

export default function Row() {
  return (
    <Container>
      <Title>Row Title</Title>
      <ContentsContainer>
        <Content src="https://source.unsplash.com/random?1" />
        <Content src="https://source.unsplash.com/random?2" />
        <Content src="https://source.unsplash.com/random?3" />
        <Content src="https://source.unsplash.com/random?4" />
        <Content src="https://source.unsplash.com/random?5" />
        <Content src="https://source.unsplash.com/random?6" />
      </ContentsContainer>
    </Container>
  );
}
