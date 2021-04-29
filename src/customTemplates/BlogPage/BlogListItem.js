import React from 'react';
import moment from 'moment';

export default (props) => {
  const {
    article: {
      handle,
      image: { originalSrc: src },
      title,
      content,
      blog,
      publishedAt,
    },
  } = props;
  const imageSrc = src.replace('.jpg', '_500x.jpg');
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="img">
          <a href={`/us/blogs/${blog.handle}/${handle}`}>
            <img src={imageSrc} alt={title} />
          </a>
        </div>
        <div className="card-body">
          <div className="cat_date">
            <span className="cat">{blog.title}</span>
            <span className="date">{moment(publishedAt).format('MMM D, YYYY')}</span>
          </div>
          <h2 className="title">{title}</h2>
          <p className="text">{content}</p>
          <a href={`/us/blogs/${blog.handle}/${handle}`} className="link">
            <span>Read More</span>
            <svg width="19" height="10" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.192932 6.39282H19.4549" stroke="black" />
              <path d="M14.1325 1.07043L19.4549 6.39282L14.1325 11.7152" stroke="black" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
