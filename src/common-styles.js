import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BasicInputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  input {
    outline: none;
    border: none;
    width: 100%;
    padding: 10px;
  }

  label {
    position: absolute;
    top: ${({ isFocused, value }) => (isFocused || value ? '20%' : '50%')};
    left: 10px;
    transform: translateY(-50%);
    transition: all 0.1s ease;
    font-size: ${({ isFocused, value }) =>
      isFocused || value ? '0.8rem' : '1rem'};
    font-weight: ${({ isFocused, value }) =>
      isFocused || value ? 'bold' : '400'};
    color: hsl(0, 0%, 55%);
  }
`;

export const BasicButtonLink = styled(Link)`
  cursor: pointer;
  border: 0;
  text-decoration: none;
  color: hsl(0, 0%, 100%);
  background-color: hsl(357, 92%, 46%);

  &:active {
    background-color: hsl(358, 91%, 40%);
  }
`;

export const BasicLogoLink = styled(Link)`
  margin: 0;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 3rem;
  font-weight: bold;
  color: hsl(358, 90%, 47%);
`;
