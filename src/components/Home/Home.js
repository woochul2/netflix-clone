import React from 'react';
import { Container, FaqsContainer, FaqsTitle, FaqsContent } from './HomeStyles';
import Header from './Header';
import jumbotronsData from './jumbotrons-data';
import Jumbotron from './Jumbotron';
import faqsData from './faqs-data';
import Faq from './Faq';
import EmailForm from './EmailForm';
import Footer from '../Footer';

export default function Home() {
  return (
    <Container>
      <Header />
      {jumbotronsData.map((item) => (
        <Jumbotron key={item.id} item={item} />
      ))}
      <FaqsContainer>
        <FaqsTitle>자주 묻는 질문</FaqsTitle>
        <FaqsContent>
          {faqsData.map((item) => (
            <Faq key={item.id} item={item} />
          ))}
        </FaqsContent>
        <EmailForm />
      </FaqsContainer>
      <Footer variant="home" />
    </Container>
  );
}
