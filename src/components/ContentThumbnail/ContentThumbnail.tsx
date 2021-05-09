import React from 'react';
import * as Styled from './styles/ContentThumbnail';

interface Props {
  item: TvShows.Result;
  isHovered: boolean;
  tabIndex?: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ContentThumbnail({ item, isHovered, tabIndex, onMouseEnter, onMouseLeave }: Props) {
  const { backdrop_path, id, name } = item;

  const getImageLink = (img: string | null): string => `https://image.tmdb.org/t/p/original${img}`;

  return (
    <Styled.Container
      className={`content-thumbnail-${id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={tabIndex}
    >
      {isHovered ? (
        <Styled.Img />
      ) : (
        <>
          <Styled.Img src={getImageLink(backdrop_path)} alt={`${name} 썸네일`} />
          <Styled.Title className={`content-title-${id} ${name.length < 7 && 'short'}`}>{name}</Styled.Title>
        </>
      )}
    </Styled.Container>
  );
}
