import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../constants';

/**
 * @param {object} props
 * @param {VideoResult} props.videos
 */
function Videos({ backdrop_path, videos }) {
  const placeholderRef = useRef(null);
  const [videoHeight, setVideoHeight] = useState();

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    setVideoHeight(placeholder.clientHeight);
  }, [placeholderRef]);

  return (
    <>
      {videos.slice(1).length > 0 && (
        <>
          <hr />
          <VideosBox>
            <h2>다른 영상</h2>
            <div>
              <img
                ref={placeholderRef}
                src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                alt=""
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
