import styled from 'styled-components';
import { BREAKPOINTS } from '../constants';

/**
 * @param {Object} props
 * @param {string} props.homepage
 * @param {VideoResult} props.videos
 */
function DetailLinks({ homepage, videos }) {
  return (
    <DetailLinksBlock>
      <a href={homepage} aria-label="공식 홈페이지">
        공식 홈페이지
      </a>
      {videos.map(({ id, key, name }) => {
        const title = name.split('|')[1] || name;
        return (
          <a
            key={id}
            href={`https://www.youtube.com/watch?v=${key}`}
            aria-label={title}
          >
            {title}
          </a>
        );
      })}
    </DetailLinksBlock>
  );
}

const DetailLinksBlock = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;

  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: 1.375rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 1rem;
  }

  a {
    display: inline-block;
    text-decoration: none;
    margin-right: 2rem;
    margin-bottom: 0.25rem;
    color: hsl(0, 0%, 100%);

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: ${BREAKPOINTS.md}) {
      margin-right: 1.75rem;
    }

    @media (max-width: ${BREAKPOINTS.sm}) {
      margin-right: 1rem;
    }
  }
`;

export default DetailLinks;
