import React from 'react';

import Layout from '../../components/layout';
import OurHistoryPage from '../../customTemplates/CustomPages/OurHistoryPage/OurHistoryPage';

const OuterOurHistoryPage = (props) => (
  <Layout location={props.location}>
    <OurHistoryPage location={props.location} />
  </Layout>
);

export default OuterOurHistoryPage;
