import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  BasicLogoLinkContainer,
  BasicInputContainer,
  BasicButton,
} from '../common-styles';
import * as BREAKPOINTS from '../../constants/breakpoints';

export const Container = styled.div`
  min-width: 300px;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid hsl(0, 0%, 90%);
`;

export const LogoLinkContainer = styled(BasicLogoLinkContainer)`
  @media (max-width: ${BREAKPOINTS.SMALL}) {
    font-size: 1.2rem;
  }
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  color: hsl(0, 0%, 20%);

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${BREAKPOINTS.MIDDLE}) {
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  max-width: 440px;
  display: flex;
  flex-direction: column;
  margin: 50px auto 100px;
`;

export const Title = styled.h1`
  font-size: 1.425rem;
`;

export const InputContainer = styled(BasicInputContainer)`
  margin-bottom: 20px;

  input {
    border: 1px solid hsl(0, 0%, 55%);
    border-radius: 2px;
    height: 40px;
  }
`;

export const Button = styled(BasicButton)`
  border-radius: 2px;
  padding: 20px;
  font-size: 1.1rem;
`;
