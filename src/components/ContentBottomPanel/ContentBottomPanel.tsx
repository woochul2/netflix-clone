import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useVideos } from '../../hooks/useVideos';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import * as Styled from './styles/ContentBottomPanel';

interface Props {
  contentBottomPanelRef: React.RefObject<HTMLDivElement>;
  variant: 'tv' | 'movie';
  id: number;
  hasClickedContent: boolean;
  setHasClickedContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContentBottomPanel({
  contentBottomPanelRef,
  variant,
  id,
  hasClickedContent,
  setHasClickedContent,
}: Props) {
  const [detail, setDetail] = useState<any>();
  const videos = useVideos(variant, id);

  const getYoutubeLink = (key: string): string => `https://www.youtube.com/watch?v=${key}`;

  useEffect(() => {
    if (hasClickedContent && !detail) {
      (async function () {
        const link = `https://api.themoviedb.org/3/${variant}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko`;
        const response = await axios.get<TvDetail.RootObject>(link);
        setDetail(response.data);
      })();
    }
  }, [variant, id, detail, hasClickedContent]);

  const handleClickDetailButton = () => {
    setHasClickedContent(true);
  };

  const VideoLinks = (
    <>
      {videos?.results.map(
        (result) =>
          result.type === 'Trailer' &&
          result.site === 'YouTube' && (
            <Styled.PageLink
              key={result.id}
              href={getYoutubeLink(result.key)}
              target="_blank"
              aria-label={`${result.name.split('|')[1]}`}
            >
              {result.name.split('|')[1]}
            </Styled.PageLink>
          )
      )}
    </>
  );

  return (
    <Styled.Container className={hasClickedContent ? 'clicked' : ''} ref={contentBottomPanelRef}>
      {!hasClickedContent && (
        <Styled.DetailButton aria-label="상세 정보 보기" onClick={handleClickDetailButton}>
          <ChevronDownIcon />
        </Styled.DetailButton>
      )}
      {hasClickedContent && detail && (
        <>
          <Styled.LinkContainer>
            <Styled.PageLink href={detail.homepage} target="_blank" aria-label="공식 홈페이지">
              공식 홈페이지
            </Styled.PageLink>
            {VideoLinks}
          </Styled.LinkContainer>
          <Styled.Overview>{detail.overview.split('. ').join('.\n').split('?').join('?\n')}</Styled.Overview>
          <Styled.Text>
            <Styled.GrayText>장르: </Styled.GrayText>
            {detail.genres.map((genre: any, index: number) => (
              <span key={genre.id}>{index === detail.genres.length - 1 ? <>{genre.name}</> : <>{genre.name}, </>}</span>
            ))}
          </Styled.Text>
          <Styled.Text>
            {variant === 'tv' && (
              <>
                <Styled.GrayText>첫 방송 날짜: </Styled.GrayText>
                {detail.first_air_date.split('-').join('.')}
              </>
            )}
            {variant === 'movie' && (
              <>
                <Styled.GrayText>개봉일: </Styled.GrayText>
                {detail.release_date.split('-').join('.')}
              </>
            )}
          </Styled.Text>
          {variant === 'tv' && (
            <Styled.Text>
              <Styled.GrayText>시즌 수: </Styled.GrayText>
              {detail.number_of_seasons}개
            </Styled.Text>
          )}
          <Styled.Text>
            <Styled.GrayText>회원 평점: </Styled.GrayText>
            {detail.vote_average}
          </Styled.Text>
          {variant === 'tv' && detail.created_by.length !== 0 && (
            <Styled.Text>
              <Styled.GrayText>제작: </Styled.GrayText>
              {detail.created_by.map((person: any, index: number) => (
                <span key={person.id}>
                  {index === detail.created_by.length - 1 ? <>{person.name}</> : <>{person.name}, </>}
                </span>
              ))}
            </Styled.Text>
          )}
          {variant === 'movie' && (
            <>
              <Styled.Text>
                <Styled.GrayText>상영 시간: </Styled.GrayText>
                {detail.runtime}분
              </Styled.Text>
              {detail.budget > 0 && (
                <Styled.Text>
                  <Styled.GrayText>제작비: </Styled.GrayText>
                  {detail.budget.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  })}
                </Styled.Text>
              )}
            </>
          )}
          <Styled.EditLink
            href={`https://www.themoviedb.org/${variant}/${id}/edit`}
            target="_blank"
            aria-label="편집하기"
          >
            편집하기
          </Styled.EditLink>
        </>
      )}
    </Styled.Container>
  );
}
