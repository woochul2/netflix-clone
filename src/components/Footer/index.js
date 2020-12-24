import React from 'react';
import { Container, Inner, Title, LinkContainer, Link, Text } from './styles';

export default function Footer({
  data = [],
  background = 'hsla(0, 0%, 0%, 0.75)',
}) {
  return (
    <Container background={background}>
      <Inner>
        <Title>질문이 있으신가요?</Title>
        <LinkContainer>
          {data.map((text, idx) => (
            <Link key={idx}> {text}</Link>
          ))}
        </LinkContainer>
        <Text>Netflix 대한민국</Text>
      </Inner>
    </Container>
  );
}
