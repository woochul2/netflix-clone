import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.2rem;
`;

export const Title = styled.h3.attrs((props) => ({
  style: { fontSize: props.fontSize },
}))`
  position: absolute;
  bottom: 0.38rem;
  right: 0.5rem;
  text-align: right;
  font-family: 'Nanum Brush Script', cursive;
  mix-blend-mode: luminosity;
  background: ${({ length }) =>
    length < 7
      ? 'radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 70%)'
      : 'radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 100%)'};
`;

export const Img = styled.img`
  width: 100%;
`;
