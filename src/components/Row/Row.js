import React, { useEffect, useState } from 'react';
import { getJsonFromLink } from '../../utils/getJsonFromLink';
import Content from '../Content';
import * as Styled from './styles/Row';
import tmpTvShows from './tmp-tv-shows.json';

const getNetflixTvShowsLink = (genreId) => {
  return `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=1&with_networks=213&with_genres=${genreId}`;
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
    getTvShows();
    // tmpGetTvShows();
  }, []);

  return (
    <Styled.Container>
      <Styled.Title>{genreName}</Styled.Title>
      <Styled.ContentsContainer>
        {tvShows.map((item) => (
          <Content key={item.id} item={item} {...restProps} />
        ))}
      </Styled.ContentsContainer>
    </Styled.Container>
  );
}
