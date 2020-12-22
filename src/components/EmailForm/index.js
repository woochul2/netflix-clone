import React, { createContext, useState, useContext } from 'react';
import {
  Container,
  Title,
  Item,
  InputContainer,
  Input,
  Label,
  Button,
} from './EmailForm';

const FocusContext = createContext();
const valueContext = createContext();

export default function EmailForm({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

EmailForm.Title = function EmailFormTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

EmailForm.Item = function EmailFormItem({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

EmailForm.InputContainer = function EmailFormInputContainer({
  children,
  ...restProps
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <FocusContext.Provider value={{ isFocused, setIsFocused }}>
      <valueContext.Provider value={{ value, setValue }}>
        <InputContainer {...restProps}>{children}</InputContainer>
      </valueContext.Provider>
    </FocusContext.Provider>
  );
};

EmailForm.Input = function EmailFormInput({ ...restProps }) {
  const { setIsFocused } = useContext(FocusContext);
  const { value, setValue } = useContext(valueContext);

  return (
    <Input
      type="email"
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      {...restProps}
    />
  );
};

EmailForm.Label = function EmailFormLabel({ children, ...restProps }) {
  const { isFocused } = useContext(FocusContext);
  const { value } = useContext(valueContext);

  return (
    <Label isFocused={isFocused} value={value} {...restProps}>
      {children}
    </Label>
  );
};

EmailForm.Button = function EmailFormButton({ children, ...restProps }) {
  return (
    <Button onClick={(event) => event.preventDefault()} {...restProps}>
      {children}
    </Button>
  );
};
