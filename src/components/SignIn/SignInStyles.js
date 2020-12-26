import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  BasicLogoLinkContainer,
  BasicInputContainer,
  BasicButton,
} from '../common-styles';
import * as STYLES from '../../constants/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 21.875rem;
  background: url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
  background-position: 50% 40%;
  padding-top: 0.625rem;

  @media (max-width: ${STYLES.breakpoints.md}) {
    background: none;
    align-items: stretch;
  }
`;

export const LogoLinkContainer = styled(BasicLogoLinkContainer)`
  align-self: baseline;
  margin-left: 1.25rem;

  @media (max-width: ${STYLES.breakpoints.sm}) {
    font-size: 1.6rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: hsla(0, 0%, 0%, 0.75);
  padding: 3.125rem 4.375rem 6.25rem;
  border-radius: 0.25rem;
  margin-bottom: 6.25rem;

  @media (max-width: ${STYLES.breakpoints.md}) {
    padding: 0.625rem 1.25rem 3.125rem;
  }
`;

export const Title = styled.h1``;

export const Error = styled.p`
  margin-bottom: 1.25rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.25rem;
  color: ${STYLES.colors.white};
  background-color: ${STYLES.colors.orange};
  font-size: 0.875rem;
  font-weight: bold;
`;

export const InputContainer = styled(BasicInputContainer)`
  min-width: 25rem;
  margin-bottom: 1.25rem;
  @media (max-width: ${STYLES.breakpoints.md}) {
    min-width: 18.75rem;
  }

  input {
    border-radius: 0.25rem;
    height: 3.75rem;
    color: ${STYLES.colors.white};
    background-color: ${STYLES.colors.gray3};
  }
`;

export const Button = styled(BasicButton)`
  border-radius: 0.25rem;
  padding: 0.625rem 0;
`;

export const SignUpText = styled.p`
  margin-top: 1.875rem;
  color: ${STYLES.colors.gray};
`;

export const SignUpLink = styled(Link)`
  text-decoration: none;
  color: ${STYLES.colors.white};

  &:hover {
    text-decoration: underline;
  }
`;
