import styled from 'styled-components';
import * as BREAKPOINTS from '../../constants/breakpoints';

export const Container = styled.div`
  margin-bottom: 3rem;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    font-size: 1.25rem;
  }
`;

export const ContentsContainer = styled.div`
  display: grid;
  gap: 0.3rem;
  grid-template-columns: repeat(6, 1fr);

  @media (max-width: ${BREAKPOINTS.XL}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: ${BREAKPOINTS.LG}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
