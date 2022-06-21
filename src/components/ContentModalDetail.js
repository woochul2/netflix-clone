import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { getContentDetail } from '../api';
import { BREAKPOINTS, TRANSITION_DURATION } from '../constants';
import useIsMounted from '../hooks/useIsMounted';
import addComma from '../utils/addComma';
import DetailLinks from './DetailLinks';
import Tag from './Tag';
import Videos from './Videos';

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
    name,
    title,
  } = detail;

  return (
    <ContentModalDetailBlock style={style}>
      <DetailLinks variant={variant} homepage={homepage} id={id} {...rest} />
      <Overview data-testid="overview">
        {overview.split('. ').join('.\n').split('? ').join('?\n')}
      </Overview>
      <Videos {...rest} />
      <hr />
      <h2>
        {name || title} <span>상세 정보</span>
      </h2>
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

  hr {
    border-color: hsl(0, 0%, 25%);
    margin: 1.5rem 0;

    @media (max-width: ${BREAKPOINTS.md}) {
      margin: 1.25rem 0;
    }

    @media (max-width: ${BREAKPOINTS.sm}) {
      margin: 1rem 0;
    }
  }

  h2 {
    margin-bottom: 0.5rem;

    span {
      font-weight: normal;
    }

    font-size: 1.5rem;

    @media (max-width: ${BREAKPOINTS.md}) {
      font-size: 1.375rem;
    }

    @media (max-width: ${BREAKPOINTS.sm}) {
      font-size: 1rem;
    }
  }

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

  @media (max-width: ${BREAKPOINTS.lg}) {
    font-size: 1.125rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 0.875rem;
  }
`;

export default ContentModalDetail;
