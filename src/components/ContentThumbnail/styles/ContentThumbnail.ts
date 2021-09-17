import styled from 'styled-components/macro';
import { contentBorderRadius, Title as ContentTitle } from '../../Content/styles/Content';

export const Container = styled.div`
  position: relative;
  width: var(--content-width);
  font-size: calc(var(--content-width) / 10);
  color: var(--gray-100);
`;

export const ImgButton = styled.button`
  cursor: pointer;
  display: block;
  overflow: hidden;
  padding: 0;
  border: 0;
  border-radius: ${contentBorderRadius};
  background: none;

  &.hidden {
    display: none;
  }
`;

export const Img = styled.img`
  width: 100%;

  &.hidden {
    display: none;
  }
`;

export const Title = styled(ContentTitle)``;
