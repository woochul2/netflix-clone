import React, { useState } from 'react';
import { ItemContainer, Question, Answer } from './styles';
import { AiOutlinePlus } from 'react-icons/ai';

export default function Item({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ItemContainer key={item.id}>
      <Question onClick={() => setIsOpen(!isOpen)}>
        <span tabIndex="-1">
          {item.question}
          {isOpen ? <AiOutlinePlus className="rotate" /> : <AiOutlinePlus />}
        </span>
      </Question>
      <Answer className={isOpen ? 'open' : 'closed'}>
        <span>{item.answer}</span>
      </Answer>
    </ItemContainer>
  );
}
