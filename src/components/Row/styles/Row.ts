import styled from 'styled-components/macro';
import * as BREAKPOINTS from '../../../constants/breakpoints';
import { homeSidePadding } from '../../../pages/Home/styles/Home';
import { contentTransitionDuration } from '../../Content/styles/Content';

const sliderGap = '0.25rem';

export const Container = styled.div`
  margin-bottom: 4rem;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    font-size: 1.25rem;
  }
`;

export const ContentsWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const Slider = styled.div`
  display: flex;
  gap: ${sliderGap};
  transform: translateX(0);
  transition: transform ${`${contentTransitionDuration}ms`};
`;

const SliderControlButton = styled.button`
  cursor: pointer;
  opacity: 0.7;
  // 컨텐츠 썸네일보다 위에 보이도록 z-index 설정
  z-index: 1;
  position: absolute;
  top: 0;
  /* 버튼이 z축 기준으로 밑에 있는 컨텐츠를 완전히 가리지 못하는 미세한 틈이 있어서 1px 더해줌 */
  width: calc(${homeSidePadding.default} - ${sliderGap} + 1px);
  height: 100%;
  border: 0;
  background: var(--gray-700);
  color: var(--gray-100);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.75rem;
    height: 1.75rem;
  }

  &:hover,
  &:focus-visible {
    opacity: 0.9;

    svg {
      width: 2.25rem;
      height: 2.25rem;
    }
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    width: calc(${homeSidePadding.MD} - ${sliderGap} + 1px);
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    width: calc(${homeSidePadding.SM} - ${sliderGap} + 1px);
  }
`;

export const PrevButton = styled(SliderControlButton)`
  left: -${homeSidePadding.default};

  svg {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    left: -${homeSidePadding.MD};
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    left: -${homeSidePadding.SM};
  }
`;

export const NextButton = styled(SliderControlButton)`
  right: -${homeSidePadding.default};

  svg {
    transform: translate(-50%, -50%) rotate(-90deg);
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    right: -${homeSidePadding.MD};
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    right: -${homeSidePadding.SM};
  }
`;
