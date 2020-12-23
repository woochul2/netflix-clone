import React from 'react';
import {
  Container,
  Inner,
  TextContainer,
  Title,
  SubTitle,
  Image,
} from './styles';
import jumboData from './jumboData';

export default function Jumbotron() {
  return (
    <>
      {jumboData.map((item) => (
        <Container key={item.id} direction={item.direction}>
          <Inner>
            <TextContainer>
              <Title>{item.title}</Title>
              <SubTitle>{item.subTitle}</SubTitle>
            </TextContainer>
            <Image src={item.image} alt={item.alt} />
          </Inner>
        </Container>
      ))}
    </>
  );
}
