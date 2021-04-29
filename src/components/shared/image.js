import React from 'react';
import LazyLoad from 'react-lazyload';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

export default function Image(props) {
  return (
    <LazyLoad>
      <img
        srcSet={
          `${props.src.replace('.jpg', '_100x.jpg')} 100w,` +
          `${props.src.replace('.jpg', '_200x.jpg')} 200w,` +
          `${props.src.replace('.jpg', '_400x.jpg')} 400w,` +
          `${props.src.replace('.jpg', '_800x.jpg')} 800w,` +
          `${props.src.replace('.jpg', '_1600x.jpg')} 1600w,`
        }
        alt={props.altText}
      />
    </LazyLoad>
  );
}

export const renderLazyImage = (alt, min_src, max_src) => {
  if (alt && min_src && max_src) {
    return <img alt={alt} data-sizes="auto" src={min_src} data-src={max_src} className="lazyload blur-up" />;
  } else {
    return null;
  }
};
