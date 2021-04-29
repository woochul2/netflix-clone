import styled from 'styled-components/macro';
import * as BREAKPOINTS from '../../../constants/breakpoints';

const sidePadding = '3.25rem';
const smallSidePadding = '2rem';

export const Container = styled.div`
  min-width: 18.75rem;
  background-color: var(--gray-900);
  color: var(--gray-100);
`;

export const Header = styled.header`
  // 컨텐츠 위에 마우스 올려서 이미지가 확대됐을 때의 z-index가 1이므로 2로 더 높게 설정
  z-index: 2;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem ${sidePadding};
  background-image: linear-gradient(hsla(0, 0%, 0%, 0.7) 10%, hsla(0, 0%, 0%, 0));
  transition: background-color 0.4s;

  &.scroll-down {
    background: var(--gray-900);
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0.875rem ${smallSidePadding};
  }
`;

export const LogoLink = styled.a`
  user-select: none;
  margin: 0;
  text-decoration: none;
  font-size: 3rem;
  font-weight: bold;
  color: var(--red);
  font-size: 2rem;

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.25rem;
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
  background-color: var(--gray-800);

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
