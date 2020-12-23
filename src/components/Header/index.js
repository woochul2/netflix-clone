import React from 'react';
import {
  Container,
  Top,
  LogoLink,
  ButtonLink,
  Title,
  SubTitle,
} from './styles';
import { EmailForm } from '../';
import * as Routes from '../../constants/routes';

export default function Header() {
  return (
    <Container backgroundImage="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80">
      <Top>
        <LogoLink to="/">Netflix</LogoLink>
        <ButtonLink to={Routes.Sign_In}>로그인</ButtonLink>
      </Top>
      <Title>영화, TV 프로그램을 무제한으로.</Title>
      <SubTitle>
        다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.
      </SubTitle>
      <EmailForm />
    </Container>
  );
}
