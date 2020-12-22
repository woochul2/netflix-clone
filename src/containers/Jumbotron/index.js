import React from 'react';
import jumboData from './jumboData';
import { Jumbotron } from '../../components';

export default function JumbotronContainer() {
  return (
    <>
      {jumboData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
          <Jumbotron.TextContainer>
            <Jumbotron.Title>{item.title}</Jumbotron.Title>
            <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
          </Jumbotron.TextContainer>
          <Jumbotron.Image src={item.image} alt={item.alt} />
        </Jumbotron>
      ))}
    </>
  );
}
