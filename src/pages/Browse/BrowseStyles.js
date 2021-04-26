import styled from 'styled-components';
import { logoStyles } from '../../common-styles';
import * as BREAKPOINTS from '../../constants/breakpoints';

const sidePadding = '3.25rem';
const smallSidePadding = '2rem';

export const Container = styled.div.attrs((props) => ({
  style: { fontSize: props.fontSize },
}))`
  min-width: 18.75rem;
  background-color: var(--light-black);
  color: var(--darkest-white);
`;

export const Header = styled.header`
  z-index: 2;
  position: sticky;
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

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0.875rem ${smallSidePadding};
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

export const LogoLink = styled.a`
  ${logoStyles}
  font-size: 2rem;

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.25rem;
  }
`;

export const Navtab = styled.a`
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

export const Main = styled.main`
  padding: 0 ${sidePadding} 5rem;

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0 ${smallSidePadding};
  }
`;

export const Notification = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 4rem;
  color: var(--orange);
  background-color: var(--lighter-black);

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 1rem;
    margin-bottom: 3rem;
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    font-size: 0.875rem;
  }
`;

export const TMDbLogo = styled.a`
  display: inline-block;
  width: 10em;
  margin: 0 0.2em 0 0.3em;
`;
