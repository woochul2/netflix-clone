import React, { useState } from 'react';
import { InputContainer } from './styles';

export default function Input({ type, value, setValue, label }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer
      isFocused={isFocused}
      value={value}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onChange={(event) => setValue(event.target.value)}
    >
      <input type={type} />
      <label>{label}</label>
    </InputContainer>
  );
}
