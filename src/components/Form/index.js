import React, { createContext, useState, useContext } from 'react';
import {
  Container,
  Logo,
  Item,
  Title,
  InputContainer,
  Input,
  Label,
  Button,
} from './Form';

const FocusContext = createContext();
const ValueContext = createContext();

export default function Form({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Form.Logo = function FormLogo({ children, ...restProps }) {
  return <Logo {...restProps}>{children}</Logo>;
};

Form.Item = function FormItem({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Form.Title = function FormTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Form.InputContainer = function FormInputContainer({ children, ...restProps }) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <FocusContext.Provider value={{ isFocused, setIsFocused }}>
      <ValueContext.Provider value={{ value, setValue }}>
        <InputContainer {...restProps}>{children}</InputContainer>
      </ValueContext.Provider>
    </FocusContext.Provider>
  );
};

Form.Input = function FormInput({ ...restProps }) {
  const { setIsFocused } = useContext(FocusContext);
  const { value, setValue } = useContext(ValueContext);

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

Form.Label = function FormLabel({ children, ...restProps }) {
  const { isFocused } = useContext(FocusContext);
  const { value } = useContext(ValueContext);

  return (
    <Label isFocused={isFocused} value={value} {...restProps}>
      {children}
    </Label>
  );
};

Form.Button = function FormButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};
