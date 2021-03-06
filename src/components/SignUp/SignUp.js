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
import * as PATHS from '../../constants/paths';
import Input from '../Input';
import ReactLoading from 'react-loading';
import Footer from '../Footer';

export default function SignUp(props) {
  const currEmail = props.email;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => history.push(PATHS.BROWSE))
      .catch((error) => {
        setLoading(false);
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
        <LogoLink to={PATHS.HOME}>NETFLIX.clone</LogoLink>
        <ButtonLink to={PATHS.SIGN_IN}>로그인</ButtonLink>
      </Top>
      <Form onSubmit={handleSignUp}>
        <Title>비밀번호를 설정하고 멤버십을 시작하세요.</Title>
        <Input
          Container={InputContainer}
          type="email"
          value={email}
          onChange={handleEmailChange}
          labelValue="이메일 주소"
          hasError={emailErrorMessage}
        />
        <Error>{emailErrorMessage}</Error>
        <Input
          Container={InputContainer}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          labelValue="비밀번호를 추가하세요"
          hasError={passwordErrorMessage}
        />
        <Error>{passwordErrorMessage}</Error>
        <Button>
          {loading ? (
            <ReactLoading
              type={'spokes'}
              width={'1.125em'}
              height={'1.125em'}
            />
          ) : (
            '가입'
          )}
        </Button>
      </Form>
      <Footer variant="signup" background="var(--dark-white)" />
    </Container>
  );
}
