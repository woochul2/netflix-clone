import React, { useState } from 'react';
import { Container, Logo, Item, Title, Error, Button } from './styles';
import { firebase } from '../../firebase';
import { Footer } from '../';
import Input from './Input';

export default function Form() {
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
      .catch(() => {
        setError(true);
      });
  };

  return (
    <Container backgroundImage="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80">
      <Logo>Netflix</Logo>
      <Item onSubmit={handleSignIn}>
        <Title>로그인</Title>
        {error && <Error>이메일 또는 비밀번호를 잘못 입력하셨습니다.</Error>}
        <Input
          type="email"
          value={email}
          setValue={setEmail}
          label="이메일 주소"
        />
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          label="비밀번호"
        />
        <Button>로그인</Button>
      </Item>
      <Footer />
    </Container>
  );
}
