import React from 'react';
import {
  Container,
  Inner,
  TextContainer,
  Title,
  SubTitle,
  Image,
} from './JumbotronStyles';

export default function Jumbotron({ item }) {
  return (
    <Container>
      <Inner direction={item.direction}>
        <TextContainer>
          <Title>{item.title}</Title>
          <SubTitle>{item.subTitle}</SubTitle>
        </TextContainer>
        <Image src={item.image} alt={item.alt} />
      </Inner>
    </Container>
  );
}
