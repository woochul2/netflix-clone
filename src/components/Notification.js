import isMobile from 'ismobilejs';
import styled from 'styled-components';
import { BREAKPOINTS, SIDE_PADDING } from '../constants';

function Notification() {
  return (
    <NotificationBlock
      className={isMobile().any ? 'mobile' : ''}
      data-testid="notification"
    >
      모든 데이터베이스는
      <TMDBLink href="https://www.themoviedb.org/" aria-label="The Movie DB">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          className="short"
          alt="The Movie DB 로고"
        />
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
          className="long"
          alt="The Movie DB 로고"
        />
      </TMDBLink>
      에서 받아왔습니다.
    </NotificationBlock>
  );
}

const NotificationBlock = styled.div`
  position: relative;
  text-align: center;
  font-weight: bold;
  padding: 0 0.25rem;
  background-color: hsl(0, 0%, 13%);
  color: hsl(32, 98%, 46%);

  @media (min-width: ${BREAKPOINTS.xxl}) {
    margin: 0 ${SIDE_PADDING.xxl} 4vw;
  }

  margin: 0 4% 3rem;
  font-size: 1.2rem;

  @media (max-width: ${BREAKPOINTS.xl}) {
    font-size: 1.3vw;
  }

  @media (max-width: ${BREAKPOINTS.lg}) {
    font-size: 1.6vw;
  }

  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: 0.875rem;
    &:not(.mobile) {
      margin: 0 ${SIDE_PADDING.md} 4vw;
    }
    &.mobile {
      margin: 0 4% 4vw;
    }
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 0.75rem;
  }
`;

const TMDBLink = styled.a`
  display: inline-block;
  margin: 0 0.2em 0 0.3em;

  .long {
    width: 10em;
  }

  .short {
    width: 6em;
    display: none;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    .short {
      display: inline-block;
    }

    .long {
      display: none;
    }
  }
`;

export default Notification;
