import styled from 'styled-components';
import * as STYLES from '../../../constants/styles';

export const Container = styled.div`
  margin-bottom: 3rem;
`;

export const Title = styled.h2`
  margin-bottom: 0.5rem;

  @media (max-width: ${STYLES.breakpoints.lg}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${STYLES.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const ContentsContainer = styled.div`
  display: grid;
  column-gap: 0.3rem;
  grid-template-columns: repeat(6, 1fr);

  @media (max-width: ${STYLES.breakpoints.xl}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: ${STYLES.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${STYLES.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${STYLES.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
