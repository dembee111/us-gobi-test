import React from 'react';

import Layout from '../../components/layout';
import OurProductionPage from '../../customTemplates/CustomPages/OurProductionPage/OurProductionPage';

const OuterOurProductionPage = (props) => (
  <Layout location={props.location}>
    <OurProductionPage location={props.location} />
  </Layout>
);

export default OuterOurProductionPage;
