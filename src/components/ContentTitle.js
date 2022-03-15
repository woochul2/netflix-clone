import styled from 'styled-components';

/**
 * @param {Object} props
 * @param {string} props.name
 */
function ContentTitle({ name }) {
  return <Title>{name}</Title>;
}

const Title = styled.h3`
  user-select: none;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 0.3em 0.4em;
  text-align: right;
  font-family: 'Nanum Brush Script', cursive;
  font-size: 1em;
  mix-blend-mode: luminosity;
  background: radial-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0) 100%);
`;

export default ContentTitle;
