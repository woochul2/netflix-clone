import React, { useState } from 'react';
import { InputContainer, InputBox, Label } from './styles';

export default function Input({ type, value, setValue, label }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer>
      <InputBox
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      <Label isFocused={isFocused} value={value}>
        {label}
      </Label>
    </InputContainer>
  );
}
