import React from 'react';
import PrivateStylingPage from '../customTemplates/CustomPages/PrivateStylingPage/PrivateStylingPage';
import Layout from '../components/layout';

const PrivatePage = (props) => (
  <Layout location={props.location}>
    <PrivateStylingPage />
  </Layout>
);

export default PrivatePage;
