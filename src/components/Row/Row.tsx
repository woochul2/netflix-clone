import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import { getMockTvShows } from '../../utils/getMockData';
import Content from '../Content';
import * as Styled from './styles/Row';

const getTvShowsLinks = (genreId: number, pageCount: number): string[] => {
  let links = [];
  for (let i = 1; i <= pageCount; i++) {
    links.push(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=${i}&with_networks=213&with_genres=${genreId}`
    );
  }
  return links;
};

interface Props {
  genreId: number;
  genreName: string;
  sliderContentCount: number;
  setContentStyles: () => void;
}

export default function Row({ genreId, genreName, sliderContentCount, setContentStyles }: Props) {
  const [tvShows, setTvShows] = useState<TvShows.Result[]>([]);
  const [sliderStartIndex, setSliderStartIndex] = useState(0);

  useEffect(() => {
    const initTvShows = async () => {
      let filteredTvShows: TvShows.Result[] = [];
      const links = getTvShowsLinks(genreId, 2);

      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const response = await axios.get<TvShows.RootObject>(link);
        const results = response.data.results.filter((result) => result.genre_ids[0] === genreId);
        filteredTvShows = filteredTvShows.concat(results);
      }

      setTvShows(filteredTvShows);
    };

    const initContentStyles = () => {
      const contentWidth = getComputedStyle(document.documentElement).getPropertyValue('--content-width').trim();
      if (contentWidth === '0px') setContentStyles();
    };

    setTvShows(getMockTvShows(genreId));
    // initTvShows();
    initContentStyles();
  }, [genreId, setContentStyles]);

  const handleClickPrevButton = () => {
    let newIndex = sliderStartIndex - sliderContentCount;
    if (newIndex < 0) newIndex = 0;
    setSliderStartIndex(newIndex);
  };

  const handleClickNextButton = () => setSliderStartIndex(sliderStartIndex + sliderContentCount);

  useEffect(() => {
    const translateSlider = () => {
      const slider = document.querySelector<HTMLElement>(`.slider-${genreId}`);
      if (!slider) return;
      if (slider.clientWidth === 0) return;

      if (sliderStartIndex === 0) {
        slider.style.transform = '';
        return;
      }

      const contentWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--content-width'));
      const gap = parseFloat(getComputedStyle(slider).gap);
      slider.style.transform = `translateX(${
        -((sliderStartIndex * (contentWidth + gap)) / slider.clientWidth) * 100
      }%)`;
    };

    translateSlider();
  }, [genreId, sliderStartIndex]);

  const SliderControlButton = (
    <>
      {sliderStartIndex > 0 && (
        <Styled.PrevButton className="slider-control-button" onClick={handleClickPrevButton}>
          <ChevronDownIcon />
        </Styled.PrevButton>
      )}
      {sliderStartIndex + sliderContentCount < tvShows.length && (
        <Styled.NextButton className="slider-control-button" onClick={handleClickNextButton}>
          <ChevronDownIcon />
        </Styled.NextButton>
      )}
    </>
  );

  const getTransformOrigin = (index: number): 'center' | 'left' | 'right' => {
    if (index % sliderContentCount === sliderStartIndex % sliderContentCount) return 'left';
    if (index % sliderContentCount === (sliderStartIndex + sliderContentCount - 1) % sliderContentCount) return 'right';
    return 'center';
  };

  return (
    <Styled.Container>
      <Styled.Title>{genreName}</Styled.Title>
      <Styled.ContentsContainer className={`row-contents-container row-contents-container-${genreId}`}>
        <Styled.Slider className={`slider slider-${genreId}`}>
          {tvShows.map((tvShow, index) => (
            <Content key={tvShow.id} item={tvShow} transformOrigin={getTransformOrigin(index)} />
          ))}
        </Styled.Slider>
        {SliderControlButton}
      </Styled.ContentsContainer>
    </Styled.Container>
  );
}
