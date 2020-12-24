import styled from 'styled-components';
import * as BREAKPOINTS from '../../constants/breakpoints';

export const Container = styled.footer`
  color: hsl(0, 0%, 45%);
  background: ${({ background }) => background};
  width: 100%;
`;

export const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 70px 65px;
`;

export const Title = styled.p`
  margin-bottom: 30px;
`;

export const LinkContainer = styled.ul`
  padding: 0;
  margin-bottom: 24px;
`;

export const Link = styled.li`
  display: inline-block;
  font-size: 13px;
  margin-bottom: 14px;
  width: 25%;
  min-width: 100px;

  @media (max-width: ${BREAKPOINTS.MIDDLE}) {
    width: 33%;
  }

  @media (max-width: 500px) {
    width: 50%;
  }
`;

export const Text = styled.p`
  font-size: 13px;
`;
