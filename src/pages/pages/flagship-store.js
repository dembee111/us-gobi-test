import React from 'react';

import Layout from '../../components/layout';
import StoreLocationPage from '../../customTemplates/CustomPages/StoreLocationPage/StoreLocationPage';

const OuterStoreLocationPage = (props) => (
  <Layout location={props.location}>
    <StoreLocationPage location={props.location} />
  </Layout>
);

export default OuterStoreLocationPage;
