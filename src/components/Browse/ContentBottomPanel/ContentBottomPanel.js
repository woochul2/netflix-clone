import React, { useEffect, useState } from 'react';
import {
  Container,
  PanelButton,
  LinkContainer,
  PageLink,
  Overview,
  Text,
  GrayText,
} from './ContentBottomPanelStyles';
import { getJsonFromLink } from '../../../utils';
import { BsChevronDown } from 'react-icons/bs';
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
      getData();
      // getTmpData();
    }
  }, [transLength]);

  return (
    <Container isMouseOn={isMouseOn} transLength={transLength}>
      {!transLength && isMouseOn && (
        <PanelButton onClick={toggleModal}>
          <BsChevronDown />
        </PanelButton>
      )}
      {transLength && tvDetail && (
        <>
          <LinkContainer>
            <PageLink href={tvDetail.homepage} target="_blank">
              공식 홈페이지
            </PageLink>
            {tvVideos &&
              tvVideos.results.map(
                (result) =>
                  result.type == 'Trailer' &&
                  result.site == 'YouTube' && (
                    <PageLink
                      key={result.id}
                      href={getYoutubeLink(result.key)}
                      target="_blank"
                    >
                      {result.name.split('|')[1]}
                    </PageLink>
                  )
              )}
          </LinkContainer>
          <Overview>
            {tvDetail.overview.split('. ').join('.\n').split('?').join('?\n')}
          </Overview>
          <Text>
            <GrayText>장르: </GrayText>
            {tvDetail.genres.map((genre, idx) => (
              <span key={genre.id}>
                {idx == tvDetail.genres.length - 1 ? (
                  <>{genre.name}</>
                ) : (
                  <>{genre.name}, </>
                )}
              </span>
            ))}
          </Text>
          <Text>
            <GrayText>첫 방송 날짜: </GrayText>
            {tvDetail.first_air_date.split('-').join('.')}
          </Text>
          <Text>
            <GrayText>시즌 수: </GrayText>
            {tvDetail.number_of_seasons}개
          </Text>
          <Text>
            <GrayText>회원 평점: </GrayText>
            {tvDetail.vote_average}
          </Text>
          {tvDetail.created_by.length != 0 && (
            <Text>
              <GrayText>제작: </GrayText>
              {tvDetail.created_by.map((person, idx) => (
                <span key={person.id}>
                  {idx == tvDetail.created_by.length - 1 ? (
                    <>{person.name}</>
                  ) : (
                    <>{person.name}, </>
                  )}
                </span>
              ))}
            </Text>
          )}
        </>
      )}
    </Container>
  );
}
