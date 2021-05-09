import styled from 'styled-components/macro';
import {
  contentBorderRadius,
  contentBoxShadow,
  contentTransitionDuration,
  roundButton,
} from '../../Content/styles/Content';

export const Container = styled.div`
  // 그림자가 이미지 덮어쓰지 않게 하기 위해 z-index 설정
  z-index: -1;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--content-width);
  border-bottom-left-radius: ${contentBorderRadius};
  border-bottom-right-radius: ${contentBorderRadius};
  box-shadow: ${contentBoxShadow};
  background-color: var(--gray-900);
  transition: all ${`${contentTransitionDuration}ms`};
`;

export const PanelButton = styled(roundButton)`
  width: 1.25em;
  height: 1.25em;
  border: 0.09em solid var(--gray-400);
  margin: 0.3em;

  &:hover,
  &:focus-visible {
    border-color: var(--gray-100);
    background-color: var(--gray-700);
  }

  svg {
    padding: 0.25em;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 0.35em;
  margin: 1em 1.275em 0.7em;
`;

export const PageLink = styled.a`
  text-decoration: none;
  margin-right: 1em;
  color: var(--white);

  &:hover {
    text-decoration: underline;
  }
`;

export const Overview = styled.p`
  white-space: pre-line;
  font-size: 0.3em;
  margin: 0 1.5em 1em;
`;

export const Text = styled.p`
  font-size: 0.275em;
  margin: 0 1.625em 0.4em;
`;

export const GrayText = styled.span`
  color: var(--gray-400);
`;
