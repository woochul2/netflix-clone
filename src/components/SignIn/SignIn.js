import React, { useState } from 'react';
import { firebase } from '../../firebase';
import * as ROUTES from '../../constants/routes';
import {
  Container,
  LogoLinkContainer,
  Form,
  Title,
  Error,
  InputContainer,
  Button,
  SignUpText,
  SignUpLink,
} from './SignInStyles';
import LogoLink from '../LogoLink';
import Input from '../Input';
import Footer from '../Footer';

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
        // TODO: 로그인 완료 후 페이지 이동
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <Container backgroundImage="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80">
      <LogoLink Container={LogoLinkContainer} />
      <Form onSubmit={handleSignIn}>
        <Title>로그인</Title>
        {error && <Error>이메일 또는 비밀번호를 잘못 입력하셨습니다.</Error>}
        <Input
          Container={InputContainer}
          type="email"
          value={email}
          setValue={setEmail}
          labelValue="이메일 주소"
        />
        <Input
          Container={InputContainer}
          type="password"
          value={password}
          setValue={setPassword}
          labelValue="비밀번호"
        />
        <Button>로그인</Button>
        <SignUpText>
          Netflix 회원이 아닌가요?{' '}
          <SignUpLink to={ROUTES.HOME}>지금 가입하세요</SignUpLink>.
        </SignUpText>
      </Form>
      <Footer variant="signin" />
    </Container>
  );
}
