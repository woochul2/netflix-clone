import React, { useState } from 'react';
import { Form } from '../components';
import FooterContainer from '../containers/Footer';
import { firebase } from '../firebase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSignIn = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(123);
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <>
      <Form backgroundImage="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80">
        <Form.Logo>Netflix</Form.Logo>
        <Form.Item onSubmit={handleSignIn}>
          <Form.Title>로그인</Form.Title>
          {error && (
            <Form.Error>이메일 또는 비밀번호를 잘못 입력하셨습니다.</Form.Error>
          )}
          <Form.InputContainer>
            <Form.Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Form.Label value={email}>이메일 주소</Form.Label>
          </Form.InputContainer>
          <Form.InputContainer>
            <Form.Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Form.Label value={password}>비밀번호</Form.Label>
          </Form.InputContainer>
          <Form.Button>로그인</Form.Button>
        </Form.Item>
        <FooterContainer />
      </Form>
    </>
  );
}
