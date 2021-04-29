import React from 'react';

import Layout from '../../components/layout';
import SustainabilityPage from '../../customTemplates/CustomPages/SustainabilityPage/SustainabilityPage';

const OuterSustainabilityPage = (props) => (
  <Layout location={props.location}>
    <SustainabilityPage location={props.location} />
  </Layout>
);

export default OuterSustainabilityPage;
