import React, { useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { getJsonFromLink } from '../../utils/getJsonFromLink';
import * as Styled from './styles/ContentBottomPanel';
import tmpTvDetail from './tmp-tv-detail.json';
import tmpTvVideos from './tmp-tv-videos.json';

const getTvDetailLink = (id) => {
  return `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko`;
};

const getTvVideosLink = (id) => {
  return `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko`;
};

const getYoutubeLink = (key) => {
  return `https://www.youtube.com/watch?v=${key}`;
};

export default function ContentBottomPanel({
  id,
  isMouseOn,
  transLength,
  toggleModal,
}) {
  const [tvDetail, setTvDetail] = useState(null);
  const [tvVideos, setTvVideos] = useState(null);

  const getTvDetail = async () => {
    const link = getTvDetailLink(id);
    const json = await getJsonFromLink(link);
    setTvDetail(json);
  };

  const getTvVideos = async () => {
    const link = getTvVideosLink(id);
    const json = await getJsonFromLink(link);
    setTvVideos(json);
  };

  const getData = () => {
    if (!tvDetail) {
      getTvDetail();
    }
    if (!tvVideos) {
      getTvVideos();
    }
  };

  const getTmpData = () => {
    setTvDetail(tmpTvDetail);
    setTvVideos(tmpTvVideos);
  };

  useEffect(() => {
    if (transLength) {
      // getData();
      getTmpData();
    }
  }, [transLength]);

  return (
    <Styled.Container isMouseOn={isMouseOn} transLength={transLength}>
      {!transLength && isMouseOn && (
        <Styled.PanelButton onClick={toggleModal}>
          <BsChevronDown />
        </Styled.PanelButton>
      )}
      {transLength && tvDetail && (
        <>
          <Styled.LinkContainer>
            <Styled.PageLink href={tvDetail.homepage} target="_blank">
              공식 홈페이지
            </Styled.PageLink>
            {tvVideos &&
              tvVideos.results.map(
                (result) =>
                  result.type === 'Trailer' &&
                  result.site === 'YouTube' && (
                    <Styled.PageLink
                      key={result.id}
                      href={getYoutubeLink(result.key)}
                      target="_blank"
                    >
                      {result.name.split('|')[1]}
                    </Styled.PageLink>
                  )
              )}
          </Styled.LinkContainer>
          <Styled.Overview>
            {tvDetail.overview.split('. ').join('.\n').split('?').join('?\n')}
          </Styled.Overview>
          <Styled.Text>
            <Styled.GrayText>장르: </Styled.GrayText>
            {tvDetail.genres.map((genre, index) => (
              <span key={genre.id}>
                {index === tvDetail.genres.length - 1 ? (
                  <>{genre.name}</>
                ) : (
                  <>{genre.name}, </>
                )}
              </span>
            ))}
          </Styled.Text>
          <Styled.Text>
            <Styled.GrayText>첫 방송 날짜: </Styled.GrayText>
            {tvDetail.first_air_date.split('-').join('.')}
          </Styled.Text>
          <Styled.Text>
            <Styled.GrayText>시즌 수: </Styled.GrayText>
            {tvDetail.number_of_seasons}개
          </Styled.Text>
          <Styled.Text>
            <Styled.GrayText>회원 평점: </Styled.GrayText>
            {tvDetail.vote_average}
          </Styled.Text>
          {tvDetail.created_by.length !== 0 && (
            <Styled.Text>
              <Styled.GrayText>제작: </Styled.GrayText>
              {tvDetail.created_by.map((person, index) => (
                <span key={person.id}>
                  {index === tvDetail.created_by.length - 1 ? (
                    <>{person.name}</>
                  ) : (
                    <>{person.name}, </>
                  )}
                </span>
              ))}
            </Styled.Text>
          )}
        </>
      )}
    </Styled.Container>
  );
}
