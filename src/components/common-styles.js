import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as STYLES from '../constants/styles';

export const BasicInputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  input {
    outline: none;
    border: none;
    width: 100%;
    padding: 0.625rem 0.625rem 0;
  }

  label {
    user-select: none;
    position: absolute;
    top: ${({ isFocused, value }) => (isFocused || value ? '20%' : '50%')};
    left: 0.625rem;
    transform: translateY(-50%);
    transition: all 0.1s ease;
    font-size: ${({ isFocused, value }) =>
      isFocused || value ? '0.8rem' : '1rem'};
    font-weight: ${({ isFocused, value }) =>
      isFocused || value ? 'bold' : '400'};
    color: ${STYLES.colors.gray1};
  }
`;

const basicButtonStyles = {
  'user-select': 'none',
  cursor: 'pointer',
  color: STYLES.colors.white1,
  'background-color': STYLES.colors.red1,

  '&:active': {
    'background-color': STYLES.colors.red2,
  },
};

export const BasicButton = styled.button`
  ${basicButtonStyles}
  border: 0;

  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;

export const BasicButtonLink = styled(Link)`
  ${basicButtonStyles}
  text-decoration: none;
`;

export const BasicLogoLinkContainer = styled(Link)`
  user-select: none;
  margin: 0;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 3rem;
  font-weight: bold;
  color: ${STYLES.colors.red1};
`;
