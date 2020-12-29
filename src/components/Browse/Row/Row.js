import React, { useState, useEffect } from 'react';
import { TMDB_API_KEY } from '../../../private-config';
import { Container, Title, ContentsContainer } from './RowStyles';
import Content from '../Content';

const TMDB_NETFLIX_TVSHOWS_LINK = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=1&with_networks=213&with_genres=`;

export default function Row({ genreId, genreName }) {
  const [tvShows, setTvShows] = useState([]);

  const getTvShows = async () => {
    const response = await fetch(TMDB_NETFLIX_TVSHOWS_LINK + genreId);
    const json = await response.json();
    setTvShows(json.results.slice(0, 6));
  };

  useEffect(() => {
    getTvShows();
  }, []);

  return (
    <Container>
      <Title>{genreName}</Title>
      <ContentsContainer>
        {tvShows.map((item) => (
          <Content key={item.id} poster={item.poster_path} />
        ))}
      </ContentsContainer>
    </Container>
  );
}
