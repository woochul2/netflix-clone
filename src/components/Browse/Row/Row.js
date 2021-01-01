import React, { useState, useEffect } from 'react';
import { Container, Title, ContentsContainer } from './RowStyles';
import { TMDB_API_KEY } from '../../../private-config';
import Content from '../Content';
import tmpData from './tmp-data.json';

const TMDB_NETFLIX_TVSHOWS_LINK = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=1&with_networks=213&with_genres=`;

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
    const response = await fetch(TMDB_NETFLIX_TVSHOWS_LINK + genreId);
    const json = await response.json();
    filterTvShows(json, 6);
  };

  const tmpGetTvShows = () => {
    filterTvShows(tmpData, 6);
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
