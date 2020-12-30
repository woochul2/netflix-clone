import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Title,
  Form,
  InputContainer,
  Button,
  Error,
} from './EmailFormStyles';
import * as ROUTES from '../../../constants/routes';
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

    history.push(ROUTES.SIGN_UP);
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Container>
      <Title>
        시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를
        입력하세요.
      </Title>
      <Form onSubmit={handleSignUp}>
        <Input
          Container={InputContainer}
          type="email"
          value={email}
          onChange={handleChange}
          labelValue="이메일 주소"
        />
        <Button>
          시작하기 <BsChevronRight />
        </Button>
      </Form>
      {hasError && <Error>이메일 주소를 입력해 주세요.</Error>}
    </Container>
  );
}
