import React from 'react';
import faqsData from '../fixtures/faqs';
import { Accordion } from '../components';

export default function FaqsContainer() {
  return (
    <>
      <Accordion>
        <Accordion.Title>자주 묻는 질문</Accordion.Title>
        {faqsData.map((item) => (
          <Accordion.Item key={item.id}>
            <Accordion.Question>{item.question}</Accordion.Question>
            <Accordion.Answer>{item.answer}</Accordion.Answer>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
