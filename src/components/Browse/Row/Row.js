import React, { useState, useEffect } from 'react';
import { Container, Title, ContentsContainer } from './RowStyles';
import { TMDB_API_KEY } from '../../../private-config';
import { getJsonFromLink } from '../../../utils';
import Content from '../Content';
import tmpTvShows from './tmp-tv-shows.json';

const getNetflixTvShowsLink = (genreId) => {
  return `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=1&with_networks=213&with_genres=${genreId}`;
};

export default function Row({ genreId, genreName, ...restProps }) {
  const [tvShows, setTvShows] = useState([]);

  const filterTvShows = (json, length) => {
    const results = json.results;
    let newResults = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.genre_ids[0] == genreId) {
        newResults.push(result);
      }
      if (newResults.length == length) {
        break;
      }
    }

    setTvShows(newResults);
  };

  const getTvShows = async () => {
    const link = getNetflixTvShowsLink(genreId);
    const json = await getJsonFromLink(link);
    filterTvShows(json, 6);
  };

  const tmpGetTvShows = () => {
    filterTvShows(tmpTvShows, 6);
  };

  useEffect(() => {
    // getTvShows();
    tmpGetTvShows();
  }, []);

  return (
    <Container>
      <Title>{genreName}</Title>
      <ContentsContainer>
        {tvShows.map((item) => (
          <Content key={item.id} item={item} {...restProps} />
        ))}
      </ContentsContainer>
    </Container>
  );
}
