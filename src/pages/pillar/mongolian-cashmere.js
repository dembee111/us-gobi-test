import React from 'react';

import Layout from '../../components/layout';
import MongolianCashmerePillarPage from '../../customTemplates/Pillar/MongolianCashmerePillarPage';

const AccountPage = (props) => (
  <Layout location={props.location}>
    <MongolianCashmerePillarPage location={props.location} />
  </Layout>
);

export default AccountPage;
