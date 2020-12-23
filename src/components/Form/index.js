import React, { createContext, useState, useContext } from 'react';
import {
  Container,
  Logo,
  Item,
  Title,
  Error,
  InputContainer,
  Input,
  Label,
  Button,
} from './Form';

const FocusContext = createContext();

export default function Form({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Form.Logo = function FormLogo({ children, ...restProps }) {
  return <Logo {...restProps}>{children}</Logo>;
};

Form.Item = function FormItem({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Form.Error = function FormError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

Form.Title = function FormTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Form.InputContainer = function FormInputContainer({ children, ...restProps }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FocusContext.Provider value={{ isFocused, setIsFocused }}>
      <InputContainer {...restProps}>{children}</InputContainer>
    </FocusContext.Provider>
  );
};

Form.Input = function FormInput({ ...restProps }) {
  const { setIsFocused } = useContext(FocusContext);

  return (
    <Input
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      {...restProps}
    />
  );
};

Form.Label = function FormLabel({ children, ...restProps }) {
  const { isFocused } = useContext(FocusContext);

  return (
    <Label isFocused={isFocused} {...restProps}>
      {children}
    </Label>
  );
};

Form.Button = function FormButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};
