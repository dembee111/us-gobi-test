import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ProgressBar, Step } from 'react-step-progress-bar';
import LineItems from './LineItems';
import { useLazyQuery } from '@apollo/client';
import {
  getSlideIndex,
  formatPrice,
  addToCart,
  discountPercentages,
  getProgressPercentage,
  getPriceUntilNextDiscount,
  hasIcecreamCollection,
  hasGiftBox,
} from './CartHelpers';
import { getGiftBox } from '../query/query.js';
import { Link } from 'gatsby';
import GiftSection from './GiftSection';
import 'react-step-progress-bar/styles.css';

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
  client: state.client,
});

export default connect(mapStateToProps)(InnerContent);

function InnerContent(props) {
  const [getGiftBoxQuery, { data: getGiftBoxData, error: getGiftBoxError }] = useLazyQuery(getGiftBox, {
    errorPolicy: 'all',
  });
  const [isGiftAdded, setIsGiftAdded] = useState(false);

  useEffect(() => {
    //get gift box
    if (props.currency && props.currency.currencyCode) {
      getGiftBoxQuery({
        variables: {
          handle: 'luxury-gift-box-1',
          currencyCode: props.currency.currencyCode,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (getGiftBoxError) {
      console.log('getGiftBoxError', getGiftBoxError);
    }
  }, [getGiftBoxData, getGiftBoxError]);
  const slideIndex = getSlideIndex(props.checkout.subtotalPriceV2.amount, props.gifts);
  let priceUntilNextDiscount = getPriceUntilNextDiscount();

  function goToCheckout() {
    // if (window.dataLayer) {
    //   const lineItemsArray = [];
    //   for (const singleLineItemEdge of props.checkout.lineItems.edges) {
    //     const singleLineItem = singleLineItemEdge.node;
    //     if (singleLineItem.variant) {
    //       lineItemsArray.push({
    //         id:
    //           singleLineItem.variant.id &&
    //           atob(singleLineItem.variant.id).replace('gid://shopify/ProductVariant/', '').replace("'", ''),
    //         name: singleLineItem.title && singleLineItem.title.replace("'", ''),
    //         variant: singleLineItem.variant.title && singleLineItem.variant.title.replace("'", ''),
    //         quantity: singleLineItem.quantity,
    //         price: singleLineItem.variant.price,
    //       });
    //     }
    //   }
    //   window.dataLayer.push({
    //     event: 'checkout',
    //     ecommerce: {
    //       checkout: {
    //         actionField: { step: 1, option: 'Shopify Checkout Url Redirect' },
    //         products: lineItemsArray,
    //       },
    //     },
    //   });
    // }
    window.location.assign(props.checkout.webUrl);
  }

  function getPercentage(num, slideIndex) {
    let nextPrice = 89;
    let currPrice = 0;
    if (props.prices && props.prices[Number(slideIndex) + 1]) {
      nextPrice = props.prices[Number(slideIndex) + 1];
    }
    if (props.prices && props.prices[Number(slideIndex)]) {
      currPrice = props.prices[Number(slideIndex)];
    }
    const diff = Number(nextPrice) - Number(currPrice);
    if (!Number.isNaN(diff) && diff > 0) {
      return ((Number(num) - Number(currPrice)) * 100) / Number(diff);
    }
    return 100;
  }

  if (!props.checkout.lineItems || !props.checkout.lineItems.edges) {
    return null;
  }
  if (props.checkout.lineItems.edges.length === 0) {
    return (
      <p className="appear-animation appear-delay-3 empty-text" data-open-accessibility-text-original="16px">
        Your cart is currently empty.
      </p>
    );
  }

  return (
    <div>
      <div className="drawer__inner">
        {/* <div className={basicLine.count > 0 ? 'footer_accordion open' : 'footer_accordion disable'}>
          <div className="detail custom_price_bar">
            <div className="tc_step">
              {basicLine.count > 2 ? (
                <div className="free_txt">
                  <div className="gift-icon">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.7997 7V13H2.19971V7" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 4H1V7H13V4Z" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 13V4" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M7.00029 4H4.30029C3.90247 4 3.52094 3.84196 3.23963 3.56066C2.95833 3.27936 2.80029 2.89782 2.80029 2.5C2.80029 2.10218 2.95833 1.72064 3.23963 1.43934C3.52094 1.15804 3.90247 1 4.30029 1C6.40029 1 7.00029 4 7.00029 4Z"
                        stroke="#212121"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 4H9.7C10.0978 4 10.4794 3.84196 10.7607 3.56066C11.042 3.27936 11.2 2.89782 11.2 2.5C11.2 2.10218 11.042 1.72064 10.7607 1.43934C10.4794 1.15804 10.0978 1 9.7 1C7.6 1 7 4 7 4Z"
                        stroke="#212121"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Congrats! You getting a free gift.</span>
                </div>
              ) : (
                <div className="free_txt">
                  <div className="gift_icon">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.7997 7V13H2.19971V7" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 4H1V7H13V4Z" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 13V4" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M7.00029 4H4.30029C3.90247 4 3.52094 3.84196 3.23963 3.56066C2.95833 3.27936 2.80029 2.89782 2.80029 2.5C2.80029 2.10218 2.95833 1.72064 3.23963 1.43934C3.52094 1.15804 3.90247 1 4.30029 1C6.40029 1 7.00029 4 7.00029 4Z"
                        stroke="#212121"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 4H9.7C10.0978 4 10.4794 3.84196 10.7607 3.56066C11.042 3.27936 11.2 2.89782 11.2 2.5C11.2 2.10218 11.042 1.72064 10.7607 1.43934C10.4794 1.15804 10.0978 1 9.7 1C7.6 1 7 4 7 4Z"
                        stroke="#212121"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Buy 2, Get 1 Free</span>
                </div>
              )}
            </div>
            <div className="p-bar-grid">
              <div className={`step-col ${basicLine.count > 0 && 'col-active'}`}></div>
              <div className={`step-col ${basicLine.count >= 2 && 'col-active'}`}></div>
              <div className={`step-col ${basicLine.count >= 3 && 'col-active'}`}></div>
            </div>
            <div className="tc-text">
              {basicLine.count > 2 ? (
                <div className="free_txt">
                  <span> </span>
                </div>
              ) : (
                <div className="free_txt">
                  <span>Choose 3 from Basics Collection</span>
                </div>
              )}
            </div>

             <ProgressBar percent={calPercentageProgressBar(basicLine.count)}>
              <Step>
                {() => (
                  <div className="tc_step">
                    {basicLine.count > 2 ? (
                      <div className="free_txt">
                        <span>Congrats! You getting a free gift.</span>
                      </div>
                    ) : (
                      <div className="free_txt">
                        <div className="gift_icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.7997 12V18H7.19971V12"
                              stroke="#212121"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M18 9H6V12H18V9Z" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 18V9" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                            <path
                              d="M12.0003 9H9.30029C8.90247 9 8.52094 8.84196 8.23963 8.56066C7.95833 8.27936 7.80029 7.89782 7.80029 7.5C7.80029 7.10218 7.95833 6.72064 8.23963 6.43934C8.52094 6.15804 8.90247 6 9.30029 6C11.4003 6 12.0003 9 12.0003 9Z"
                              stroke="#212121"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 9H14.7C15.0978 9 15.4794 8.84196 15.7607 8.56066C16.042 8.27936 16.2 7.89782 16.2 7.5C16.2 7.10218 16.042 6.72064 15.7607 6.43934C15.4794 6.15804 15.0978 6 14.7 6C12.6 6 12 9 12 9Z"
                              stroke="#212121"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span>Buy 2, Get 1 Free</span>
                      </div>
                    )}
                  </div>
                )}
              </Step>
              <Step>{() => <div className="tc_step"></div>}</Step>
            </ProgressBar> 
          </div>
        </div> */}
        <div id="CartContainer">
          <LineItems
            setGiftCollected={props.setGiftCollected}
            setNextGift={props.setNextGift}
            gifts={props.gifts}
            giftOptions={props.giftOptions}
          />
          {props.checkout &&
            props.checkout.lineItems &&
            props.checkout.lineItems.edges &&
            !hasGiftBox(props.checkout.lineItems.edges) &&
            Number(props.checkout.subtotalPriceV2.amount) > 99 &&
            getGiftBoxData &&
            getGiftBoxData.productByHandle &&
            getGiftBoxData.productByHandle.variants &&
            getGiftBoxData.productByHandle.variants.edges &&
            getGiftBoxData.productByHandle.variants.edges[0] &&
            getGiftBoxData.productByHandle.variants.edges[0].node &&
            getGiftBoxData.productByHandle.variants.edges[0].node ? (
            <div className="giftbox">
              <button
                aria-label="Add to gift box to cart"
                disabled={!getGiftBoxData.productByHandle.variants.edges[0].node.availableForSale}
                onClick={() => {
                  addToCart(getGiftBoxData.productByHandle.variants.edges[0].node, getGiftBoxData.productByHandle);
                }}
                className="cart-btn"
              >
                <span>Add gift box</span>
              </button>
              {/* <Link
                className="giftbox-link"
                to={getGiftBoxData.productByHandle.handle ? '/products/' + getGiftBoxData.productByHandle.handle : ''}
              >
                View Gift Box
              </Link> */}
            </div>
          ) : null}
        </div>
      </div >
      <div className="drawer__footer drawer__footer--fixed appear-animation appear-delay-5">
        <div className="cart-footer">
          {/* <GiftSection setIsGiftAdded={setIsGiftAdded} isMini={true} /> */}
          <div className="total">
            <div className="total_tt">Subtotal</div>
            <p className="sub_total">
              {props.currency.currencySymbol}
              {formatPrice(props.checkout.subtotalPriceV2.amount)}
            </p>
          </div>
          <button aria-label="Checkout" type="submit" className="checkout_btn" name="checkout" onClick={goToCheckout}>
            <span>Checkout</span>
          </button>
          <div className="checkoutTxt">
            <p>
              By checking out, I agree to the <Link to="/pages/terms-of-service/">General Terms and Conditions</Link>{' '}
              and acknowledge that I have read the <Link to="/pages/privacy-policy/">Privacy Policy.</Link>
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}
