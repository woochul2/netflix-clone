import styled from 'styled-components';
import * as STYLES from '../../constants/styles';

export const Container = styled.div`
  background-color: ${STYLES.colors.black1};
  color: ${STYLES.colors.white1};
`;

export const FaqsContainer = styled.div`
  min-width: 21.875rem;
  padding: 4.375rem 2.875rem;
  border-bottom: ${STYLES.divider};

  @media (max-width: ${STYLES.breakpoints.sm}) {
    padding: 3.125rem 0;
  }
`;

export const FaqsTitle = styled.h1`
  text-align: center;
  font-size: 3.125rem;

  @media (max-width: ${STYLES.breakpoints.lg}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${STYLES.breakpoints.sm}) {
    font-size: 1.625rem;
  }
`;

export const FaqsContent = styled.ul`
  max-width: 51rem;
  list-style: none;
  width: 70%;
  margin: 0 auto;
  padding: 0;

  @media (max-width: ${STYLES.breakpoints.lg}) {
    width: 90%;
  }

  @media (max-width: ${STYLES.breakpoints.sm}) {
    width: 100%;
  }
`;
