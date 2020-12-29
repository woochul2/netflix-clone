import styled from 'styled-components';
import * as BREAKPOINTS from '../../../constants/breakpoints';
import { divider } from '../HomeStyles';

export const Container = styled.div`
  border-bottom: ${divider};
  padding: 4.375rem 2.875rem;

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 3.125rem 5%;
  }
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ direction }) => direction};
  min-width: 21.875rem;
  max-width: 68.75rem;
  margin: auto;

  @media (max-width: ${BREAKPOINTS.LG}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const TextContainer = styled.div`
  width: 50%;

  @media (max-width: ${BREAKPOINTS.LG}) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 3.125rem;
  margin: 0 0 0.5rem;

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.625rem;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.625rem;
  font-weight: normal;
  margin: 0.75em 0 0.25em;

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.125rem;
  }
`;

export const Image = styled.img`
  max-width: 40%;
  margin-top: 1.875rem;

  @media (max-width: ${BREAKPOINTS.LG}) {
    width: 80%;
    max-width: 31.25rem;
  }
`;
