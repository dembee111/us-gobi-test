import React from 'react';

import Layout from '../../components/layout';
import PrivacyPolicyPage from '../../customTemplates/CustomPages/PolicyPage/PrivacyPolicyPage';

const OuterPrivacyPolicyPage = (props) => (
  <Layout location={props.location}>
    <PrivacyPolicyPage location={props.location} />
  </Layout>
);

export default OuterPrivacyPolicyPage;
