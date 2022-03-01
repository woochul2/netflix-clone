/**
 * 다음 프레임에 콜백 함수를 실행한다.
 *
 * @param {function} callback
 */
const doOnNextFrame = (callback) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback();
    });
  });
};

export default doOnNextFrame;
