export const changeRemToPx = (remValue: string): number => {
  const html = document.documentElement;
  const htmlPxFontSize = window.getComputedStyle(html).getPropertyValue('font-size');
  return parseFloat(remValue) * parseFloat(htmlPxFontSize);
};
