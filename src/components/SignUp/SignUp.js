import React, { useEffect, useState } from 'react';
import {
  Container,
  Top,
  LogoLinkContainer,
  ButtonLink,
  Form,
  Title,
  InputContainer,
  Button,
} from './SignUpStyles';
import LogoLink from '../LogoLink';
import Input from '../Input';
import Footer from '../Footer';
import * as ROUTES from '../../constants/routes';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.backgroundColor = 'hsl(0, 0%, 100%)';
    body.style.color = 'hsl(0, 0%, 20%)';

    return () => {
      body.style.backgroundColor = 'hsl(0, 0%, 0%)';
      body.style.color = 'hsl(0, 0%, 100%)';
    };
  }, []);

  const handleSignUp = (event) => {
    event.preventDefault();
    // TODO: 가입 완료 후 Browse 페이지로 이동
  };

  return (
    <Container>
      <Top>
        <LogoLink Container={LogoLinkContainer} />
        <ButtonLink to={ROUTES.SIGN_IN}>로그인</ButtonLink>
      </Top>
      <Form onSubmit={handleSignUp}>
        <Title>비밀번호를 설정하고 멤버십을 시작하세요.</Title>
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
          labelValue="비밀번호를 추가하세요"
        />
        <Button>가입</Button>
      </Form>
      <Footer variant="signup" background="hsl(0, 0%, 95%)" />
    </Container>
  );
}
