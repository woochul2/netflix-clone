import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { contentTransitionDuration } from '../../components/Content/styles/Content';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import { HoveredContent } from '../../types';
import { getMockTvShows } from '../../utils/getMockData';
import ContentThumbnail from '../ContentThumbnail';
import * as Styled from './styles/Row';

let isMouseOnThumbnail = false;

interface Props {
  contentsWrappers: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  sliders: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  contentThumbnails: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  genreId: number;
  genreName: string;
  initContentStyles: () => void;
  sliderContentCount: number;
  hoveredContent: HoveredContent | null;
  setHoveredContent: React.Dispatch<React.SetStateAction<HoveredContent | null>>;
  hasClickedContent: boolean;
}

export default function Row({
  contentsWrappers,
  sliders,
  contentThumbnails,
  genreId,
  genreName,
  initContentStyles,
  sliderContentCount,
  hoveredContent,
  setHoveredContent,
  hasClickedContent,
}: Props) {
  const [tvShows, setTvShows] = useState<TvShows.Result[]>([]);
  const [sliderStartIndex, setSliderStartIndex] = useState(0);

  useEffect(() => {
    const getTvShowsLinks = (genreId: number, pageCount: number): string[] => {
      let links = [];
      for (let i = 1; i <= pageCount; i++) {
        links.push(
          `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=${i}&with_networks=213&with_genres=${genreId}`
        );
      }
      return links;
    };

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

    setTvShows(getMockTvShows(genreId));
    // initTvShows();
    initContentStyles();
  }, [genreId, initContentStyles]);

  const translateSlider = (newIndex: number) => {
    const slider = sliders.current[`${genreId}`];
    if (!slider) return;

    if (newIndex === 0) {
      slider.style.transform = '';
      return;
    }

    const contentWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--content-width'));
    const gap = parseFloat(getComputedStyle(slider).gap);
    slider.style.transform = `translateX(${-((newIndex * (contentWidth + gap)) / slider.clientWidth) * 100}%)`;
  };

  const getTransformOrigin = (index: number): 'center' | 'left' | 'right' => {
    if (index % sliderContentCount === sliderStartIndex % sliderContentCount) return 'left';
    if (index % sliderContentCount === (sliderStartIndex + sliderContentCount - 1) % sliderContentCount) return 'right';
    return 'center';
  };

  const handleMouseEnterThumbnail = (index: number) => {
    isMouseOnThumbnail = true;
    const transformOrigin = getTransformOrigin(index);
    setTimeout(() => {
      if (!isMouseOnThumbnail) return;
      const tvShow = tvShows[index];
      const contentThumbnail = contentThumbnails.current[`${tvShow.id}`];
      if (!contentThumbnail) return;
      contentThumbnail.style.boxShadow = 'none';
      setHoveredContent({ ...tvShow, transform_origin: transformOrigin });
    }, contentTransitionDuration);
  };

  const handleMouseLeaveThumbnail = () => {
    isMouseOnThumbnail = false;
  };

  const handleClickPrevButton = () => {
    let newIndex = sliderStartIndex - sliderContentCount;
    if (newIndex < 0) newIndex = 0;
    translateSlider(newIndex);
    setSliderStartIndex(newIndex);
  };

  const handleClickNextButton = () => {
    const newIndex = sliderStartIndex + sliderContentCount;
    translateSlider(newIndex);
    setSliderStartIndex(newIndex);
  };

  const checkIsContentHovered = (id: number): boolean => {
    if (!hoveredContent) return false;
    if (hoveredContent.id === id) return true;
    return false;
  };

  const getTabIndex = (index: number): number | undefined => {
    if (index < sliderStartIndex) return -1;
    if (index >= sliderStartIndex + sliderContentCount) return -1;
    return;
  };

  return (
    <Styled.Container>
      <Styled.Title>{genreName}</Styled.Title>
      <Styled.ContentsWrapper ref={(element) => (contentsWrappers.current[`${genreId}`] = element)}>
        {sliderStartIndex > 0 && (
          <Styled.PrevButton
            aria-label="이전 컨텐츠 보기"
            onClick={handleClickPrevButton}
            style={{ display: hasClickedContent ? 'none' : '' }}
          >
            <ChevronDownIcon />
          </Styled.PrevButton>
        )}
        <Styled.Slider ref={(element) => (sliders.current[`${genreId}`] = element)}>
          {tvShows.map((tvShow, index) => (
            <ContentThumbnail
              key={tvShow.id}
              contentThumbnails={contentThumbnails}
              item={tvShow}
              tabIndex={getTabIndex(index)}
              isHovered={checkIsContentHovered(tvShow.id)}
              onMouseEnter={() => handleMouseEnterThumbnail(index)}
              onMouseLeave={handleMouseLeaveThumbnail}
            />
          ))}
        </Styled.Slider>
        {sliderStartIndex + sliderContentCount < tvShows.length && (
          <Styled.NextButton
            aria-label="컨텐츠 더 보기"
            onClick={handleClickNextButton}
            style={{ display: hasClickedContent ? 'none' : '' }}
          >
            <ChevronDownIcon />
          </Styled.NextButton>
        )}
      </Styled.ContentsWrapper>
    </Styled.Container>
  );
}
