import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BasicLogoLink } from '../common-styles';
import * as BREAKPOINTS from '../../constants/breakpoints';

const sidePadding = '3.25rem';

export const Container = styled.div`
  min-width: 18.75rem;
  background-color: var(--light-black);
  color: var(--darkest-white);
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem ${sidePadding};
  ${({ isHeaderOnTop }) =>
    isHeaderOnTop
      ? 'background: var(--light-black)'
      : 'background-image: linear-gradient(hsla(0, 0%, 0%, 0.7) 10%, hsla(0, 0%, 0%, 0))'};
  transition: background-color 0.4s;
`;

export const Nav = styled.nav`
  min-width: 18.75rem;
`;

export const LogoLink = styled(BasicLogoLink)`
  font-size: 2rem;

  @media (max-width: ${BREAKPOINTS.MD}) {
    font-size: 1rem;
  }
`;

export const Navtab = styled(Link)`
  margin-left: 2rem;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.875rem;
  color: var(--darkest-white);

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 0.8rem;
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    margin-left: 1rem;
    font-size: 0.75rem;
  }
`;

export const SignOutButton = styled.button``;

export const Main = styled.main`
  padding: 5rem ${sidePadding};
`;

export const Notification = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
  min-width: 28.125rem;
  color: var(--orange);
  background-color: var(--lightest-black);
  margin-bottom: 4rem;

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 1rem;
    margin-bottom: 3rem;
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    font-size: 0.875rem;
  }
`;

export const TMDbLogo = styled.a`
  width: 10em;
  margin: 0 0.2em 0 0.3em;
`;
