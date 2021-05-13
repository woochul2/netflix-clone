import styled from 'styled-components/macro';

export const contentBorderRadius = '0.25rem';
export const contentBoxShadow = '0 0 0.25rem 0.065rem var(--black)';
export const contentTransitionDuration = 200;

export const Container = styled.div`
  // 가장 위에 위치하도록 z-index 설정
  z-index: 3;
  position: absolute;
  font-size: calc(var(--content-width) / 10);
  border-radius: ${contentBorderRadius};

  &.clicked {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: hsla(0, 0%, 0%, 0.7);
  }
`;

export const Inside = styled.div`
  width: var(--content-width);
  border-radius: ${contentBorderRadius};
  box-shadow: ${contentBoxShadow};
  transition: transform ${`${contentTransitionDuration}ms`};

  &:hover:not(.clicked) {
    transform: scale(1.5);

    [class^='Content__ImgContainer'] {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    [class^='ContentBottomPanel__Container'] {
      visibility: visible;
      opacity: 1;
    }
  }

  &.clicked {
    position: absolute;
  }
`;

export const ImgContainer = styled.div`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: ${contentBorderRadius};

  &.clicked {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const Img = styled.img`
  width: 100%;
`;

export const Title = styled.h3`
  position: absolute;
  bottom: 0.38rem;
  right: 0.5rem;
  text-align: right;
  font-family: 'Nanum Brush Script', cursive;
  font-size: 1em;
  mix-blend-mode: luminosity;
  background: radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 100%);

  &.short {
    background: radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 70%);
  }
`;

export const roundButton = styled.button`
  cursor: pointer;
  position: relative;
  border: 0;
  border-radius: 100%;
  background-color: var(--gray-900);
  color: var(--gray-100);

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
