import React from 'react';
import {
  Container,
  Header,
  LogoLink,
  Title,
  SubTitle,
  ButtonLink,
  Code,
} from './NotFoundStyles';
import * as PATHS from '../../constants/paths';

export default function NotFound() {
  return (
    <Container>
      <Header>
        <LogoLink to={PATHS.HOME}>NETFLIX.clone</LogoLink>
      </Header>
      <Title>길을 잃었습니까?</Title>
      <SubTitle>죄송하지만, 해당 페이지를 찾을 수 없습니다.</SubTitle>
      <ButtonLink to={PATHS.HOME}>NETFLIX.clone Home</ButtonLink>
      <Code>404</Code>
    </Container>
  );
}
