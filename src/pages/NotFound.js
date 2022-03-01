import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BREAKPOINTS } from '../constants';

function NotFound() {
  return (
    <NotFoundBlock>
      <Notice>
        <h1>죄송합니다. 해당 페이지를 찾을 수 없습니다.</h1>
        <HomeLink to="/">홈으로</HomeLink>
      </Notice>
      <h2>오류 코드: 404</h2>
    </NotFoundBlock>
  );
}

const NotFoundBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8rem;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  color: hsl(0, 0%, 100%);

  @media (max-width: ${BREAKPOINTS.sm}) {
    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1.25rem;
    }
  }
`;

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const HomeLink = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  font-size: 1.25rem;
  background-color: hsl(0, 0%, 100%);
  color: hsl(0, 0%, 0%);

  @media (hover: hover) {
    &:hover {
      background-color: hsl(0, 0%, 80%);
    }
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 1rem;
  }
`;

export default NotFound;
