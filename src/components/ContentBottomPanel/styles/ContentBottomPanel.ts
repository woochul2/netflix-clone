import styled from 'styled-components/macro';
import * as BREAKPOINTS from '../../../constants/breakpoints';
import { contentBorderRadius, contentBoxShadow, roundButton } from '../../Content/styles/Content';

export const Container = styled.div`
  // 그림자가 이미지 덮어쓰지 않게 하기 위해 z-index 설정
  visibility: hidden;
  z-index: -1;
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-bottom-left-radius: ${contentBorderRadius};
  border-bottom-right-radius: ${contentBorderRadius};
  box-shadow: ${contentBoxShadow};
  background-color: var(--gray-900);

  &.clicked {
    visibility: visible;
    align-items: flex-start;
    padding: 1.5rem 2rem;
  }

  @media (max-width: ${BREAKPOINTS.LG}) {
    &.clicked {
      padding: 1.25rem 1.75rem;
    }
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    &.clicked {
      padding: 1rem 1.5rem;
    }
  }
`;

export const DetailButton = styled(roundButton)`
  width: 1.25em;
  height: 1.25em;
  border: 0.09em solid var(--gray-400);
  margin: 0.3em;

  &:focus-visible {
    border-color: var(--gray-100);
    background-color: var(--gray-700);
  }

  svg {
    padding: 0.25em;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: var(--gray-100);
      background-color: var(--gray-700);
    }
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.75rem;
  margin-bottom: 1rem;

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.375rem;
  }
`;

export const PageLink = styled.a`
  text-decoration: none;
  margin-right: 2rem;
  color: var(--white);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: ${BREAKPOINTS.LG}) {
    margin-right: 1.5rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    margin-right: 1rem;
  }
`;

export const Overview = styled.p`
  white-space: pre-line;
  font-size: 1.25rem;
  margin-bottom: 1rem;

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 1.125rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1rem;
  }
`;

export const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 0.25rem;

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 0.875rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 0.75rem;
  }
`;

export const GrayText = styled.span`
  color: var(--gray-400);
`;
