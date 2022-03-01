import { useEffect, useState } from 'react';
import doOnNextFrame from '../utils/doOnNextFrame';

/**
 * (모바일 기준) 주소창을 제외한 화면 높이를 반환한다.
 */
function useWindowHeight() {
  const [height, setHeight] = useState(null);

  useEffect(() => {
    // 모바일에서 화면을 확대한 뒤 window.innerHeight 값을 구하면,
    // 전체 높이가 아닌 줄어든 값을 가져오기 때문에 다음과 같이 계산한다.
    const setWindowHeight = () => {
      const rootWidth = document.documentElement.clientWidth;
      const zoomRatio = rootWidth / window.innerWidth;
      setHeight(`${window.innerHeight * zoomRatio}px`);
    };

    // 모바일에서 orientation이 바뀌었을 때, resize 이벤트만으로 window의 높이를
    // 구하면, 변하기 이전 값을 가져올 때가 있어 다음 이벤트도 등록한다.
    const orientationchangeEvent = () => {
      doOnNextFrame(setWindowHeight);
    };

    setWindowHeight();
    window.addEventListener('resize', setWindowHeight);
    window.addEventListener('orientationchange', orientationchangeEvent);

    return () => {
      window.removeEventListener('resize', setWindowHeight);
      window.removeEventListener('orientationchange', orientationchangeEvent);
    };
  }, []);

  return height;
}

export default useWindowHeight;
