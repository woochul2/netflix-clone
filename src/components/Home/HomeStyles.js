import styled from 'styled-components';
import * as BREAKPOINTS from '../../constants/breakpoints';

export const FaqsContainer = styled.div`
  border-bottom: 8px solid hsl(0, 0%, 13%);
  padding: 70px 45px;

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    padding: 50px 0;
  }
`;

export const FaqsTitle = styled.h1`
  text-align: center;
  font-size: 3.125rem;
  min-width: 350px;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    font-size: 1.625rem;
  }
`;

export const FaqsContent = styled.ul`
  min-width: 320px;
  max-width: 815px;
  list-style: none;
  width: 70%;
  margin: 0 auto;
  padding: 0;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    width: 90%;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    width: 100%;
  }
`;
