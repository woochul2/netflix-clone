import styled from 'styled-components';

export const BasicInputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  input {
    outline: 0;
    border: 0;
    width: 100%;
    padding: 0.625rem 0.625rem 0;
  }

  label {
    cursor: text;
    user-select: none;
    position: absolute;
    top: ${({ isFocused, value }) => (isFocused || value ? '25%' : '50%')};
    left: 0.625rem;
    transform: translateY(-50%);
    transition: all 0.1s ease;
    font-size: ${({ isFocused, value }) =>
      isFocused || value ? '0.8em' : '1em'};
    font-weight: ${({ isFocused, value }) =>
      isFocused || value ? 'bold' : '400'};
    color: var(--gray-400);
  }
`;

const basicButtonStyles = {
  'user-select': 'none',
  cursor: 'pointer',
  display: 'flex',
  'justify-content': 'center',
  color: 'var(--white)',
  'background-color': 'var(--red)',

  '&:active': {
    'background-color': 'var(--dark-red)',
  },
};

export const BasicButton = styled.button`
  ${basicButtonStyles}
  border: 0;

  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;

export const BasicButtonLink = styled.a`
  ${basicButtonStyles}
  text-decoration: none;
`;

export const logoStyles = {
  'user-select': 'none',
  margin: '0',
  'text-decoration': 'none',
  'font-size': '3rem',
  'font-weight': 'bold',
  color: 'var(--red)',
};
