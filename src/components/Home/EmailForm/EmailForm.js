import React, { useState } from 'react';
import {
  Container,
  Title,
  Item,
  InputContainer,
  Button,
} from './EmailFormStyles';
import Input from '../../Input';
import { BsChevronRight } from 'react-icons/bs';

export default function EmailForm() {
  const [email, setEmail] = useState('');

  const handleSignUp = (event) => {
    event.preventDefault();
  };

  return (
    <Container onSubmit={handleSignUp}>
      <Title>
        시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를
        입력하세요.
      </Title>
      <Item>
        <Input
          Container={InputContainer}
          type="email"
          value={email}
          setValue={setEmail}
          labelValue="이메일 주소"
        />
        <Button>
          시작하기 <BsChevronRight />
        </Button>
      </Item>
    </Container>
  );
}
