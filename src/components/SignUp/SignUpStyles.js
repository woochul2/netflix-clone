import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  BasicLogoLinkContainer,
  BasicInputContainer,
  BasicButton,
} from '../common-styles';
import * as STYLES from '../../constants/styles';

export const Container = styled.div`
  min-width: 18.75rem;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 3%;
  border-bottom: 0.06rem solid ${STYLES.colors.gray4};
`;

export const LogoLinkContainer = styled(BasicLogoLinkContainer)`
  @media (max-width: ${STYLES.breakpoints.sm}) {
    font-size: 1.2rem;
  }
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  color: ${STYLES.colors.gray3};

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${STYLES.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  max-width: 27.5rem;
  display: flex;
  flex-direction: column;
  margin: 3.125rem auto 6.25rem;
`;

export const Title = styled.h1`
  font-size: 1.425rem;
`;

export const InputContainer = styled(BasicInputContainer)`
  margin-bottom: 1.25rem;

  input {
    border: 0.06rem solid ${STYLES.colors.gray2};
    border-radius: 0.125rem;
    height: 3.75rem;
  }
`;

export const Button = styled(BasicButton)`
  border-radius: 0.125rem;
  padding: 1rem;
  font-size: 1.1rem;
`;
