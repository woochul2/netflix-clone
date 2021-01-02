import styled from 'styled-components';

const borderRadius = '0.2rem';
const boxShadow = '0 0 0.2rem 0.07rem var(--black)';
export const transitionDuration = 300;
const cssTransitionDuration = `${transitionDuration / 1000}s`;

export const Container = styled.div`
  cursor: pointer;
  position: relative;
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  transition: transform ${cssTransitionDuration};
  z-index: ${({ isMouseOn, isMouseLeave }) => (isMouseOn || isMouseLeave) && 1};
  transform: ${({ isMouseOn }) => isMouseOn && 'scale(1.3)'};
`;

export const ImgContainer = styled.div`
  overflow: hidden;
  border-radius: ${borderRadius};
  border-bottom-left-radius: ${({ isMouseOn }) => isMouseOn && '0'};
  border-bottom-right-radius: ${({ isMouseOn }) => isMouseOn && '0'};
`;

export const Title = styled.h3`
  position: absolute;
  bottom: 0.38rem;
  right: 0.5rem;
  text-align: right;
  font-family: 'Nanum Brush Script', cursive;
  font-size: 1em;
  mix-blend-mode: luminosity;
  background: ${({ length }) =>
    length < 7
      ? 'radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 70%)'
      : 'radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 100%)'};
`;

export const Img = styled.img`
  width: 100%;
`;

export const BottomPanel = styled.div`
  z-index: -1;
  position: absolute;
  top: 100%;
  width: 100%;
  border-bottom-left-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  background-color: var(--light-black);
  opacity: ${({ isMouseOn }) => (isMouseOn ? 1 : 0)};
  transition: all ${cssTransitionDuration};
`;

export const RoundButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.3em;
  height: 1.3em;
  border: 0.125rem solid var(--gray);
  border-radius: 50%;
  margin: 0.3em;
  background-color: var(--lighter-black);
  color: var(--darkest-white);

  &:hover {
    border-color: var(--darkest-white);
    background-color: var(--lightest-black);
  }

  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;
