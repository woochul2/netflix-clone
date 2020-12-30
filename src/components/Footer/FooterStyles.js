import styled from 'styled-components';
import * as BREAKPOINTS from '../../constants/breakpoints';

export const Container = styled.footer`
  color: var(--gray);
  background: ${({ background }) => background};
  width: 100%;
  padding: 4.375rem 3.75rem;
`;

export const Inner = styled.div`
  max-width: 62.5em;
  margin: 0 auto;
`;

export const Title = styled.p`
  margin-bottom: 1.875rem;
`;

export const LinksContainer = styled.ul`
  padding: 0;
  margin-bottom: 1.5rem;
`;

export const Link = styled.li`
  display: inline-block;
  font-size: 0.875rem;
  margin-bottom: 0.875rem;
  width: 25%;
  min-width: 6.25rem;

  @media (max-width: ${BREAKPOINTS.MD}) {
    width: 33%;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    width: 50%;
  }
`;

export const Text = styled.p`
  font-size: 0.875rem;
`;
