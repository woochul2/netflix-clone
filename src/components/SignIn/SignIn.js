import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  LogoLink,
  Form,
  Title,
  Error,
  InputBox,
  InputContainer,
  PasswordToggleButton,
  SubmitButton,
  SignUpText,
  SignUpLink,
} from './SignInStyles';
import { firebase } from '../../firebase';
import * as PATHS from '../../constants/paths';
import Input from '../Input';
import Footer from '../Footer';

const PASSWORD = 'password';
const TEXT = 'text';

export default function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState(PASSWORD);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordToggle = () => {
    if (passwordType == PASSWORD) {
      setPasswordType(TEXT);
      return;
    }

    if (passwordType == TEXT) {
      setPasswordType(PASSWORD);
      return;
    }
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
      <LogoLink to={PATHS.HOME}>NETFLIX.clone</LogoLink>
      <Form onSubmit={handleSignIn}>
        <Title>로그인</Title>
        {errorMessage && <Error>{errorMessage}</Error>}
        <InputBox>
          <Input
            Container={InputContainer}
            type="email"
            value={email}
            onChange={handleEmailChange}
            labelValue="이메일 주소"
          />
        </InputBox>
        <InputBox>
          <Input
            Container={InputContainer}
            type={passwordType}
            value={password}
            onChange={handlePasswordChange}
            labelValue="비밀번호"
          />
          <PasswordToggleButton type="button" onClick={handlePasswordToggle}>
            {passwordType == PASSWORD ? '표시' : '숨기기'}
          </PasswordToggleButton>
        </InputBox>
        <SubmitButton type="submit">로그인</SubmitButton>
        <SignUpText>
          Netflix.clone 회원이 아닌가요?{' '}
          <SignUpLink to={PATHS.HOME}>지금 가입하세요</SignUpLink>.
        </SignUpText>
      </Form>
      <Footer variant="signin" background="hsla(0, 0%, 0%, 0.75)" />
    </Container>
  );
}
