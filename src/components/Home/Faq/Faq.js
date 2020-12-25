import React, { useState } from 'react';
import { Container, Question, Answer } from './FaqStyles';
import { AiOutlinePlus } from 'react-icons/ai';

export default function Faq({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container key={item.id}>
      <Question isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {item.question} <AiOutlinePlus />
      </Question>
      <Answer isOpen={isOpen}>
        <span>{item.answer}</span>
      </Answer>
    </Container>
  );
}
