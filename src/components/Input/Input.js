import React, { useState } from 'react';

export default function Input({
  Container,
  type,
  value,
  onChange,
  labelValue,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container
      isFocused={isFocused}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      value={value}
    >
      <input type={type} value={value} onChange={onChange} />
      <label>{labelValue}</label>
    </Container>
  );
}
