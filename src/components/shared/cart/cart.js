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
        {props.justAdded && props.justAdded.product && props.justAdded.variant ? (
          <div className="cart_add-side">
            <div className="add_cart-action">
              <div className="tt_icon">
                <p className="tt">Just added</p>
                <div className="icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L1 13" stroke="#282828" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 1L13 13" stroke="#282828" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
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
                  <span>
                    {props.currency.currencySymbol}{' '}
                    {props.justAdded.variant.presentmentPrices &&
                      props.justAdded.variant.presentmentPrices.edges &&
                      props.justAdded.variant.presentmentPrices.edges[0] &&
                      props.justAdded.variant.presentmentPrices.edges[0].node &&
                      props.justAdded.variant.presentmentPrices.edges[0].node.price &&
                      formatPrice(props.justAdded.variant.presentmentPrices.edges[0].node.price.amount)}
                  </span>
                  {props.justAdded.variant && props.justAdded.variant.selectedOptions.map((item, key) => (
                    <p key={key}>{item.name} <span>{item.value}</span></p>
                  ))}
                </div>
              </div>
              <div className="goTocart">
                <a type="button" className="open_cartBtn" aria-label="Go to Cart" href="/cart">
                  Go to Cart
                </a>
              </div>
            </div>
          </div>
        ) : null}
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
