import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { getArticle } from '../../components/shared/query/query.js';
import ArticleDetail from './ArticleDetail';
import Layout from '../../components/layout';

const BlogDetailPage = (props) => {
  const [article, setArticle] = useState(null);
  const [getArticleQuery, { data: getArticleData }] = useLazyQuery(getArticle);
  const [notfound, setNotfound] = useState(false);

  useEffect(() => {
    getArticleQuery({
      variables: {
        blogHandle: props.pageContext.blogHandle,
        articleHandle: props.pageContext.articleHandle,
      },
    });

    if (getArticleData) {
      if (getArticleData.blogByHandle && getArticleData.blogByHandle.articleByHandle) {
        setArticle(getArticleData.blogByHandle.articleByHandle);
      } else {
        setNotfound(true);
      }
    }
  }, [getArticleData, getArticleQuery, props.pageContext.articleHandle, props.pageContext.blogHandle]);

  if (notfound) {
    // return <Redirect to="/404" />;
  }

  return (
    <div>
      {article && (
        <ArticleDetail
          article={article}
          handle={props.pageContext.articleHandle}
          blogHandle={props.pageContext.blogHandle}
        />
      )}
    </div>
  );
};

const BlogsDetailPageShell = (props) => (
  <Layout location={props.location}>
    <BlogDetailPage {...props} />
  </Layout>
);

export default BlogsDetailPageShell;
