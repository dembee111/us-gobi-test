import React from 'react';

import Layout from '../../components/layout';
import TermsOfServicePage from '../../customTemplates/CustomPages/PolicyPage/TermsOfServicePage';

const OuterTermsOfServicePage = (props) => (
  <Layout location={props.location}>
    <TermsOfServicePage location={props.location} />
  </Layout>
);

export default OuterTermsOfServicePage;
