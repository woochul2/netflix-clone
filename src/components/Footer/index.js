import React from 'react';
import { Container, Inner, Title, LinkContainer, Link, Text } from './styles';

export default function Footer() {
  return (
    <Container>
      <Inner>
        <Title>질문이 있으신가요?</Title>
        <LinkContainer>
          <Link>자주 묻는 질문</Link>
          <Link>고객 센터</Link>
          <Link>계정</Link>
          <Link>미디어 센터</Link>
          <Link>투자 정보(IR)</Link>
          <Link>입사 정보</Link>
          <Link>Netflix 지원 디바이스</Link>
          <Link>이용 약관</Link>
          <Link>개인정보</Link>
          <Link>쿠키 설정</Link>
          <Link>회사 정보</Link>
          <Link>문의하기</Link>
          <Link>속도 테스트</Link>
          <Link>법적 고지</Link>
          <Link>Netflix 오리지널</Link>
        </LinkContainer>
        <Text>Netflix 대한민국</Text>
      </Inner>
    </Container>
  );
}
