import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { getContentDetail } from '../api';
import { BREAKPOINTS, TRANSITION_DURATION } from '../constants';
import useIsMounted from '../hooks/useIsMounted';
import addComma from '../utils/addComma';
import DetailLinks from './DetailLinks';
import Tag from './Tag';

/**
 * @param {Object} props
 * @param {'tv'|'movie'} props.variant
 * @param {string} props.id
 * @param {React.CSSProperties} props.style
 * @param {VideoResult} props.videos
 */
function ContentModalDetail({ variant, id, style, ...rest }) {
  const isMounted = useIsMounted();

  const [detail, setDetail] = useState(() => {
    getContentDetail(variant, id).then((value) => {
      if (isMounted()) setDetail(value);
    });
  });

  if (!detail) return <></>;

  const {
    homepage,
    overview,
    genres,
    first_air_date,
    number_of_seasons,
    vote_average,
    vote_count,
    created_by,
    release_date,
    runtime,
    budget,
  } = detail;

  return (
    <ContentModalDetailBlock style={style}>
      <DetailLinks homepage={homepage} {...rest} />
      <Overview>
        {overview.split('. ').join('.\n').split('? ').join('?\n')}
      </Overview>
      <Tag
        label="장르"
        text={genres.map((genre, index) => (
          <Fragment key={genre.id}>
            {addComma(genre.name, index < genres.length - 1)}
          </Fragment>
        ))}
      />
      {variant === 'tv' && (
        <Tag label="첫 방송 날짜" text={first_air_date.split('-').join('.')} />
      )}
      {variant === 'movie' && (
        <Tag label="개봉일" text={release_date.split('-').join('.')} />
      )}
      {variant === 'tv' && (
        <Tag label="시즌 수" text={`${number_of_seasons}개`} />
      )}
      <Tag
        label="회원 평점"
        text={`${vote_average} (${vote_count.toLocaleString('en-US')}개)`}
      />
      {variant === 'tv' && created_by.length !== 0 && (
        <Tag
          label="제작"
          text={created_by.map((person, index) => (
            <Fragment key={person.id}>
              {addComma(person.name, index < created_by.length - 1)}
            </Fragment>
          ))}
        />
      )}
      {variant === 'movie' && (
        <>
          <Tag label="상영 시간" text={`${runtime}분`} />
          {budget > 0 && (
            <Tag
              label="제작비"
              text={budget.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}
            />
          )}
        </>
      )}
      <EditLink
        href={`https://www.themoviedb.org/tv/${id}/edit`}
        aria-label="편집하기"
      >
        편집하기
      </EditLink>
    </ContentModalDetailBlock>
  );
}

const ContentModalDetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: hsl(0, 0%, 8%);
  color: hsl(0, 0%, 100%);
  opacity: 0;
  transition: opacity ${TRANSITION_DURATION};

  @media (min-width: ${BREAKPOINTS.xxl}) {
    padding: 1.75rem 3rem;
  }

  padding: 1.875vw 3vw;

  @media (max-width: ${BREAKPOINTS.md}) {
    padding: 1.125rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding: 1rem;
  }
`;

const Overview = styled.p`
  white-space: pre-line;
  font-size: 1.25rem;
  margin-bottom: 1rem;

  @media (max-width: ${BREAKPOINTS.lg}) {
    font-size: 1.125rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 0.875rem;
  }
`;

const EditLink = styled.a`
  align-self: baseline;
  text-decoration: none;
  color: hsl(0, 0%, 65%);
  transition: color 0.2s;

  margin-top: 2rem;
  font-size: 1rem;

  &:hover {
    color: hsl(32, 98%, 46%);
  }

  @media (max-width: ${BREAKPOINTS.lg}) {
    margin-top: 1.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    margin-top: 1rem;
    font-size: 0.75rem;
  }
`;

export default ContentModalDetail;
