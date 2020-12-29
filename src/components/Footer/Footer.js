import React, { useEffect, useState } from 'react';
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
  background = 'none',
  padding = '4.375rem 3.75rem',
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (variant == 'signin' || variant == 'signup') {
      setData([
        '자주 묻는 질문',
        '고객 센터',
        '이용 약관',
        '개인정보',
        '쿠키 설정',
        '회사 정보',
      ]);
    } else if (variant == 'home') {
      setData([
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
      ]);
    } else if (variant == 'browse') {
      setData([
        '오디오 및 자막',
        '오디오 설명',
        '고객 센터',
        '기프트 카드',
        '미디어 센터',
        '투자 정보',
        '입사 정보',
        '이용 약관',
        '개인정보',
        '법적 고지',
        '쿠키 설정',
        '법인 정보',
        '문의하기',
      ]);
    }
  }, []);

  return (
    <Container background={background} padding={padding}>
      <Inner>
        {variant != 'browse' && <Title>질문이 있으신가요?</Title>}
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
