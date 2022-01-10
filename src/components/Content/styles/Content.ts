import styled from 'styled-components/macro';

export const contentBorderRadius = '0.25rem';
export const contentBoxShadow = '0 0.25rem 0.5rem hsla(0, 0%, 0%, 0.75)';
export const contentTransitionDuration = 200;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  border-radius: ${contentBorderRadius};

  &.clicked {
    // 가장 위에 위치하도록 z-index 설정
    z-index: 4;
    overflow: auto;
    background-color: hsla(0, 0%, 0%, 0.7);
  }
`;

export const Inside = styled.div`
  // 가장 위에 위치하도록 z-index 설정
  z-index: 4;
  position: absolute;
  border-radius: ${contentBorderRadius};
  box-shadow: ${contentBoxShadow};
  transform-origin: top left;
  transition-property: transform;
  transition-duration: ${`${contentTransitionDuration}ms`};
`;

export const ImgContainer = styled.div`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: ${contentBorderRadius};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export const Img = styled.img`
  width: 100%;
`;

export const Title = styled.h3`
  user-select: none;
  cursor: pointer;
  position: absolute;
  bottom: 0.3em;
  right: 0.4em;
  text-align: right;
  font-family: 'Nanum Brush Script', cursive;
  font-size: 1em;
  mix-blend-mode: luminosity;
  background: radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 100%);

  &.short {
    background: radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 70%);
  }
`;

export const Iframe = styled.iframe`
  border: 0;
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
