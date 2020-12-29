import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as STYLES from '../../constants/styles';
import { BasicLogoLinkContainer } from '../common-styles';

export const Container = styled.div`
  min-width: 18.75rem;
  background-color: ${STYLES.colors.black2};
  color: ${STYLES.colors.white2};
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0.875rem ${STYLES.browsePadding};
  ${({ isHeaderOnTop }) =>
    isHeaderOnTop
      ? 'background: hsl(0, 0%, 8%)'
      : 'background-image: linear-gradient(hsla(0, 0%, 0%, 0.7) 10%, hsla(0, 0%, 0%, 0))'};
  transition: background-color 0.4s;
`;

export const LogoLinkContainer = styled(BasicLogoLinkContainer)`
  font-size: 2rem;

  @media (max-width: ${STYLES.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const Nav = styled.nav``;

export const Navtab = styled(Link)`
  margin-left: 2rem;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.875rem;
  color: ${STYLES.colors.white2};

  @media (max-width: ${STYLES.breakpoints.lg}) {
    font-size: 0.8rem;
  }

  @media (max-width: ${STYLES.breakpoints.md}) {
    margin-left: 1rem;
    font-size: 0.75rem;
  }
`;

export const Main = styled.main`
  padding: 5rem ${STYLES.browsePadding};
`;

export const Notification = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
  min-width: 28.125rem;
  color: ${STYLES.colors.orange};
  background-color: ${STYLES.colors.gray3};
  margin-bottom: 4rem;

  @media (max-width: ${STYLES.breakpoints.lg}) {
    font-size: 1rem;
    margin-bottom: 3rem;
  }

  @media (max-width: ${STYLES.breakpoints.md}) {
    font-size: 0.875rem;
  }
`;

export const TMDbLogo = styled.a`
  width: 10em;
  margin: 0 0.2em 0 0.3em;
`;
