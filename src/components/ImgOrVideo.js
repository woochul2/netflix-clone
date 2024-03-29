import isMobile from 'ismobilejs';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TRANSITION_DURATION } from '../constants';
import CloseIcon from '../icons/CloseIcon';
import ContentTitle from './ContentTitle';

/**
 * @param {Object} props
 * @param {Content} props.content
 * @param {function} props.onClickImg
 * @param {boolean} props.isOpen
 * @param {function} props.close
 * @param {string} props.width
 * @param {VideoResult} props.videos
 */
function ImgOrVideo({ content, onClickImg, isOpen, close, width, videos }) {
  const imgRef = useRef(null);
  const { name, title, backdrop_path } = content.info;
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setVideo(videos[0]);
    }, parseInt(TRANSITION_DURATION));

    return () => {
      clearTimeout(timeoutID);
    };
  }, [videos]);

  useEffect(() => {
    const setOriginalImg = () => {
      imgRef.current.src = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    };
    if (!video) setOriginalImg();
  }, [video, imgRef, backdrop_path]);

  const getHeight = () => `${(parseFloat(width) * 9) / 16}px`;

  return (
    <ImgOrVideoBlock>
      {video ? (
        <iframe
          title={video.name}
          height={getHeight()}
          src={`https://www.youtube.com/embed/${video.key}?autoplay=1${
            isMobile().any ? '' : '&mute=1'
          }`}
        ></iframe>
      ) : (
        <ImgContainer onClick={onClickImg}>
          <img
            ref={imgRef}
            height={getHeight()}
            src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            alt={`${name || title}`}
          />
          <ContentTitle name={name || title} />
        </ImgContainer>
      )}
      {isOpen && (
        <CloseButton aria-label="닫기" onClick={close}>
          <CloseIcon />
        </CloseButton>
      )}
    </ImgOrVideoBlock>
  );
}

const ImgOrVideoBlock = styled.div`
  iframe {
    background: hsl(0, 0%, 0%);
  }
`;

const ImgContainer = styled.div`
  cursor: pointer;
  position: relative;
  /* ImgContainer와 ConteontModalBottom 사이의 틈을 없애는 용도 */
  margin-bottom: -1px;
`;

const CloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  width: 2.25rem;
  height: 2.25rem;
  border: 0;
  border-radius: 100%;
  transform: translate(-30%, 30%);
  background-color: hsl(0, 0%, 8%);
  color: hsl(0, 0%, 100%);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 70%;
    transform: translate(-50%, -50%);
  }
`;

export default ImgOrVideo;
