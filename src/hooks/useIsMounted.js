import { useCallback, useEffect, useRef } from 'react';

/**
 * 컴포넌트의 마운트 여부를 알려주는 함수를 반환한다.
 */
function useIsMounted() {
  const mountedRef = useRef(false);
  const isMounted = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return isMounted;
}

export default useIsMounted;
