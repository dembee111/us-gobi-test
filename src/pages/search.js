import React from 'react';
import SearchPage from '../customTemplates/SearchPage/SearchPage';
import Layout from '../components/layout';

const SearchOuterPage = (props) => (
  <Layout location={props.location}>
    <SearchPage location={props.location} />
  </Layout>
);

export default SearchOuterPage;
