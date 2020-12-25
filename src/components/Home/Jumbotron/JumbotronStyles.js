import styled from 'styled-components';
import * as BREAKPOINTS from '../../../constants/breakpoints';

export const Container = styled.div`
  border-bottom: 8px solid hsl(0, 0%, 13%);
  padding: 70px 45px;

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    padding: 50px 5%;
  }
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ direction }) => direction};
  min-width: 350px;
  max-width: 1100px;
  margin: auto;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const TextContainer = styled.div`
  width: 50%;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 3.125rem;
  margin: 0 0 0.5rem;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    font-size: 1.625rem;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.625rem;
  font-weight: normal;
  margin: 0.75em 0 0.25em;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    font-size: 1.125rem;
  }
`;

export const Image = styled.img`
  max-width: 40%;
  margin-top: 30px;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    width: 80%;
    max-width: 500px;
  }
`;
