import { useCallback, useEffect } from 'react';

let timeoutIDs = [];

/**
 * 컴포넌트가 언마운트 되면 clearTimeout을 실행하는 setTimeout 함수를 반환한다.
 */
function useSafeTimeout() {
  useEffect(() => {
    return () => {
      timeoutIDs.forEach((id) => {
        clearTimeout(id);
      });
      timeoutIDs = [];
    };
  }, []);

  /**
   * @param {function} callback
   * @param {number} ms
   */
  const safeTimeout = (callback, ms) => {
    const timeoutID = setTimeout(() => {
      callback();
      timeoutIDs = timeoutIDs.filter((id) => id !== timeoutID);
    }, ms);
    timeoutIDs.push(timeoutID);
  };

  return useCallback(safeTimeout, []);
}

export default useSafeTimeout;
