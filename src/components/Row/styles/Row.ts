import styled from 'styled-components/macro';
import { BREAKPOINTS } from '../../../constants';
import { homeSidePadding } from '../../Browse/styles/Browse';
import { contentTransitionDuration } from '../../Content/styles/Content';

export const sliderGap = '0.25rem';

export const Container = styled.div`
  margin-bottom: 5rem;
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
  // 평소에 모달 배경보다 위에 보이도록 z-index 설정
  z-index: 1;
  display: flex;
  gap: ${sliderGap};
  transform: translateX(0);
  transition: transform ${`${contentTransitionDuration}ms`};
`;

const SliderControlButton = styled.button`
  cursor: pointer;
  opacity: 0.7;
  // 컨텐츠 썸네일보다 위에 보이도록 z-index 설정
  z-index: 2;
  position: absolute;
  top: 0;
  width: calc(${homeSidePadding.XL} - ${sliderGap});
  height: 100%;
  font-size: 1rem;
  border: 0;
  background: var(--gray-700);
  color: var(--gray-100);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.25em;
    height: 2.25em;
  }

  &:focus-visible {
    opacity: 0.9;

    svg {
      width: 3em;
      height: 3em;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.9;

      svg {
        width: 3em;
        height: 3em;
      }
    }
  }

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 0.875rem;
    width: calc(${homeSidePadding.LG} - ${sliderGap});
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    font-size: 0.75rem;
    width: calc(${homeSidePadding.MD} - ${sliderGap});
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 0.5rem;
    width: calc(${homeSidePadding.SM} - ${sliderGap});
  }
`;

export const PrevButton = styled(SliderControlButton)`
  left: -${homeSidePadding.XL};

  svg {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  @media (max-width: ${BREAKPOINTS.LG}) {
    left: -${homeSidePadding.LG};
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    left: -${homeSidePadding.MD};
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    left: -${homeSidePadding.SM};
  }
`;

export const NextButton = styled(SliderControlButton)`
  right: -${homeSidePadding.XL};

  svg {
    transform: translate(-50%, -50%) rotate(-90deg);
  }

  @media (max-width: ${BREAKPOINTS.LG}) {
    right: -${homeSidePadding.LG};
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    right: -${homeSidePadding.MD};
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    right: -${homeSidePadding.SM};
  }
`;
