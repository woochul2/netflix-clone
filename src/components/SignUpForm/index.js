import React, { useEffect, useState } from 'react';
import {
  Container,
  Top,
  LogoLink,
  ButtonLink,
  Form,
  Title,
  Button,
} from './styles';
import { Footer } from '../';
import Input from './Input';
import * as ROUTES from '../../constants/routes';

const footerData = [
  '자주 묻는 질문',
  '고객 센터',
  '이용 약관',
  '개인정보',
  '쿠키 설정',
  '회사 정보',
];

export default function SignUpForm() {
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
  };

  return (
    <Container>
      <Top>
        <LogoLink to={ROUTES.HOME}>Netflix</LogoLink>
        <ButtonLink to={ROUTES.SIGN_IN}>로그인</ButtonLink>
      </Top>
      <Form onSubmit={handleSignUp}>
        <Title>비밀번호를 설정하고 멤버십을 시작하세요.</Title>
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
          label="비밀번호를 추가하세요"
        />
        <Button>가입</Button>
      </Form>
      <Footer data={footerData} background="hsl(0, 0%, 95%)" />
    </Container>
  );
}
