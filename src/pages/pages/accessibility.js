import React from 'react';

import Layout from '../../components/layout';
import Accessibility from '../../customTemplates/CustomPages/Accessibility/Accessibility';

const OuterAccessibility = (props) => (
  <Layout location={props.location}>
    <Accessibility location={props.location} />
  </Layout>
);

export default OuterAccessibility;
