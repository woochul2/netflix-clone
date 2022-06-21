import styled from 'styled-components';
import { BREAKPOINTS } from '../constants';
import LinkIcon from '../icons/LinkIcon';

/**
 * @param {Object} props
 * @param {'tv'|'movie'} props.variant
 * @param {string} props.homepage
 * @param {string} props.id
 */
function DetailLinks({ variant, homepage, id }) {
  return (
    <DetailLinksBlock data-testid="detail-links">
      {homepage && (
        <a href={homepage} aria-label="공식 홈페이지">
          공식 홈페이지
          <LinkIcon />
        </a>
      )}
      <a href={`https://www.themoviedb.org/${variant}/${id}/edit`}>
        편집하기
        <LinkIcon />
      </a>
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
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    text-decoration: none;
    margin-bottom: 0.25rem;
    color: hsl(0, 0%, 80%);
    transition: color 0.2s;

    margin-right: 1.5rem;

    @media (max-width: ${BREAKPOINTS.md}) {
      margin-right: 1rem;
    }

    @media (max-width: ${BREAKPOINTS.sm}) {
      margin-right: 0.75rem;
    }

    &:hover {
      color: hsl(32, 98%, 46%);
    }
  }
`;

export default DetailLinks;
