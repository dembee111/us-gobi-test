import React from 'react';

import Layout from '../../components/layout';
import ShippingPolicyPage from '../../customTemplates/CustomPages/PolicyPage/ShippingPolicyPage';

const OuterShippingPolicyPage = (props) => (
  <Layout location={props.location}>
    <ShippingPolicyPage location={props.location} />
  </Layout>
);

export default OuterShippingPolicyPage;
