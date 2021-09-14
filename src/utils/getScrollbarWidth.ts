export function getScrollbarWidth(): number {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.visibility = 'hidden';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}
