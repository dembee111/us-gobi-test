import React from 'react';

import Layout from '../../components/layout';
import GiftPolicyPage from '../../customTemplates/CustomPages/PolicyPage/GiftPolicyPage';

const OuterGiftPolicyPage = (props) => (
  <Layout location={props.location}>
    <GiftPolicyPage location={props.location} />
  </Layout>
);

export default OuterGiftPolicyPage;
