import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { BREAKPOINTS, SIDE_PADDING } from '../constants';
import GithubIcon from '../icons/GithubIcon';

/**
 * @param {Object} props
 * @param {React.MutableRefObject<HTMLElement>} props.browseRef
 */
function Header({ browseRef }) {
  const scrollToTop = () => {
    browseRef.current.scrollTop = 0;
  };

  return (
    <HeaderBlock>
      <LogoLink to="/" aria-label="홈" onClick={scrollToTop}>
        NETFLIX.clone
      </LogoLink>
      <Nav>
        <NavTab to="/" aria-label="TV 프로그램" onClick={scrollToTop}>
          TV 프로그램
        </NavTab>
        <NavTab to="/movie" aria-label="영화" onClick={scrollToTop}>
          영화
        </NavTab>
      </Nav>
      <GithubLink
        href="https://github.com/woochul2/netflix-clone"
        aria-label="깃허브 저장소"
      >
        <GithubIcon />
      </GithubLink>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.header`
  // 모달을 제외한 나머지 중에서 가장 위에 보이도록 z-index 설정
  z-index: 2;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(
    hsla(0, 0%, 0%, 0.7) 10%,
    hsla(0, 0%, 0%, 0)
  );
  background-color: hsl(0, 0%, 8%);

  @media (min-width: ${BREAKPOINTS.xxl}) {
    padding: 0.875rem 3.75rem;
  }

  padding: 0.875rem 4%;
  font-size: 1rem;

  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: 0.75rem;
    padding: 0.875rem ${SIDE_PADDING.md};
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 0.625rem;
  }
`;

const LogoLink = styled(NavLink)`
  user-select: none;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 2em;
  color: hsl(0, 92%, 46%);
`;

const GithubLink = styled.a`
  font-size: 1.25em;
  color: hsl(0, 0%, 80%);
  transition: color 0.2s;

  @media (hover: hover) {
    &:hover {
      color: hsl(0, 0%, 65%);
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-grow: 1;

  gap: 1.5rem;
  margin-left: 1.5rem;

  @media (max-width: ${BREAKPOINTS.md}) {
    gap: 1rem;
    margin-left: 1rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    gap: 0.875rem;
    margin-left: 0.875rem;
  }
`;

export const NavTab = styled(NavLink)`
  text-decoration: none;
  color: hsl(0, 0%, 80%);
  transition: color 0.2s;

  font-size: 0.875rem;

  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: 0.75rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 0.625rem;
  }

  @media (hover: hover) {
    &:hover {
      color: hsl(0, 0%, 65%);
    }
  }

  &.active {
    color: hsl(0, 0%, 100%);
  }
`;

export default Header;
