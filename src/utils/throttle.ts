export function throttle(func: any, timeout: number) {
  let lastTime = 0;
  return function (event?: Event) {
    let now = new Date().getTime();
    if (now - lastTime > timeout) {
      func(event);
      lastTime = now;
    }
  };
}
