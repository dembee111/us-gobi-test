import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { connect } from 'react-redux';
import { Link } from 'gatsby';
import { getProducts } from '../query/query.js';
import { giftsDefault, formatPrice } from './CartHelpers';
import InnerContent from './InnerContent';
import Image from '../image';
import 'react-step-progress-bar/styles.css';
import 'swiper/swiper.scss';
import './cart.scss';

const Cart = (props) => {
  const [giftOptions, setGiftOptions] = useState();

  const [getGiftProductsQuery, { data: getGiftProductsData, error: getGiftProductsError }] = useLazyQuery(getProducts, {
    errorPolicy: 'all',
  });

  const [prices, setPrices] = useState();

  const [gifts, setGifts] = useState(giftsDefault);

  const [giftCollected, setGiftCollected] = useState('None');

  const [nextGift, setNextGift] = useState('None');

  useEffect(() => {
    // get gift items
    if (!giftOptions || giftOptions.length === 0) {
      getGiftProductsQuery({
        variables: {
          productIds: getGifts().map((product) => btoa(`gid://shopify/Product/${product}`)),
          currencyCode: props.currency.currencyCode,
        },
      });
    }
    if (props.checkout && props.checkout.id && props.getCheckoutQuery) {
      // get checkout from id
      let currencyCode = 'USD';
      if (props.currency && props.currency.currencyCode) {
        currencyCode = props.currency.currencyCode;
      }
      props.getCheckoutQuery({
        variables: {
          id: props.checkout.id,
          currencyCode,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (getGiftProductsError) {
      console.log(getGiftProductsError);
    } else if (getGiftProductsData) {
      let newGifts = [];
      let i = 0;
      if (getGiftProductsData.nodes) {
        for (let gift of gifts) {
          if (gift) {
            let newGift = {};
            if (gift.giftIds) {
              let newGiftIds = [];
              for (let giftId of gift.giftIds) {
                let newGiftId = {};
                if (giftId.defaultId) {
                  newGiftId.default = getGiftProductsData.nodes[i++];
                }
                if (giftId.additionalIds) {
                  let additional = [];
                  for (let additionalId of giftId.additionalIds) {
                    additional.push(getGiftProductsData.nodes[i++]);
                  }
                  newGiftId.additional = additional;
                }
                newGiftIds.push(newGiftId);
              }
              newGift.giftIds = newGiftIds;
            }

            if (gift.price) {
              newGift.price = gift.price;
            }
            newGifts.push(newGift);
          }
        }
      }
      setGiftOptions(newGifts);
    }
  }, [getGiftProductsData, getGiftProductsError]);

  useEffect(() => {
    if (props.currency && props.currency.currencyCode !== 'USD') {
      const newThreshHold = [];
      const newGifts = [];
      for (const gift of giftsDefault) {
        newThreshHold.push(Math.floor(convertPrice(gift.price, 'USD', props.currency.currencyCode)));
        newGifts.push({
          ...gift,
          price: Math.floor(convertPrice(gift.price, 'USD', props.currency.currencyCode)),
        });
      }
      setPrices(newThreshHold);
      setGifts(newGifts);
    }
  }, [props.currency]);

  function getGifts() {
    let giftIds = [];
    let giftPrices = [];

    for (let gift of gifts) {
      if (gift) {
        if (gift.giftIds) {
          for (let giftId of gift.giftIds) {
            giftIds.push(giftId.defaultId);
            if (giftId.additionalIds) {
              for (let additionalId of giftId.additionalIds) {
                giftIds.push(additionalId);
              }
            }
          }
        }
        if (gift.price) {
          giftPrices.push(gift.price);
        }
      }
    }
    setPrices(giftPrices);
    return giftIds;
  }

  function convertPrice(amount, from, to) {
    if (props.currencyTable) {
      return (amount * props.currencyTable[from]) / props.currencyTable[to];
    } else {
      return amount;
    }
  }

  if (props.checkout) {
    return (
      <div className="cart">
        {!props.isCartDrawerOpen && props.justAdded && props.justAdded.product && props.justAdded.variant ? (
          <div className="add_cart-action">
            <div className="tt">
              <h1>Just added</h1>
            </div>
            <div className="detail">
              <div className="img">
                {props.justAdded.product.images &&
                  props.justAdded.product.images.edges &&
                  props.justAdded.product.images.edges[0] &&
                  props.justAdded.product.images.edges[0].node &&
                  props.justAdded.product.images.edges[0].node.originalSrc ? (
                  <Image
                    src={props.justAdded.product.images.edges[0].node.originalSrc}
                    alt={props.justAdded.product.images.edges[0].node.altText}
                  />
                ) : null}
              </div>
              <div className="body">
                <h2>{props.justAdded.product.title}</h2>
                <p>{props.justAdded.variant.title}</p>
                <span>
                  {props.currency.currencyCode}{' '}
                  {props.justAdded.variant.presentmentPrices &&
                    props.justAdded.variant.presentmentPrices.edges &&
                    props.justAdded.variant.presentmentPrices.edges[0] &&
                    props.justAdded.variant.presentmentPrices.edges[0].node &&
                    props.justAdded.variant.presentmentPrices.edges[0].node.price &&
                    formatPrice(props.justAdded.variant.presentmentPrices.edges[0].node.price.amount)}
                </span>
              </div>
            </div>
            <div className="goTocart">
              <a type="button" className="open_cartBtn" aria-label="Go to Cart" href="/cart">
                Go to Cart
              </a>
            </div>
          </div>
        ) : null}
        <div
          className={props.isCartDrawerOpen ? 'opaque-background block' : 'opaque-background'}
          onClick={() => props.closeCart()}
        />
        <div className={props.isCartDrawerOpen ? 'sidepanel open' : 'sidepanel'}>
          {props.checkoutLineItemsReplaceLoading ? <div className="loading-opaque-background" /> : null}
          <div id="CartDrawer" className="drawer drawer--right drawer--has-fixed-footer drawer--is-open" tabIndex="-1">
            <div className="drawer__fixed-header">
              <div className="drawer__header appear-animation appear-delay-1">
                <Link
                  aria-label="View Cart"
                  to="/cart"
                  className="h2 drawer__title"
                  onClick={() => {
                    props.closeCart();
                  }}
                >
                  View Cart
                  {props.checkout &&
                    props.checkout.lineItems &&
                    props.checkout.lineItems.edges &&
                    props.checkout.lineItems.edges.length ? (
                    <span>({props.checkout.lineItems.edges.length} items)</span>
                  ) : null}
                </Link>
                <a
                  type="button"
                  className="drawer__close-button js-drawer-close navigable"
                  aria-label="Close Cart"
                  onClick={() => props.closeCart()}
                >
                  <div className="close_icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 1L1 17" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 1L17 17" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <InnerContent
              nextGift={nextGift}
              setNextGift={setNextGift}
              setGiftCollected={setGiftCollected}
              prices={prices}
              giftCollected={giftCollected}
              giftOptions={giftOptions}
              gifts={gifts}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
  justAdded: state.justAdded,
  currencyTable: state.currencyTable,
});

export default connect(mapStateToProps)(Cart);
