import styled from 'styled-components/macro';
import * as BREAKPOINTS from '../../../constants/breakpoints';

export const homeSidePadding = '3.25rem';

export const Container = styled.div`
  position: relative;
  min-width: 18.75rem;
  max-height: 100vh;
  overflow-x: hidden;
  background-color: var(--gray-900);
  color: var(--gray-100);
`;

export const Header = styled.header`
  // 모달을 제외한 나머지 중에서 가장 위에 보이도록 z-index 설정
  z-index: 2;
  position: sticky;
  top: 0;
  padding: 0.875rem ${homeSidePadding};
  background-image: linear-gradient(hsla(0, 0%, 0%, 0.7) 10%, hsla(0, 0%, 0%, 0));
  transition: background-color 0.4s;

  &.scroll-down {
    background-color: var(--gray-900);
  }
`;

export const LogoLink = styled.a`
  user-select: none;
  text-decoration: none;
  font-weight: bold;
  font-size: 2rem;
  color: var(--red);

  @media (max-width: ${BREAKPOINTS.MD}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.25rem;
  }
`;

export const Main = styled.main`
  padding: 0 ${homeSidePadding} 5rem;
`;

export const Notification = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 4rem;
  background-color: var(--gray-800);
  color: var(--orange);

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
