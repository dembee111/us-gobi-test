import React from 'react';
import HomePage from '../customTemplates/HomePage/HomePage';
import Layout from '../components/layout';

const IndexPage = (props) => (
  <Layout location={props.location}>
    <HomePage />
  </Layout>
);

export default IndexPage;
