import isMobile from 'ismobilejs';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  BREAKPOINTS,
  SIDE_PADDING,
  SLIDER_GAP,
  TRANSITION_DURATION,
} from '../constants';
import useContentWidth from '../hooks/useContentWidth';
import useWindowHeight from '../hooks/useWindowHeight';
import ContentModal from './ContentModal';
import Header from './Header';
import Notification from './Notification';
import Row from './Row';

let contentTimeoutID;
let leavedContentModal;
let clickedContent;

/**
 * @param {Object} props
 * @param {'tv'|'movie'} props.variant
 * @param {Genre[]} props.genres
 */
function Browse({ variant, genres }) {
  const browseRef = useRef(null);
  const contentsWrapperRef = useRef(null);

  const browseHeight = useWindowHeight();
  const sliderContentCount = useContentWidth(contentsWrapperRef);
  const [currentContent, setCurrentContent] = useState(null);

  const removeCurrentContent = useCallback(() => {
    setCurrentContent(null);
    clickedContent = false;
  }, []);

  // ContentModal의 onMouseLeave가 제대로 동작하지 않을 때가 있어서 사용하는 함수
  const handleMouseOverBrowser = (event) => {
    if (currentContent && !leavedContentModal && !clickedContent) {
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

    setTimeout(() => {
      leavedContentModal = false;
      removeCurrentContent();
    }, parseInt(TRANSITION_DURATION));
  };

  useEffect(() => {
    const removeHoveredModal = () => {
      if (!currentContent) return;

      const isModalOpen = browseRef.current.matches('.open-modal');
      if (!isModalOpen) removeCurrentContent();
    };

    window.addEventListener('resize', removeHoveredModal);

    return () => {
      window.removeEventListener('resize', removeHoveredModal);
    };
  }, [currentContent, removeCurrentContent]);

  const handleClickContent = (event, info, transformOrigin) => {
    clickedContent = true;
    document.activeElement.blur();
    const element = event.target.closest('.content');
    setCurrentContent({ info, element, transformOrigin, clicked: true });
  };

  return (
    <BrowseBlock
      ref={browseRef}
      style={{ height: browseHeight }}
      onMouseOver={handleMouseOverBrowser}
    >
      <Header browseRef={browseRef} />
      <Notification />
      <main>
        {genres.map((genre) => (
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

    @media (max-width: ${BREAKPOINTS.md}) {
      padding: 0 ${SIDE_PADDING.md} 5vw;
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
