import styled from 'styled-components/macro';
import * as BREAKPOINTS from '../../../constants/breakpoints';

const sidePadding = {
  default: '3.25rem',
  SM: '2rem;',
};

export const Container = styled.div`
  min-width: 18.75rem;
  background-color: var(--gray-900);
  color: var(--gray-100);
`;

export const Header = styled.header`
  // 모달을 제외한 나머지 중에서 가장 위에 위치하도록 z-index 설정
  z-index: 3;
  position: sticky;
  top: 0;
  left: 0;
  padding: 0.875rem ${sidePadding.default};
  background-image: linear-gradient(hsla(0, 0%, 0%, 0.7) 10%, hsla(0, 0%, 0%, 0));
  transition: background-color 0.4s;

  &.scroll-down {
    background-color: var(--gray-900);
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0.875rem ${sidePadding.SM};
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
  padding: 0 ${sidePadding.default} 5rem;

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0 ${sidePadding.SM};
  }
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
  width: 12.5rem;
  margin: 0 0.25rem 0 0.375rem;
`;
