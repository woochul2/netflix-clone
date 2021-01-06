import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logoStyles, BasicInputContainer, BasicButton } from '../common-styles';
import * as BREAKPOINTS from '../../constants/breakpoints';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 18.75rem;
  min-height: 100vh;
  color: var(--lightest-black);
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 3%;
  border-bottom: 0.06rem solid var(--darkest-white);
`;

export const LogoLink = styled(Link)`
  ${logoStyles}

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.2rem;
  }
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--lightest-black);

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-width: 27.5rem;
  margin: 0 auto;
  padding: 5rem 0 7rem;
`;

export const Title = styled.h1`
  font-size: 1.425rem;
`;

export const InputContainer = styled(BasicInputContainer)`
  input {
    border: ${({ isFocused }) =>
      isFocused
        ? 'solid 0.06rem var(--blue)'
        : 'solid 0.06rem var(--light-gray)'};
    border: ${({ hasError }) => hasError && 'solid 0.06rem var(--deep-red)'};
    border-radius: 0.125rem;
    height: 3.75rem;
  }
`;

export const Error = styled.p`
  font-size: 0.8rem;
  padding: 0.1rem 0 0.5rem;
  color: var(--deep-red);
`;

export const Button = styled(BasicButton)`
  border-radius: 0.125rem;
  padding: 1rem;
  font-size: 1.1rem;
`;
