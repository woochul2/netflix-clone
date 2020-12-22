import React from 'react';
import faqsData from './faqsData';
import { Accordion } from '../../components';
import EmailFormContainer from '../EmailForm';

export default function FaqsContainer() {
  return (
    <>
      <Accordion>
        <Accordion.Title>자주 묻는 질문</Accordion.Title>
        <Accordion.ItemContainer>
          {faqsData.map((item) => (
            <Accordion.Item key={item.id}>
              <Accordion.Question>{item.question}</Accordion.Question>
              <Accordion.Answer>{item.answer}</Accordion.Answer>
            </Accordion.Item>
          ))}
        </Accordion.ItemContainer>
        <EmailFormContainer />
      </Accordion>
    </>
  );
}
