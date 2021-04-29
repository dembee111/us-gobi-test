import React from 'react';

import Layout from '../../components/layout';
import CashmereIsForEveryonePillarPage from '../../customTemplates/Pillar/CashmereIsForEveryonePillarPage';

const AccountPage = (props) => (
  <Layout location={props.location}>
    <CashmereIsForEveryonePillarPage location={props.location} />
  </Layout>
);

export default AccountPage;
