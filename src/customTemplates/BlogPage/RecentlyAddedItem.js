import React from 'react';
import moment from 'moment';

export default ({ article }) => {
  if (!article) return null;
  const { blog, title, publishedAt, image, handle } = article;
  return (
    <div className="col-md-6">
      <div className="box">
        <div className="img">
          <a href={`/us/blogs/${blog.handle}/${handle}`}>{image && <img src={image.originalSrc} alt="" />}</a>
        </div>
        <div className="box_body">
          <div className="cat_date">
            <span className="cat">{blog.title}</span>
            <span className="date">{moment(publishedAt).format('MMM D, YYYY')}</span>
          </div>
          <span className="tt">
            <a href={`/us/blogs/${blog.handle}/${handle}`}>{title}</a>
          </span>
        </div>
      </div>
    </div>
  );
};
