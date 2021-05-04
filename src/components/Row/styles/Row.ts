import styled from 'styled-components/macro';
import * as BREAKPOINTS from '../../../constants/breakpoints';
import { homeSidePadding } from '../../../pages/Home/styles/Home';

const sliderGap = '0.25rem';

export const Container = styled.div`
  margin-bottom: 3rem;
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

export const ContentsContainer = styled.div`
  position: relative;
  display: flex;
  /* gap이 스타일에 아무 영향을 주진 않지만, javascript로 gap 값 받아올 때 이미 ContentsContainer를
   * querySelector로 불러온 상황이면, 굳이 Slider를 불러오지 않아도 되게 하려고 값 지정했음 */
  gap: ${sliderGap};

  &:hover {
    // 컨텐츠 위에 마우스 올려서 확대되면, 다른 Row보다 위에 보이도록 하기 위해 z-index 설정
    z-index: 1;
  }
`;

export const Slider = styled.div`
  display: flex;
  gap: ${sliderGap};
  transform: translateX(0);
  transition: transform 0.4s;
`;

const SliderControlButton = styled.button`
  cursor: pointer;
  opacity: 0.7;
  position: absolute;
  top: 0;
  /* 버튼이 밑에 겹쳐진 컨텐츠를 완전히 가리지 못하는 미세한 틈이 있어서 1px 더해줌 */
  width: calc(${homeSidePadding} - ${sliderGap} + 1px);
  height: 100%;
  outline: 0;
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

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--white);
  }

  &:hover,
  &:focus-visible {
    opacity: 0.9;

    svg {
      width: 2.25rem;
      height: 2.25rem;
    }
  }
`;

export const PrevButton = styled(SliderControlButton)`
  left: -${homeSidePadding};

  svg {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;

export const NextButton = styled(SliderControlButton)`
  right: -${homeSidePadding};

  svg {
    transform: translate(-50%, -50%) rotate(-90deg);
  }
`;
