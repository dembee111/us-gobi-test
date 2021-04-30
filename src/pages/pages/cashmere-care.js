import React from 'react';

import Layout from '../../components/layout';
import CashmereCarePage from '../../customTemplates/CustomPages/CashmereCarePage/CashmereCarePage';

const OuterCashmereCarePage = (props) => (
  <Layout location={props.location}>
    <CashmereCarePage location={props.location} />
  </Layout>
);

export default OuterCashmereCarePage;
