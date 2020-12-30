import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Top,
  LogoLink,
  ButtonLink,
  Form,
  Title,
  InputContainer,
  Error,
  Button,
} from './SignUpStyles';
import { firebase } from '../../firebase';
import * as ROUTES from '../../constants/routes';
import Input from '../Input';
import Footer from '../Footer';

export default function SignUp(props) {
  const currEmail = props.email;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  useEffect(() => {
    setEmail(currEmail);
  }, []);

  const handleEmailChange = (event) => {
    setEmailErrorMessage('');
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordErrorMessage('');
    setPassword(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => history.push(ROUTES.BROWSE))
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use') {
          setEmailErrorMessage('이미 사용 중인 이메일 주소입니다.');
        } else if (error.code == 'auth/invalid-email') {
          setEmailErrorMessage('올바른 이메일 주소를 입력해 주세요.');
        } else if (error.code == 'auth/weak-password') {
          setPasswordErrorMessage('비밀번호는 6자 이상이어야 합니다.');
        }
      });
  };

  return (
    <Container>
      <Top>
        <LogoLink to={ROUTES.HOME}>NETFLIX.clone</LogoLink>
        <ButtonLink to={ROUTES.SIGN_IN}>로그인</ButtonLink>
      </Top>
      <Form onSubmit={handleSignUp}>
        <Title>비밀번호를 설정하고 멤버십을 시작하세요.</Title>
        <Input
          Container={InputContainer}
          type="email"
          value={email}
          onChange={handleEmailChange}
          labelValue="이메일 주소"
        />
        <Error>{emailErrorMessage}</Error>
        <Input
          Container={InputContainer}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          labelValue="비밀번호를 추가하세요"
        />
        <Error>{passwordErrorMessage}</Error>
        <Button>가입</Button>
      </Form>
      <Footer variant="signup" background="var(--dark-white)" />
    </Container>
  );
}
