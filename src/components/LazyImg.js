import { useEffect, useRef } from 'react';
import placeholder from '../assets/placeholder.png';

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
          imageObserver.unobserve(image);

          image.addEventListener('load', () => {
            const content = image.closest('.content');
            const contentTitle = content.querySelector('.content-title');
            contentTitle.style.visibility = '';
          });
        }
      });
    });

    imageObserver.observe(imgRef.current);
  };

  useEffect(lazyLoad, [imgRef]);

  return (
    <img
      ref={imgRef}
      data-src={src}
      src={placeholder}
      alt={alt}
      onLoad={onLoad}
    />
  );
}

export default LazyImg;
