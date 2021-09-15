import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import { changeRemToPx } from '../../utils/changeRemToPx';
import { contentTransitionDuration } from '../Content/styles/Content';
import ContentThumbnail from '../ContentThumbnail';
import * as Styled from './styles/Row';

interface Props {
  contentsWrappersRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  slidersRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  contentThumbnailsRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  variant: 'tv' | 'movie';
  genre: { id: number; name: string };
  sliderContentCount: number;
  hasClickedContent: boolean;
  setHasClickedContent: React.Dispatch<React.SetStateAction<boolean>>;
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
}

export default function Row({
  contentsWrappersRef,
  slidersRef,
  contentThumbnailsRef,
  variant,
  genre,
  sliderContentCount,
  hasClickedContent,
  setHasClickedContent,
  content,
  setContent,
}: Props) {
  const { id, name } = genre;
  const [contentsInfo, setContentsInfo] = useState<any[]>([]);
  const [sliderStartIndex, setSliderStartIndex] = useState(0);
  const [isSliderMoving, setIsSliderMoving] = useState(false);

  useEffect(() => {
    const getContentsUrls = (id: number, pageCount: number): string[] => {
      const urls = [];
      for (let i = 1; i <= pageCount; i++) {
        const BASE_ENDPOINT = 'https://api.themoviedb.org/3/discover';
        const apiUrl = `${BASE_ENDPOINT}/${variant}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko&sort_by=popularity.desc&page=${i}&with_genres=${id}`;
        const url =
          variant === 'tv'
            ? `${apiUrl}&with_networks=213`
            : `${apiUrl}&region=KR&with_watch_providers=8&watch_region=KR`;
        urls.push(url);
      }
      return urls;
    };

    const initContentsInfo = async () => {
      const filteredContentsInfo: any[] = [];
      const urls = getContentsUrls(id, 2);

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const response = await axios.get(url);
        const results = response.data.results.filter((result: any) => result.genre_ids[0] === id);
        filteredContentsInfo.push(...results);
      }

      setContentsInfo(filteredContentsInfo);
    };

    initContentsInfo();
  }, [variant, id]);

  const getSliderStyle = (): React.CSSProperties | undefined => {
    if (sliderStartIndex === 0) return;

    const slider = slidersRef.current[`${id}`];
    if (!slider) return;

    const contentWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--content-width'));
    const gap = changeRemToPx(Styled.sliderGap);
    return {
      transform: `translateX(${-((sliderStartIndex * (contentWidth + gap)) / slider.clientWidth) * 100}%)`,
    };
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
        <Styled.Slider style={getSliderStyle()} ref={(element) => (slidersRef.current[`${id}`] = element)}>
          {contentsInfo.map((contentInfo, index) => (
            <ContentThumbnail
              key={contentInfo.id}
              contentThumbnailsRef={contentThumbnailsRef}
              variant={variant}
              contentInfo={contentInfo}
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
        {sliderStartIndex + sliderContentCount < contentsInfo.length && (
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
