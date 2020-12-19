import styled from 'styled-components';

export const Container = styled.ul`
  list-style: none;
  width: 70%;
  min-width: 320px;
  max-width: 815px;
  margin: 0 auto;
  padding: 70px;

  @media (max-width: 949px) {
    width: 80%;
    padding: 50px 0;
  }

  @media (max-width: 549px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 3.125rem;

  @media (max-width: 949px) {
    font-size: 2.5rem;
  }

  @media (max-width: 549px) {
    font-size: 1.625rem;
  }
`;

export const Item = styled.li`
  font-size: 1.625rem;

  @media (max-width: 949px) {
    font-size: 1.25rem;
  }

  @media (max-width: 549px) {
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
    width: 1em;
    height: 1em;
    transform: translateY(-50%);

    path {
      stroke: hsl(0, 0%, 100%);
    }

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

  &.closed {
    max-height: 0;
    overflow: hidden;
  }

  &.open {
    max-height: 1200px;
  }

  span {
    display: block;
    padding: 1.2em;
  }
`;
