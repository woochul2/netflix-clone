import React from 'react';
import { Container, Title, ItemsContainer } from './styles';
import faqsData from './faqsData';
import Item from './Item';
import { EmailForm } from '../';

export default function Faqs() {
  return (
    <>
      <Container>
        <Title>자주 묻는 질문</Title>
        <ItemsContainer>
          {faqsData.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ItemsContainer>
        <EmailForm />
      </Container>
    </>
  );
}
