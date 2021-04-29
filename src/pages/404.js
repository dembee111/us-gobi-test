import React from 'react';

import Layout from '../components/layout';
import Main404Page from '../customTemplates/Main404Page/Main404Page';

const NotFoundPage = (props) => (
  <Layout location={props.location}>
    <Main404Page />
  </Layout>
);

export default NotFoundPage;
