import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import { HoveredContent } from '../../types';
import { getMockTvShows } from '../../utils/getMockData';
import { contentTransitionDuration } from '../Content/styles/Content';
import ContentThumbnail from '../ContentThumbnail';
import * as Styled from './styles/Row';

interface Props {
  contentsWrappersRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  slidersRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  contentThumbnailsRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  tvGenre: { id: number; name: string };
  sliderContentCount: number;
  hasClickedContent: boolean;
  setHasClickedContent: React.Dispatch<React.SetStateAction<boolean>>;
  content: HoveredContent | null;
  setContent: React.Dispatch<React.SetStateAction<HoveredContent | null>>;
}

export default function Row({
  contentsWrappersRef,
  slidersRef,
  contentThumbnailsRef,
  tvGenre,
  sliderContentCount,
  hasClickedContent,
  setHasClickedContent,
  content,
  setContent,
}: Props) {
  const { id, name } = tvGenre;
  const [tvShows, setTvShows] = useState<TvShows.Result[]>([]);
  const [sliderStartIndex, setSliderStartIndex] = useState(0);
  const [isSliderMoving, setIsSliderMoving] = useState(false);

  useEffect(() => {
    const getTvShowsLinks = (id: number, pageCount: number): string[] => {
      let links = [];
      for (let i = 1; i <= pageCount; i++) {
        links.push(
          `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=${i}&with_networks=213&with_genres=${id}`
        );
      }
      return links;
    };

    const initTvShows = async () => {
      let filteredTvShows: TvShows.Result[] = [];
      const links = getTvShowsLinks(id, 2);

      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const response = await axios.get<TvShows.RootObject>(link);
        const results = response.data.results.filter((result) => result.genre_ids[0] === id);
        filteredTvShows = filteredTvShows.concat(results);
      }

      setTvShows(filteredTvShows);
    };

    setTvShows(getMockTvShows(id));
    // initTvShows();
  }, [id]);

  const getSliderTransformStyle = (): string | undefined => {
    if (sliderStartIndex === 0) return '';

    const slider = slidersRef.current[`${id}`];
    if (!slider) return;

    const contentWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--content-width'));
    const gap = parseFloat(getComputedStyle(slider).gap);
    return `translateX(${-((sliderStartIndex * (contentWidth + gap)) / slider.clientWidth) * 100}%)`;
  };

  const handleClickPrevButton = () => {
    if (isSliderMoving) return;
    let newIndex = sliderStartIndex - sliderContentCount;
    if (newIndex < 0) newIndex = 0;
    setSliderStartIndex(newIndex);
    setContent(null);

    setIsSliderMoving(true);
    setTimeout(() => {
      setIsSliderMoving(false);
    }, contentTransitionDuration);
  };

  const handleClickNextButton = () => {
    if (isSliderMoving) return;
    const newIndex = sliderStartIndex + sliderContentCount;
    setSliderStartIndex(newIndex);
    setContent(null);

    setIsSliderMoving(true);
    setTimeout(() => {
      setIsSliderMoving(false);
    }, contentTransitionDuration);
  };

  return (
    <Styled.Container>
      <Styled.Title>{name}</Styled.Title>
      <Styled.ContentsWrapper ref={(element) => (contentsWrappersRef.current[`${id}`] = element)}>
        {sliderStartIndex > 0 && (
          <Styled.PrevButton
            aria-label="이전 컨텐츠 보기"
            onClick={handleClickPrevButton}
            tabIndex={content ? -1 : undefined}
            style={{ display: hasClickedContent ? 'none' : '' }}
          >
            <ChevronDownIcon />
          </Styled.PrevButton>
        )}
        <Styled.Slider
          style={{ transform: getSliderTransformStyle() }}
          ref={(element) => (slidersRef.current[`${id}`] = element)}
        >
          {tvShows.map((tvShow, index) => (
            <ContentThumbnail
              key={tvShow.id}
              contentThumbnailsRef={contentThumbnailsRef}
              tvShow={tvShow}
              index={index}
              sliderContentCount={sliderContentCount}
              sliderStartIndex={sliderStartIndex}
              isSliderMoving={isSliderMoving}
              hasClickedContent={hasClickedContent}
              setHasClickedContent={setHasClickedContent}
              content={content}
              setContent={setContent}
            />
          ))}
        </Styled.Slider>
        {sliderStartIndex + sliderContentCount < tvShows.length && (
          <Styled.NextButton
            aria-label="컨텐츠 더 보기"
            onClick={handleClickNextButton}
            tabIndex={content ? -1 : undefined}
            style={{ display: hasClickedContent ? 'none' : '' }}
          >
            <ChevronDownIcon />
          </Styled.NextButton>
        )}
      </Styled.ContentsWrapper>
    </Styled.Container>
  );
}
