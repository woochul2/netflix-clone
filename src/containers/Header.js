import React from 'react';
import { Header } from '../components';
import EmailFormContainer from './EmailForm';

export default function HeaderContainer() {
  return (
    <Header backgroundImage="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80">
      <Header.Top>
        <Header.Logo>Netflix</Header.Logo>
        <Header.Button>로그인</Header.Button>
      </Header.Top>
      <Header.Title>영화, TV 프로그램을 무제한으로.</Header.Title>
      <Header.SubTitle>
        다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.
      </Header.SubTitle>
      <EmailFormContainer />
    </Header>
  );
}
