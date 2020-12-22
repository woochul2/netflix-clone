import React from 'react';
import { EmailForm } from '../components';
import { BsChevronRight } from 'react-icons/bs';

export default function EmailFormContainer() {
  return (
    <EmailForm>
      <EmailForm.Title>
        시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를
        입력하세요.
      </EmailForm.Title>
      <EmailForm.Item>
        <EmailForm.InputContainer>
          <EmailForm.Input />
          <EmailForm.Label>이메일 주소</EmailForm.Label>
        </EmailForm.InputContainer>
        <EmailForm.Button>
          시작하기 <BsChevronRight />
        </EmailForm.Button>
      </EmailForm.Item>
    </EmailForm>
  );
}
