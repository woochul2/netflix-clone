import React, { useState } from 'react';
import { Container, Title, Item, InputContainer, ButtonLink } from './styles';
import { BsChevronRight } from 'react-icons/bs';

export default function EmailForm() {
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <Container>
      <Title>
        시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를
        입력하세요.
      </Title>
      <Item>
        <InputContainer
          isFocused={isFocused}
          value={email}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        >
          <input type="email" />
          <label>이메일 주소</label>
        </InputContainer>
        <ButtonLink to="#">
          시작하기 <BsChevronRight />
        </ButtonLink>
      </Item>
    </Container>
  );
}
