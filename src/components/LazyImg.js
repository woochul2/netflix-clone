import { useEffect, useRef } from 'react';
import styled from 'styled-components';

/**
 * @param {Object} props
 * @param {string} props.src
 * @param {string} props.alt
 * @param {function} props.onLoad
 */
function LazyImg({ src, alt, onLoad }) {
  const imgRef = useRef(null);

  const lazyLoad = () => {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove('hidden');
          imageObserver.unobserve(image);
        }
      });
    });

    imageObserver.observe(imgRef.current);
  };

  useEffect(lazyLoad, [imgRef]);

  return (
    <Img
      ref={imgRef}
      className="hidden"
      data-src={src}
      alt={alt}
      onLoad={onLoad}
    />
  );
}

const Img = styled.img`
  &.hidden {
    width: 1px;
    height: 1px;
    visibility: hidden;
  }
`;

export default LazyImg;
