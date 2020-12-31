import React, { useState, useRef } from 'react';

export default function Input({
  Container,
  type,
  value,
  onChange,
  labelValue,
  ...restProps
}) {
  const [isFocused, setIsFocused] = useState(false);
  const textInput = useRef(null);

  return (
    <Container
      {...restProps}
      isFocused={isFocused}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      value={value}
    >
      <input type={type} value={value} onChange={onChange} ref={textInput} />
      <label onClick={() => textInput.current.focus()}>{labelValue}</label>
    </Container>
  );
}
