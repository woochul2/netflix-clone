import React from 'react';
import { Footer } from '../components';

export default function FooterContainer() {
  return (
    <Footer>
      <Footer.Title>질문이 있으신가요?</Footer.Title>
      <Footer.LinkContainer>
        <Footer.Link>자주 묻는 질문</Footer.Link>
        <Footer.Link>고객 센터</Footer.Link>
        <Footer.Link>계정</Footer.Link>
        <Footer.Link>미디어 센터</Footer.Link>
        <Footer.Link>투자 정보(IR)</Footer.Link>
        <Footer.Link>입사 정보</Footer.Link>
        <Footer.Link>Netflix 지원 디바이스</Footer.Link>
        <Footer.Link>이용 약관</Footer.Link>
        <Footer.Link>개인정보</Footer.Link>
        <Footer.Link>쿠키 설정</Footer.Link>
        <Footer.Link>회사 정보</Footer.Link>
        <Footer.Link>문의하기</Footer.Link>
        <Footer.Link>속도 테스트</Footer.Link>
        <Footer.Link>법적 고지</Footer.Link>
        <Footer.Link>Netflix 오리지널</Footer.Link>
      </Footer.LinkContainer>
      <Footer.Text>Netflix 대한민국</Footer.Text>
    </Footer>
  );
}
