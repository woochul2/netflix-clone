import React from 'react';
import { Header, Jumbotron, Faqs, Footer } from '../components';

const footerData = [
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

export default function Home() {
  return (
    <>
      <Header />
      <Jumbotron />
      <Faqs />
      <Footer data={footerData} />
    </>
  );
}
