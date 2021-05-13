import styled from 'styled-components/macro';
import { contentBorderRadius, contentBoxShadow, Title as ContentTitle } from '../../Content/styles/Content';

export const Container = styled.button`
  cursor: pointer;
  position: relative;
  width: var(--content-width);
  padding: 0;
  font-size: calc(var(--content-width) / 10);
  border: 0;
  box-shadow: ${contentBoxShadow};
  background: none;
  color: var(--gray-100);
`;

export const Img = styled.img`
  border-radius: ${contentBorderRadius};
  width: 100%;
`;

export const Title = styled(ContentTitle)`
  // FIXME: Container를 button으로 설정하면, Title 위치, 높이가 변해서 얼추 괜찮아 보이게 임시로 넣은 값.
  bottom: 0.58rem;
`;
