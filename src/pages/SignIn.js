import React from 'react';
import { Form } from '../components';
import FooterContainer from '../containers/Footer';

export default function SignIn() {
  return (
    <>
      <Form backgroundImage="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80">
        <Form.Logo>Netflix</Form.Logo>
        <Form.Item>
          <Form.Title>로그인</Form.Title>
          <Form.InputContainer>
            <Form.Input />
            <Form.Label>이메일 주소</Form.Label>
          </Form.InputContainer>
          <Form.InputContainer>
            <Form.Input />
            <Form.Label>비밀번호</Form.Label>
          </Form.InputContainer>
          <Form.Button>로그인</Form.Button>
        </Form.Item>
        <FooterContainer />
      </Form>
    </>
  );
}
