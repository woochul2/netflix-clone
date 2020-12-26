import styled from 'styled-components';
import { BasicInputContainer, BasicButton } from '../../common-styles';
import * as STYLES from '../../../constants/styles';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 20rem;
  max-width: 59.375rem;
  padding: 1.875rem 5% 0;
  margin: 0 auto;
`;

export const Title = styled.h3`
  font-weight: normal;
  font-size: 1.2rem;
  text-align: center;
  padding-bottom: 1.25rem;

  @media (max-width: ${STYLES.breakpoints.lg}) {
    max-width: 28.125rem;
    font-size: 1.45rem;
    padding-bottom: 0.75rem;
  }

  @media (max-width: ${STYLES.breakpoints.md}) {
    font-size: 1.1rem;
  }

  @media (max-width: ${STYLES.breakpoints.sm}) {
    padding-bottom: 0.625rem;
  }
`;

export const Item = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${STYLES.breakpoints.lg}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const InputContainer = styled(BasicInputContainer)`
  min-width: 31.25rem;
  max-width: 3.125rem;

  @media (max-width: ${STYLES.breakpoints.lg}) {
    min-width: 28.25rem;
  }

  @media (max-width: ${STYLES.breakpoints.lg}) {
    margin-bottom: 1.25rem;
    height: 3.75rem;
  }

  @media (max-width: ${STYLES.breakpoints.md}) {
    min-width: 18.75rem;
    height: 3rem;
  }

  input {
    border: solid 0.06rem ${STYLES.colors.gray2};
    border-top-left-radius: 0.125rem;
    border-bottom-left-radius: 0.125rem;
  }

  label {
    @media (max-width: ${STYLES.breakpoints.md}) {
      font-size: 0.875rem;
    }
  }
`;

export const Button = styled(BasicButton)`
  border-left: 0.06rem solid ${STYLES.colors.gray3};
  border-top-right-radius: 0.125rem;
  border-bottom-right-radius: 0.125rem;
  padding: 1.125rem 1.7rem;
  font-size: 1.875rem;

  svg {
    width: 0.8em;
    height: 0.8em;
  }

  @media (max-width: ${STYLES.breakpoints.xl}) {
    font-size: 1.625rem;
  }

  @media (max-width: ${STYLES.breakpoints.lg}) {
    border-radius: 0.125rem;
    font-size: 1rem;
  }
`;
