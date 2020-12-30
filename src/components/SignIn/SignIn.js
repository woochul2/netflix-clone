import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  LogoLink,
  Form,
  Title,
  Error,
  InputContainer,
  Button,
  SignUpText,
  SignUpLink,
} from './SignInStyles';
import { firebase } from '../../firebase';
import * as ROUTES from '../../constants/routes';
import Input from '../Input';
import Footer from '../Footer';

export default function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        if (error.code == 'auth/invalid-email') {
          setErrorMessage('올바른 이메일 주소를 입력해 주세요.');
        } else if (error.code == 'auth/user-disabled') {
          setErrorMessage('정지ㅅㄱ');
        } else if (error.code == 'auth/user-not-found') {
          setErrorMessage('존재하지 않는 이메일 주소입니다.');
        } else if (error.code == 'auth/wrong-password') {
          setErrorMessage('비밀번호를 잘못 입력하셨습니다.');
        }
      });
  };

  return (
    <Container backgroundImage="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80">
      <LogoLink to={ROUTES.HOME}>NETFLIX.clone</LogoLink>
      <Form onSubmit={handleSignIn}>
        <Title>로그인</Title>
        {errorMessage && <Error>{errorMessage}</Error>}
        <Input
          Container={InputContainer}
          type="email"
          value={email}
          onChange={handleEmailChange}
          labelValue="이메일 주소"
        />
        <Input
          Container={InputContainer}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          labelValue="비밀번호"
        />
        <Button>로그인</Button>
        <SignUpText>
          Netflix.clone 회원이 아닌가요?{' '}
          <SignUpLink to={ROUTES.HOME}>지금 가입하세요</SignUpLink>.
        </SignUpText>
      </Form>
      <Footer variant="signin" background="hsla(0, 0%, 0%, 0.75)" />
    </Container>
  );
}
