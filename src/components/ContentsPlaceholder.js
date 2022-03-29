import styled from 'styled-components';
import { SLIDER_GAP } from '../constants';

function ContentsPlaceholder() {
  return (
    <ContentsPlaceholderBox>
      {Array(7)
        .fill()
        .map((_, index) => (
          <span key={index}></span>
        ))}
    </ContentsPlaceholderBox>
  );
}

const ContentsPlaceholderBox = styled.div`
  display: flex;
  gap: ${SLIDER_GAP};

  span {
    z-index: 1;
    width: var(--content-width);
    height: calc(var(--content-width) * 9 / 16);
    background-color: #222;
    border-radius: 0.2vw;
  }
`;

export default ContentsPlaceholder;
