import React from 'react';

import Layout from '../../components/layout';
import ReturnPolicyPage from '../../customTemplates/CustomPages/PolicyPage/ReturnPolicyPage';

const OuterPrivacyPolicyPage = (props) => (
  <Layout location={props.location}>
    <ReturnPolicyPage location={props.location} />
  </Layout>
);

export default OuterPrivacyPolicyPage;
