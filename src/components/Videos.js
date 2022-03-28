import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import placeholder from '../assets/placeholder.png';
import { BREAKPOINTS } from '../constants';

/**
 * @param {object} props
 * @param {VideoResult} props.videos
 */
function Videos({ videos }) {
  const imgRef = useRef(null);
  const [videoHeight, setVideoHeight] = useState();

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new ResizeObserver(() => {
      setVideoHeight(img.clientHeight);
    });

    observer.observe(img);

    return () => {
      observer.unobserve(img);
    };
  }, [imgRef]);

  return (
    <>
      {videos.slice(1).length > 0 && (
        <>
          <hr />
          <VideosBox data-testid="videos">
            <h2>다른 영상</h2>
            <div>
              <img
                ref={imgRef}
                src={placeholder}
                alt=""
                onLoad={(event) => {
                  setVideoHeight(event.target.clientHeight);
                }}
              />
              {videos.slice(1).map(({ name, key }) => {
                return (
                  <iframe
                    key={key}
                    title={name}
                    height={videoHeight}
                    src={`https://www.youtube.com/embed/${key}`}
                  ></iframe>
                );
              })}
            </div>
          </VideosBox>
        </>
      )}
    </>
  );
}

const VideosBox = styled.div`
  position: relative;

  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;

    @media (max-width: ${BREAKPOINTS.md}) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (max-width: ${BREAKPOINTS.sm}) {
      gap: 0.5rem;
    }
  }

  img {
    visibility: hidden;
    position: absolute;
    width: calc(50% - 0.5rem);

    @media (max-width: ${BREAKPOINTS.md}) {
      width: 100%;
    }
  }

  iframe {
    border-radius: 0.25rem;
  }
`;

export default Videos;
