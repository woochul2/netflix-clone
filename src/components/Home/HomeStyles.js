import styled from 'styled-components';
import * as BREAKPOINTS from '../../constants/breakpoints';

export const divider = '0.5rem solid var(--lighter-black)';

export const Container = styled.div`
  background-color: var(--black);
  color: var(--white);
`;

export const FaqsContainer = styled.div`
  min-width: 21.875rem;
  padding: 4.375rem 2.875rem;
  border-bottom: ${divider};

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 3.125rem 0;
  }
`;

export const FaqsTitle = styled.h1`
  text-align: center;
  font-size: 3.125rem;

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.625rem;
  }
`;

export const FaqsContent = styled.ul`
  max-width: 51rem;
  list-style: none;
  width: 70%;
  margin: 0 auto;
  padding: 0;

  @media (max-width: ${BREAKPOINTS.LG}) {
    width: 90%;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    width: 100%;
  }
`;
