import styled from 'styled-components/macro';
import { contentBorderRadius, contentBoxShadow, Title as ContentTitle } from '../../Content/styles/Content';

export const Container = styled.div`
  position: relative;
  color: var(--gray-100);
`;

export const ImgButton = styled.button`
  cursor: pointer;
  display: block;
  overflow: hidden;
  padding: 0;
  border: 0;
  border-radius: ${contentBorderRadius};
  box-shadow: ${contentBoxShadow};
  background: none;
`;

export const Img = styled.img`
  width: 100%;
`;

export const Title = styled(ContentTitle)``;
