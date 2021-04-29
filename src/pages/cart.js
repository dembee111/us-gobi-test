import React from 'react';
import Layout from '../components/layout';
import CartPage from '../customTemplates/CartPage/CartPage';

const Cart = (props) => (
  <Layout location={props.location}>
    <CartPage />
  </Layout>
);

export default Cart;