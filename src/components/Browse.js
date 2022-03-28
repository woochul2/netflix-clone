import isMobile from 'ismobilejs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getContentDetail } from '../api';
import {
  BREAKPOINTS,
  SIDE_PADDING,
  SLIDER_GAP,
  TRANSITION_DURATION,
} from '../constants';
import useContentWidth from '../hooks/useContentWidth';
import useIsMounted from '../hooks/useIsMounted';
import useSafeTimeout from '../hooks/useSafeTimeout';
import useWindowHeight from '../hooks/useWindowHeight';
import setDocumentSubTitle from '../utils/setDocumentSubTitle';
import ContentModal from './ContentModal';
import Header from './Header';
import Notification from './Notification';
import Row from './Row';

let contentTimeoutID;
let leavedContentModal;
let hasClickedContent;

/**
 * @param {Object} props
 * @param {'tv'|'movie'} props.variant
 * @param {Genre[]} props.genres
 */
function Browse({ variant, genres }) {
  const browseRef = useRef(null);
  const contentsWrapperRef = useRef(null);
  const browseHeight = useWindowHeight();
  const [currentContent, setCurrentContent] = useState(null);
  const { id } = useParams();
  const [initialID, setInitialID] = useState(() => id);
  const sliderContentCount = useContentWidth(initialID, contentsWrapperRef);
  const navigate = useNavigate();
  const safeTimeout = useSafeTimeout();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (variant === 'tv') setDocumentSubTitle('시리즈');
    else if (variant === 'movie') setDocumentSubTitle('영화');
  }, [variant]);

  const setContentFromParam = useCallback(() => {
    getContentDetail(variant, id)
      .then((info) => {
        if (!isMounted()) return;

        const { networks } = info;
        if (networks && !networks.find(({ id }) => id === 213)) {
          throw new Error('넷플릭스에 있는 시리즈가 아닙니다.');
        }
        setCurrentContent({ info, open: true });
      })
      .catch(() => {
        navigate('/', { replace: true });
      })
      .finally(() => {
        if (isMounted()) setInitialID(null);
      });
  }, [variant, id, navigate, isMounted]);

  useEffect(() => {
    if (initialID) setContentFromParam();
  }, [initialID, setContentFromParam]);

  useEffect(() => {
    if (id && !currentContent) setContentFromParam();
  }, [id, currentContent, setContentFromParam]);

  const removeCurrentContent = useCallback(() => {
    setCurrentContent(null);
    hasClickedContent = false;
  }, []);

  // ContentModal의 onMouseLeave가 제대로 동작하지 않을 때가 있어서 사용하는 함수
  const handleMouseOverBrowser = (event) => {
    if (currentContent && !leavedContentModal && !hasClickedContent) {
      const isModalOpen = browseRef.current.matches('.open-modal');
      if (isModalOpen) return;

      const contentModal = event.target.closest('.content-modal');
      if (!contentModal) removeCurrentContent();
    }
  };

  const handleMouseEnterContent = (event, info, transformOrigin) => {
    if (isMobile().any) return;

    contentTimeoutID = setTimeout(() => {
      document.activeElement.blur();
      const element = event.target.closest('.content');
      element.classList.add('hidden');
      setCurrentContent({ info, element, transformOrigin });
    }, parseInt(TRANSITION_DURATION));
  };

  const handleMouseLeaveContent = () => {
    clearTimeout(contentTimeoutID);
  };

  const handleMouseLeaveContentModal = () => {
    leavedContentModal = true;
    safeTimeout(() => {
      leavedContentModal = false;
      removeCurrentContent();
    }, parseInt(TRANSITION_DURATION));
  };

  const removeHoveredModal = useCallback(() => {
    if (!currentContent) return;

    const isModalOpen = browseRef.current.matches('.open-modal');
    if (!isModalOpen) removeCurrentContent();
  }, [currentContent, removeCurrentContent]);

  useEffect(() => {
    window.addEventListener('resize', removeHoveredModal);

    return () => {
      window.removeEventListener('resize', removeHoveredModal);
    };
  }, [removeHoveredModal]);

  useEffect(() => {
    window.addEventListener('popstate', removeHoveredModal);

    return () => {
      window.removeEventListener('popstate', removeHoveredModal);
    };
  }, [removeHoveredModal]);

  const handleClickContent = (event, info, transformOrigin) => {
    hasClickedContent = true;
    document.activeElement.blur();
    const element = event.target.closest('.content');
    setCurrentContent({ info, element, transformOrigin, open: true });
  };

  return (
    <BrowseBlock
      ref={browseRef}
      style={{ height: browseHeight }}
      onMouseOver={handleMouseOverBrowser}
    >
      <Header
        scrollToTop={() => {
          browseRef.current.scrollTop = 0;
        }}
      />
      <Notification />
      <main className={isMobile().any ? 'mobile' : ''}>
        {!initialID &&
          genres.map((genre) => (
            <Row
              key={genre.id}
              variant={variant}
              genre={genre}
              sliderContentCount={sliderContentCount}
              onMouseEnterContent={handleMouseEnterContent}
              onClickContent={handleClickContent}
              contentsWrapperRef={contentsWrapperRef}
              onMouseLeaveContent={handleMouseLeaveContent}
            />
          ))}
        {currentContent && (
          <ContentModal
            variant={variant}
            content={currentContent}
            onMouseLeave={handleMouseLeaveContentModal}
            browseRef={browseRef}
          />
        )}
      </main>
    </BrowseBlock>
  );
}

const BrowseBlock = styled.div`
  position: relative;
  min-width: 18.75rem;
  overflow-x: hidden;
  background-color: hsl(0, 0%, 8%);
  color: hsl(0, 0%, 90%);

  main {
    @media (min-width: ${BREAKPOINTS.xxl}) {
      padding: 0 ${SIDE_PADDING.xxl} 5vw;
    }

    padding: 0 4vw 5vw;

    &:not(.mobile) {
      @media (max-width: ${BREAKPOINTS.md}) {
        padding: 0 ${SIDE_PADDING.md} 5vw;
      }
    }
  }

  &.open-modal {
    overflow: hidden;

    .slider-button {
      width: calc(100% - ${SLIDER_GAP} + 1px);

      &.prev {
        left: -100%;
      }

      &.next {
        right: -100%;
      }
    }
  }
`;

export default Browse;
