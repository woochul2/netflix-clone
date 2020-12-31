import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Title,
  Form,
  InputBox,
  InputContainer,
  Error,
  Button,
} from './EmailFormStyles';
import * as PATHS from '../../../constants/paths';
import Input from '../../Input';
import { BsChevronRight } from 'react-icons/bs';

export default function EmailForm({ email, setEmail }) {
  const history = useHistory();
  const [hasError, setHasError] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();

    if (email == '') {
      setHasError(true);
      return;
    }

    history.push(PATHS.SIGN_UP);
  };

  const handleChange = (event) => {
    setHasError(false);
    setEmail(event.target.value);
  };

  return (
    <Container>
      <Title>
        시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를
        입력하세요.
      </Title>
      <Form onSubmit={handleSignUp}>
        <InputBox>
          <Input
            Container={InputContainer}
            type="email"
            value={email}
            onChange={handleChange}
            labelValue="이메일 주소"
            hasError={hasError}
          />
          {hasError && <Error>이메일 주소를 입력해 주세요.</Error>}
        </InputBox>
        <Button>
          시작하기 <BsChevronRight />
        </Button>
      </Form>
    </Container>
  );
}
