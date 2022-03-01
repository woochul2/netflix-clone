import styled, { css } from 'styled-components';
import { BREAKPOINTS, SIDE_PADDING, SLIDER_GAP } from '../constants';
import ChevronDownIcon from '../icons/ChevronDownIcon';

/**
 * @param {Object} props
 * @param {'prev'|'next'} props.variant
 * @param {function} props.onClick
 */
function SliderButton({ variant, onClick }) {
  return (
    <SliderButtonBlock
      className={`slider-button ${variant}`}
      onClick={onClick}
      aria-label={variant === 'prev' ? '이전 콘텐츠 보기' : '콘텐츠 더 보기'}
    >
      <ChevronDownIcon />
    </SliderButtonBlock>
  );
}

const hoverSliderButton = css`
  &::after {
    opacity: 0.85;
  }

  svg {
    visibility: visible;
  }
`;

const sliderButtonDirection = (direction) => `
  @media (min-width: ${BREAKPOINTS.xxl}) {
    ${direction}: -${SIDE_PADDING.xxl};
  }

  ${direction}: -4vw;

  @media (max-width: ${BREAKPOINTS.md}) {
    ${direction}: -${SIDE_PADDING.md};
  }
`;

const SliderButtonBlock = styled.button`
  // 컨텐츠보다 위에 보이도록 z-index 설정
  z-index: 1;
  cursor: pointer;
  position: absolute;
  top: 0;
  height: 100%;
  border: 0;
  background: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsl(0, 0%, 20%);
    opacity: 0.7;
  }

  svg {
    z-index: 1;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    color: hsl(0, 0%, 90%);
  }

  &:focus-visible {
    ${hoverSliderButton}
  }

  @media (hover: hover) {
    &:hover {
      ${hoverSliderButton}
    }
  }

  /* 1px은 버튼이 콘텐츠를 완전히 가리지 못할 때가 있어서 더해준 것이다. */
  @media (min-width: ${BREAKPOINTS.xxl}) {
    width: calc(${SIDE_PADDING.xxl} - ${SLIDER_GAP} + 1px);
  }

  width: calc(4vw - ${SLIDER_GAP} + 1px);

  @media (max-width: ${BREAKPOINTS.md}) {
    width: calc(${SIDE_PADDING.md} - ${SLIDER_GAP} + 1px);
  }

  &.prev {
    svg {
      transform: translate(-50%, -50%) rotate(90deg);
    }

    ${sliderButtonDirection('left')}
  }

  &.next {
    svg {
      transform: translate(-50%, -50%) rotate(-90deg);
    }

    ${sliderButtonDirection('right')}
  }
`;

export default SliderButton;
