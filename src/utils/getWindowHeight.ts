export function getWindowHeight(): number {
  const bodyRect = document.body.getBoundingClientRect();
  const zoomRatio = bodyRect.width / window.innerWidth;
  return window.innerHeight * zoomRatio;
}
