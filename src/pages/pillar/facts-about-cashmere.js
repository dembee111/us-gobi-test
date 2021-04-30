import React from 'react';

import Layout from '../../components/layout';
import FactsAboutCashmerePillarPage from '../../customTemplates/Pillar/FactsAboutCashmerePillarPage';

const AccountPage = (props) => (
  <Layout location={props.location}>
    <FactsAboutCashmerePillarPage location={props.location} />
  </Layout>
);

export default AccountPage;
