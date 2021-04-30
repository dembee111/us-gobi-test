import React from 'react';

export default (props) => {
  const {
    article: {
      id,
      handle,
      image: { originalSrc: src },
      title,
      blog,
    },
  } = props;

  const imageWidth = window.innerWidth >= 768 ? parseInt(window.innerWidth / 2, 10) : 768;
  const imageSrc = `${src.replace('.jpg', `_${imageWidth}x.jpg`)}`;

  return (
    <div>
      <div className="box">
        <a href={`/blogs/${blog.handle}/${handle}`}>
          <img src={imageSrc} alt={title} />
        </a>

        <div className="detail">
          <span className="cat">{blog.title}</span>
          <h2>{title}</h2>
          <a href={`/us/blogs/${blog.handle}/${handle}`} className="link">
            Read More
            <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.25 8.03758H26.75" stroke="white" />
              <path d="M19.4276 0.71521L26.75 8.03758L19.4276 15.3599" stroke="white" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
