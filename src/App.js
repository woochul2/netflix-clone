import React from 'react';
import jumboData from './fixtures/jumbo';
import Jumbotron from './components/Jumbotron';

export default function App() {
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
