import React, { useState } from 'react';
import {
  Container,
  Title,
  Item,
  InputContainer,
  Input,
  Label,
  Button,
} from './styles';
import { BsChevronRight } from 'react-icons/bs';

export default function EmailForm() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Container>
      <Title>
        시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를
        입력하세요.
      </Title>
      <Item>
        <InputContainer>
          <Input
            type="email"
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <Label isFocused={isFocused} value={value}>
            이메일 주소
          </Label>
        </InputContainer>
        <Button onClick={(event) => event.preventDefault()}>
          시작하기 <BsChevronRight />
        </Button>
      </Item>
    </Container>
  );
}
