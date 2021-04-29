import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { useLazyQuery } from '@apollo/client';
import { getBundleCollection } from '../../../components/shared/query/query';
import { connect } from 'react-redux';
import BundleProduct from './BundleProduct';
import { bundlesList } from './bundleData';
import { addBundleToCart } from '../../../components/shared/cart/CartHelpers';
import { getMultiplier } from './BundleHelpers';

function Bundle(props) {
  const [getBundleCollectionQuery, { data: getBundleCollectionData, error: getBundleCollectionError }] = useLazyQuery(
    getBundleCollection,
    {
      errorPolicy: 'all',
    },
  );
  const [bundleCollection, setBundleCollection] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [countRemaining, setCountRemaining] = useState();
  const [bundlePrice, setBundlePrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [hideFooter, setHideFooter] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  function addToSet(index, bundleProduct) {
    if (selectedProducts) {
      let newSelectedProducts = [...selectedProducts];
      newSelectedProducts[index] = bundleProduct;
      setSelectedProducts(newSelectedProducts);
    }
  }

  function removeFromSet(index) {
    if (selectedProducts) {
      let newSelectedProducts = [...selectedProducts];
      newSelectedProducts[index] = null;
      setSelectedProducts(newSelectedProducts);
    }
  }

  function toggleFooter() {
    setHideFooter(!hideFooter);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (props.currency && props.currency.currencyCode && props.pageContext && props.pageContext.handle) {
      for (let bundle of bundlesList) {
        if (bundle.handle === props.pageContext.handle) {
          setBundlePrice(bundle.price);
          setSalePrice(bundle.salePrice);
        }
      }
      getBundleCollectionQuery({
        variables: {
          handle: props.pageContext.handle,
          currencyCode: props.currency.currencyCode,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (getBundleCollectionError) {
      console.log('getBundleCollectionError', getBundleCollectionError);
    } else if (getBundleCollectionData) {
      if (getBundleCollectionData.collectionByHandle) {
        let collection = {
          ...getBundleCollectionData.collectionByHandle,
          products: {
            edges: [],
          },
        };
        if (
          getBundleCollectionData.collectionByHandle.products &&
          getBundleCollectionData.collectionByHandle.products.edges
        ) {
          collection.products.edges = [];
          let bundleProductsLength = 0;
          for (let bundleProduct of getBundleCollectionData.collectionByHandle.products.edges) {
            let multiplier = 1;
            if (bundleProduct && bundleProduct.node && bundleProduct.node.tags) {
              multiplier = getMultiplier(bundleProduct.node.tags);
              bundleProductsLength += multiplier;
            }
            for (let i of Array(multiplier)) {
              collection.products.edges.push(bundleProduct);
            }
          }
          setSelectedProducts(new Array(bundleProductsLength).fill(null));
        }
        setBundleCollection(collection);
      }
    }
  }, [getBundleCollectionData, getBundleCollectionError]);

  useEffect(() => {
    if (selectedProducts) {
      let count = 0;
      let totalP = 0;
      for (let selectedProduct of selectedProducts) {
        if (!selectedProduct) {
          count++;
        } else {
          if (
            selectedProduct.variant &&
            selectedProduct.variant.presentmentPrices &&
            selectedProduct.variant.presentmentPrices.edges &&
            selectedProduct.variant.presentmentPrices.edges[0] &&
            selectedProduct.variant.presentmentPrices.edges[0].node &&
            selectedProduct.variant.presentmentPrices.edges[0].node.price
          ) {
            totalP += Number(selectedProduct.variant.presentmentPrices.edges[0].node.price.amount);
          }
        }
      }
      setTotalPrice(totalP);
      setCountRemaining(count);
    }
  }, [selectedProducts]);

  if (props.pageContext && props.pageContext.handle && bundleCollection) {
    return (
      <section className="bundle-page">
        <div className="tc-container-full">
          <div className="bundle-product">
            <div className="product-row">
              <div className="tc-col-8"></div>
              <div className="tc-col-4">
                <div className="bundle-product-title">
                  <h1>{bundleCollection.title}</h1>
                </div>
              </div>
            </div>
            {bundleCollection.products &&
              bundleCollection.products.edges &&
              bundleCollection.products.edges.map((product, index) => {
                if (product && product.node) {
                  return (
                    <BundleProduct
                      key={index}
                      product={product.node}
                      index={index}
                      addToSet={addToSet}
                      removeFromSet={removeFromSet}
                      selectedProduct={selectedProducts[index]}
                    />
                  );
                } else return null;
              })}
          </div>
        </div>
        <div className="bundle-product-footer">
          <div className="footer-top-line">
            <div className="footer-top-line-btn" onClick={toggleFooter}>
              <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 4C0 1.79086 1.79086 0 4 0H32C34.2091 0 36 1.79086 36 4V24H0V4Z" fill="#4F5255" />
                <path d="M12 9L18 15L24 9" stroke="white" />
              </svg>
            </div>
          </div>

          {!hideFooter ? (
            <div className="product-row">
              <div className="f-title">
                <p>Add {countRemaining} to Unlock Offer</p>
              </div>

              <div className="save-product">
                <div className="save-product-list">
                  {selectedProducts &&
                    selectedProducts.map((selectedProduct, index) => {
                      return (
                        <div key={index} className="save-product-item">
                          <div className="save-num">{index + 1}</div>
                          <div className="img-box">
                            {selectedProduct &&
                            selectedProduct.variant &&
                            selectedProduct.variant.image &&
                            selectedProduct.variant.image.src ? (
                              <div onClick={() => removeFromSet(index)}>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="12" cy="12" r="12" fill="#212121" />
                                  <path d="M18 6L6 18" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M6 6L18 18" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <img
                                  src={selectedProduct.variant.image.src}
                                  alt={selectedProduct.variant.image.altText}
                                ></img>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="f-p-btn">
                <div className="p-btn">
                  <button
                    aria-label="Add All to Cart"
                    className="addToSetBtn"
                    onClick={() => {
                      addBundleToCart(selectedProducts);
                    }}
                  >
                    <p>Add All to Cart</p> |
                    {!countRemaining && bundlePrice ? (
                      <div className="btn-price">
                        <p>
                          {props.currency && props.currency.currencySymbol} {bundlePrice.split('.')[0]}{' '}
                          <span>.{bundlePrice.split('.')[1]}</span>{' '}
                        </p>
                      </div>
                    ) : (
                      <div className="btn-price">
                        <p>
                          {props.currency && props.currency.currencySymbol} {totalPrice.toFixed(2).split('.')[0]}{' '}
                          <span>.{totalPrice.toFixed(2).split('.')[1]}</span>{' '}
                        </p>
                      </div>
                    )}
                  </button>
                  {!countRemaining ? (
                    <div className="p-btn-sale-item">
                      <div className="btn-sale-price-desc">
                        <p>{`You're saving`}</p>
                      </div>
                      <div className="btn-sale-spice"> | </div>
                      {salePrice ? (
                        <div className="btn-sale-price">
                          <p>
                            {props.currency && props.currency.currencySymbol} {salePrice.split('.')[0]}{' '}
                            <span>.{salePrice.split('.')[1]}</span>{' '}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  } else return null;
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

Bundle = connect(mapStateToProps)(Bundle);

export default (props) => (
  <Layout>
    <Bundle {...props} />
  </Layout>
);
