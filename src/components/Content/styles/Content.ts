import styled, { css } from 'styled-components/macro';

export const borderRadius = '0.2rem';
export const boxShadow = '0 0 0.2rem 0.07rem var(--black)';
export const transitionDuration = 300;

export const Container = styled.div<{
  contentHeight: string;
}>`
  font-size: calc(var(--content-width) / 10);

  &:hover:not(.clicked) {
    // 헤더보다는 낮게, 줄어드는 이미지보다는 위에 보이도록 z-index 설정
    z-index: 2;
  }

  &.clicked {
    // 모달이 가장 위에 위치하도록 z-index 설정
    z-index: 999;
    overflow: auto;
    position: absolute;
    width: 100vw;
    height: ${({ contentHeight }) => contentHeight};
    background-color: hsla(0, 0%, 0%, 0.7);
  }
`;

export const Inner = styled.div<{
  transformOrigin: 'center' | 'left' | 'right';
}>`
  width: var(--content-width);
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  transform-origin: ${({ transformOrigin }) => transformOrigin};
  transition: transform ${`${transitionDuration}ms`};

  &.shrinking {
    transform-origin: center;
  }

  &.clicked {
    position: absolute;
    transform-origin: center;

    .content-bottom-panel {
      visibility: 'visible';
      opacity: 1;
      align-items: flex-start;
      padding-bottom: 0.5em;
    }

    .content-img-container {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .content-bottom-panel {
      visibility: visible;
      opacity: 1;
    }
  }

  &:hover:not(.clicked) {
    transform: scale(1.2);
  }

  &:hover {
    .content-img-container {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .content-bottom-panel {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const ImgContainer = styled.div`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: ${borderRadius};
`;

export const Title = styled.h3<{
  length: number;
}>`
  position: absolute;
  bottom: 0.38rem;
  right: 0.5rem;
  text-align: right;
  font-family: 'Nanum Brush Script', cursive;
  font-size: 1em;
  mix-blend-mode: luminosity;
  ${({ length }) =>
    length < 7
      ? css`
          background: radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 70%);
        `
      : css`
          background: radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 100%);
        `};
`;

export const Img = styled.img`
  width: 100%;
`;

export const roundButton = styled.button`
  cursor: pointer;
  position: relative;
  border: 0;
  border-radius: 100%;
  background-color: var(--gray-900);
  color: var(--gray-100);

  &:focus:not(:focus-visible) {
    outline: 0;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const CloseButton = styled(roundButton)`
  position: absolute;
  top: -0.3em;
  right: -0.3em;
  width: 1em;
  height: 1em;
  transform: scale(0.3);

  svg {
    width: 0.8em;
    padding: 0.05em;
  }
`;

export const FakeContent = styled.div`
  width: var(--content-width);
`;
