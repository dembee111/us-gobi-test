import React, { useEffect, useState } from 'react';
import './WishlistPage.scss';
import { connect } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { getProducts } from '../../components/shared/query/query';
import Product from './Product';
import { getProductGender } from '../ProductPage/ProductHelpers';

const Wishlist = (props) => {
  const [getProductsQuery, { data: getProductsData, error: getProductsError }] = useLazyQuery(getProducts, {
    errorPolicy: 'all',
  });

  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (props.myWishlist && Array.isArray(props.myWishlist)) {
      const productIds = props.myWishlist.map((product) => btoa(`gid://shopify/Product/${product}`));
      getProductsQuery({
        variables: {
          productIds,
          currencyCode: props.currency.currencyCode,
        },
      });
    }
  }, [props.myWishlist]);

  useEffect(() => {
    if (getProductsData) {
      let products = [];
      for (const node of getProductsData.nodes) {
        if (node && node.id) {
          let gender = null;
          if (node.tags) {
            node.tags.map((tag) => {
              tag = getProductGender(tag);

              if (tag) {
                gender = tag;
              }
            });
          }

          products.push(<Product wishlistItem={node} gender={gender} />);
        }
      }
      setWishlistProducts(products);
    }
  }, [getProductsData, getProductsError]);

  return (
    <div className="wishlist-page">
      <div className="tc-container">
        <div className="wishlist-header">
          <div className="l-sec">
            <h1>Wishlist</h1>
          </div>
        </div>
        <div className="product-section">
          {!wishlistProducts || wishlistProducts === {} ? null : wishlistProducts.length === 0 ? (
            <div className="empty">
              <p className="main-text" data-open-accessibility-text-original="16px">
                Your wishlist is currently empty.
              </p>
              <a className="continue-shopping-link" href="/collections/all">
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="product-grid">{wishlistProducts}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  myWishlist: state.myWishlist,
  currency: state.currency,
  customer: state.customer,
});

export default connect(mapStateToProps)(Wishlist);