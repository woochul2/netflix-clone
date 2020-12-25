import React, { useState } from 'react';

export default function Input({
  Container,
  type,
  value,
  setValue,
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
      onChange={(event) => setValue(event.target.value)}
    >
      <input type={type} />
      <label>{labelValue}</label>
    </Container>
  );
}
