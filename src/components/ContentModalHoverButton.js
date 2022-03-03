import styled, { css } from 'styled-components';
import { TRANSITION_DURATION } from '../constants';
import ChevronDownIcon from '../icons/ChevronDownIcon';

/**
 * @param {Object} props
 * @param {React.CSSProperties} props.style
 * @param {function} props.open
 */
function ContentModalHoverButton({ style, open }) {
  return (
    <ContentModalBottomBlock style={style}>
      <DetailButton onClick={open} aria-label="상세 정보 보기">
        <ChevronDownIcon />
      </DetailButton>
    </ContentModalBottomBlock>
  );
}

const ContentModalBottomBlock = styled.div`
  display: flex;
  justify-content: center;
  background-color: hsl(0, 0%, 8%);
  opacity: 0;
  transition: opacity ${TRANSITION_DURATION};
`;

const hoverDetailButton = css`
  border-color: hsl(0, 0%, 90%);
`;

const DetailButton = styled.button`
  cursor: pointer;
  position: relative;
  border: 0.09em solid hsl(0, 0%, 45%);
  border-radius: 100%;
  width: 1.25em;
  height: 1.25em;
  margin: 0.3em;
  background-color: hsl(0, 0%, 8%);
  color: hsl(0, 0%, 90%);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.25em;
  }

  @media (hover: hover) {
    &:hover {
      ${hoverDetailButton}
    }
  }

  &:focus-visible {
    ${hoverDetailButton}
  }
`;

export default ContentModalHoverButton;
