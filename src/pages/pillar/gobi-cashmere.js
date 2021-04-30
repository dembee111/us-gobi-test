import React from 'react';

import Layout from '../../components/layout';
import GobiCashmerePillarPage from '../../customTemplates/Pillar/GobiCashmerePillarPage';

const AccountPage = (props) => (
  <Layout location={props.location}>
    <GobiCashmerePillarPage location={props.location} />
  </Layout>
);

export default AccountPage;
