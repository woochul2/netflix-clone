import styled from 'styled-components';
import * as BREAKPOINTS from '../../constants/breakpoints';

export const Container = styled.div`
  border-bottom: 8px solid hsl(0, 0%, 13%);
  padding: 70px 45px;

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    padding: 50px 0;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 3.125rem;
  min-width: 350px;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    font-size: 1.625rem;
  }
`;

export const ItemsContainer = styled.ul`
  min-width: 320px;
  max-width: 815px;
  list-style: none;
  width: 70%;
  margin: 0 auto;
  padding: 0;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    width: 90%;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    width: 100%;
  }
`;

export const ItemContainer = styled.li`
  font-size: 1.625rem;

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    font-size: 1.125rem;
  }
`;

export const Question = styled.button`
  cursor: pointer;
  width: 100%;
  border: 0;
  padding: 0;
  margin-bottom: 1px;

  span {
    position: relative;
    display: block;
    text-align: left;
    background-color: #303030;
    color: hsl(0, 0%, 100%);
    padding: 0.8em 2.2em 0.8em 1.2em;
  }

  &:focus,
  span {
    outline: none;
  }

  &:focus > span {
    outline: hsl(0, 0%, 100%) 2px solid;
  }

  svg {
    position: absolute;
    right: 1em;
    top: 50%;
    width: 1.4em;
    height: 1.4em;
    transform: translateY(-50%);

    &.rotate {
      transform: translateY(-50%) rotate(45deg);
    }
  }
`;

export const Answer = styled.div`
  white-space: pre-wrap;
  margin-bottom: 8px;
  background-color: hsl(0, 0%, 19%);
  transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  overflow: hidden;

  &.closed {
    max-height: 0;
  }

  &.open {
    max-height: 1200px;
  }

  span {
    display: block;
    padding: 1.2em;
  }
`;
