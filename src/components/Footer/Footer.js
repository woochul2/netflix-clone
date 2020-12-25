import React, { useEffect } from 'react';
import {
  Container,
  Inner,
  Title,
  LinksContainer,
  Link,
  Text,
} from './FooterStyles';

export default function Footer({
  variant,
  background = 'hsla(0, 0%, 0%, 0.75)',
}) {
  let data = [
    '자주 묻는 질문',
    '고객 센터',
    '계정',
    '미디어 센터',
    '투자 정보',
    '입사 정보',
    'Netflix 지원 디바이스',
    '이용 약관',
    '개인정보',
    '쿠키 설정',
    '회사 정보',
    '문의하기',
    '속도 테스트',
    '법적 고지',
    'Netflix 오리지널',
  ];

  useEffect(() => {
    if (variant == 'signin' || variant == 'signup') {
      data = [
        '자주 묻는 질문',
        '고객 센터',
        '이용 약관',
        '개인정보',
        '쿠키 설정',
        '회사 정보',
      ];
    }
  }, []);

  return (
    <Container background={background}>
      <Inner>
        <Title>질문이 있으신가요?</Title>
        <LinksContainer>
          {data.map((text, idx) => (
            <Link key={idx}> {text}</Link>
          ))}
        </LinksContainer>
        <Text>Netflix 대한민국</Text>
      </Inner>
    </Container>
  );
}
