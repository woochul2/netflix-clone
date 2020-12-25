import styled from 'styled-components';
import { BasicInputContainer, BasicButton } from '../../common-styles';
import * as BREAKPOINTS from '../../../constants/breakpoints';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  max-width: 950px;
  padding: 50px 5% 0;
  margin: 0 auto;
`;

export const Title = styled.h3`
  font-weight: normal;
  font-size: 1.2rem;
  text-align: center;
  padding: 0 4% 20px;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    max-width: 450px;
    font-size: 1.45rem;
    padding-bottom: 12px;
  }

  @media (max-width: ${BREAKPOINTS.MIDDLE}) {
    font-size: 1.1rem;
  }
`;

export const Item = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const InputContainer = styled(BasicInputContainer)`
  min-width: 500px;
  max-width: 500px;

  @media (max-width: ${BREAKPOINTS.XLARGE}) {
    min-width: 450px;
  }

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    margin-bottom: 20px;
    height: 60px;
  }

  @media (max-width: ${BREAKPOINTS.MIDDLE}) {
    min-width: 300px;
    height: 48px;
  }

  input {
    border: solid 1px hsl(0, 0%, 55%);
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  label {
    @media (max-width: ${BREAKPOINTS.MIDDLE}) {
      font-size: 0.875rem;
    }
  }
`;

export const Button = styled(BasicButton)`
  border-left: 1px solid hsl(0, 0%, 20%);
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 0.6em 0.9em;
  font-size: 1.875rem;

  svg {
    width: 0.8em;
    height: 0.8em;
  }

  @media (max-width: ${BREAKPOINTS.XLARGE}) {
    font-size: 1.625rem;
  }

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    border-radius: 2px;
    font-size: 1rem;
  }
`;
