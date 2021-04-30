export const setContentFontSize = () => {
  const contentImgContainer = document.querySelector('.content-img-container') as HTMLElement;
  // 컨텐츠 제목 크기가 이미지 너비의 1/10로 했을 때가 가장 적절함
  const fontSize = `${contentImgContainer.offsetWidth / 10}px`;
  document.documentElement.style.setProperty('--content-font-size', fontSize);
};
