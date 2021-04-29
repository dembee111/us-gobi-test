import React from 'react';
import ProductPage from '../customTemplates/ProductPage/ProductPage';

const TestPage = (props) => (
  <div>
    <ProductPage
      location={props.location}
      pageContext={{
        handle: '',
      }}
    />
  </div>
);

export default TestPage;
