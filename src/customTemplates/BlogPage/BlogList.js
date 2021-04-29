import React from 'react';
import BlogListItem from './BlogListItem';

export default (props) => {
  const { articles } = props;

  return (
    <div className="row">
      {articles && articles.map((article) => <BlogListItem key={article.handle} article={article} />)}
    </div>
  );
};
