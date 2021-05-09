import styled from 'styled-components/macro';
import { contentBorderRadius, contentBoxShadow, Title as ContentTitle } from '../../Content/styles/Content';

export const Container = styled.div`
  cursor: pointer;
  position: relative;
  width: var(--content-width);
  padding: 0;
  font-size: calc(var(--content-width) / 10);
  border: 0;
  border-radius: ${contentBorderRadius};
  box-shadow: ${contentBoxShadow};
  background: none;
  color: var(--gray-100);
`;

export const Img = styled.img`
  border-radius: ${contentBorderRadius};
  width: 100%;
`;

export const Title = styled(ContentTitle)``;
