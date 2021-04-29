import React from 'react';
import BlogPage from '../customTemplates/BlogPage/BlogPage';
import Layout from '../components/layout';

const BlogsPage = (props) => (
  <Layout location={props.location}>
    <BlogPage />
  </Layout>
);

export default BlogsPage;
