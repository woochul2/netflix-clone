export const changeRemToPx = (remValue: string): number => {
  const html = document.querySelector('html') as HTMLHtmlElement;
  const htmlFontSize = window.getComputedStyle(html).getPropertyValue('font-size');

  return parseFloat(remValue) * parseFloat(htmlFontSize);
};
