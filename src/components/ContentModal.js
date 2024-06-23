import FocusTrap from 'focus-trap-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TRANSITION_DURATION, URLS } from '../constants';
import useContentModalStyle from '../hooks/useContentModalStyle';
import { useVideos } from '../hooks/useVideos';
import useWindowHeight from '../hooks/useWindowHeight';
import doOnNextFrame from '../utils/doOnNextFrame';
import setDocumentSubTitle from '../utils/setDocumentSubTitle';
import ContentModalDetail from './ContentModalDetail';
import ContentModalHoverButton from './ContentModalHoverButton';
import ImgOrVideo from './ImgOrVideo';

let closed;

/**
 * @param {Object} props
 * @param {'tv'|'movie'} props.variant
 * @param {Content} props.content
 * @param {function} props.onMouseLeave
 * @param {React.MutableRefObject<HTMLElement>} props.browseRef
 */
function ContentModal({ variant, content, onMouseLeave, browseRef }) {
  const backgroundHeight = useWindowHeight();
  const [isOpen, setIsOpen] = useState(false);
  const styleResult = useContentModalStyle(content, browseRef, isOpen);
  const { contentModalStyle, shrinkModal, openModal, closeModal } = styleResult;
  const [contentModalBottomStyle, setContentModalBottomStyle] = useState(null);
  const { id, name, title } = content.info;
  const videos = useVideos(variant, id);
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();

  useEffect(() => {
    const prevDocumentTitle = document.title;
    if (isOpen) setDocumentSubTitle(name || title);

    return () => {
      document.title = prevDocumentTitle;
    };
  }, [isOpen, name, title]);

  useEffect(() => {
    setContentModalBottomStyle({ opacity: 1 });
  }, []);

  const handleMouseLeaveContentModal = () => {
    if (isOpen) return;

    onMouseLeave();
    shrinkModal();
    setContentModalBottomStyle(null);
    const contentModal = document.querySelector('.content-modal');
    contentModal.classList.add('shrink');
  };

  useEffect(() => {
    if (content.open) {
      content.open = false;
      setIsOpen(true);
      doOnNextFrame(openModal);
    }
  }, [content, openModal]);

  const open = () => {
    setIsOpen(true);
    openModal();
    navigate(`${URLS.home}/${variant}/${id}`, {
      state: { hasPrevHistory: true },
    });
  };

  const close = useCallback(() => {
    onMouseLeave();
    closeModal();
    setContentModalBottomStyle(null);

    closed = true;
    setTimeout(() => {
      closed = false;
    }, parseInt(TRANSITION_DURATION));
  }, [onMouseLeave, closeModal]);

  const closeWithNavigate = useCallback(() => {
    close();
    if (state?.hasPrevHistory) navigate(-1);
    else navigate(`${variant === 'tv' ? '/' : 'movie'}`);
  }, [close, state, navigate, variant]);

  useEffect(() => {
    const contentModalKeydownEvent = (event) => {
      if (event.key === 'Escape') closeWithNavigate();
    };

    window.addEventListener('keydown', contentModalKeydownEvent);

    return () => {
      window.removeEventListener('keydown', contentModalKeydownEvent);
    };
  }, [closeWithNavigate]);

  const handleClickContentModalBackground = (event) => {
    if (event.target.matches('.content-modal-background')) {
      closeWithNavigate();
    }
  };

  const handleClickImg = () => {
    if (!isOpen) open();
    else closeWithNavigate();
  };

  useEffect(() => {
    if (!params.id && !closed && isOpen) close();
  }, [params, close, isOpen]);

  return (
    <FocusTrap focusTrapOptions={{ initialFocus: false }}>
      <ContentModalBackground
        className={'content-modal-background'}
        style={{ height: backgroundHeight }}
        onClick={handleClickContentModalBackground}
      >
        <ContentModalBlock
          className="content-modal"
          onMouseLeave={handleMouseLeaveContentModal}
          style={contentModalStyle}
        >
          <ImgOrVideo
            content={content}
            onClickImg={handleClickImg}
            isOpen={isOpen}
            close={closeWithNavigate}
            width={contentModalStyle?.width}
            videos={videos}
          />
          {isOpen ? (
            <ContentModalDetail
              variant={variant}
              id={id}
              style={contentModalBottomStyle}
              videos={videos}
            />
          ) : (
            <ContentModalHoverButton
              style={contentModalBottomStyle}
              open={open}
            />
          )}
        </ContentModalBlock>
      </ContentModalBackground>
    </FocusTrap>
  );
}

const ContentModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transition: background ${TRANSITION_DURATION};

  &.open {
    // 가장 위에 위치하도록 z-index 설정
    z-index: 3;
    position: fixed;
    width: 100vw;
    overflow: auto;
    background-color: hsla(0, 0%, 0%, 0.7);
  }
`;

const ContentModalBlock = styled.div`
  // 가장 위에 위치하도록 z-index 설정
  z-index: 3;
  position: absolute;
  border-radius: 0.375rem;
  overflow: hidden;
  transform-origin: top;
  transition: transform cubic-bezier(0.5, 0, 0.1, 1) ${TRANSITION_DURATION},
    opacity ${TRANSITION_DURATION};
  box-shadow: 0 0.25rem 0.5rem hsla(0, 0%, 0%, 0.75);

  &.shrink iframe {
    background: none;
  }
`;

export default ContentModal;
