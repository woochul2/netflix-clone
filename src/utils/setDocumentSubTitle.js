/**
 * Document의 부제목을 설정한다.
 *
 * @param {string} subTitle
 */
const setDocumentSubTitle = (subTitle) => {
  document.title = '';
  document.title = `${subTitle} - 넷플릭스 클론`;
};

export default setDocumentSubTitle;
