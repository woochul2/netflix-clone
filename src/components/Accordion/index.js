import React, { createContext, useState, useContext } from 'react';
import { Container, Title, Item, Question, Answer } from './Accordion';
import { Plus } from '../../icons';

const ToggleContext = createContext();

export default function Accordion({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToggleContext.Provider value={{ isOpen, setIsOpen }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

Accordion.Button = function AccordionButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Accordion.Question = function AccordionQuestion({ children, ...restProps }) {
  const { isOpen, setIsOpen } = useContext(ToggleContext);

  return (
    <Question onClick={() => setIsOpen(!isOpen)} {...restProps}>
      <span tabIndex="-1">
        {children}
        {isOpen ? <Plus className="rotate" /> : <Plus />}
      </span>
    </Question>
  );
};

Accordion.Answer = function AccordionAnswer({ children, ...restProps }) {
  const { isOpen } = useContext(ToggleContext);

  return (
    <Answer className={isOpen ? 'open' : 'closed'} {...restProps}>
      <span>{children}</span>
    </Answer>
  );
};
