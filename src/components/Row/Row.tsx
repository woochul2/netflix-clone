import { useEffect, useState } from 'react';
import { getJsonFromLink } from '../../utils/getJsonFromLink';
import Content from '../Content';
import mockTvShows from './mock-tv-shows.json';
import * as Styled from './styles/Row';

const getNetflixTvShowsLink = (genreId: number): string => {
  return `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=1&with_networks=213&with_genres=${genreId}`;
};

interface Props {
  genreId: number;
  genreName: string;
  initContentTitleFontSize: () => void;
  isMouseOnContent: boolean;
  setIsMouseOnContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Row({ genreId, genreName, ...restProps }: Props) {
  const [tvShows, setTvShows] = useState<TvShows.Result[]>([]);

  const filterTvShows = (json: TvShows.RootObject, length: number) => {
    const results = json.results;
    let newResults = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.genre_ids[0] === genreId) {
        newResults.push(result);
      }
      if (newResults.length === length) {
        break;
      }
    }

    setTvShows(newResults);
  };

  const getTvShows = async () => {
    const link = getNetflixTvShowsLink(genreId);
    const json = await getJsonFromLink<TvShows.RootObject>(link);
    filterTvShows(json, 6);
  };

  const getMockTvShows = () => {
    filterTvShows(mockTvShows, 6);
  };

  useEffect(() => {
    // getTvShows();
    getMockTvShows();
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