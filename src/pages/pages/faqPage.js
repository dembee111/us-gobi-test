import React from 'react';

import Layout from '../../components/layout';
import FaqPage from '../../customTemplates/CustomPages/FaqPage/FaqPage';

const OuterFaqPage = (props) => (
  <Layout location={props.location}>
    <FaqPage location={props.location} />
  </Layout>
);

export default OuterFaqPage;
