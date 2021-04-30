import React from 'react';

import Layout from '../../components/layout';
import CashmereCarePillarPage from '../../customTemplates/Pillar/CashmereCarePillarPage';

const CashmereCarePage = (props) => (
  <Layout location={props.location}>
    <CashmereCarePillarPage location={props.location} />
  </Layout>
);

export default CashmereCarePage;
