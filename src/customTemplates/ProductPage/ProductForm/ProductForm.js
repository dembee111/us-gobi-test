import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import './ProductForm.scss';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import SizeChart from './SizeChartModal/SizeChart';
import NotifyWhenAvailable from './NotifyWhenAvailable/NotifyWhenAvailable';
import { approvedCountryList } from '../../../components/shared/data/approvedCountryList';
import { addToCart, convertCurrency, isGiftCard } from '../../../components/shared/cart/CartHelpers';
import { toggleWishlist } from '../../WishlistPage/WishlistHelpers';
import SafeLink from './SafeLink';
import { productSizeParser, getProductGender } from '../ProductHelpers';
import { getColorByName } from '../../../components/shared/colors'

const mapStateToProps = (state) => ({
  currency: state.currency,
  myWishlist: state.myWishlist,
  justAdded: state.justAdded,
  checkout: state.checkout,
});
function ProductForm(props) {
  const [productDetailTabState, setProductDetailTabState] = useState(0);
  const [isNotifyWhenAvailableOpen, setIsNotifyWhenAvailableOpen] = useState(false);
  const [productDesciption, setProductDesciption] = useState();
  const [chosenSizeVariant, setChosenSizeVariant] = useState(0);
  const [productPrizeText, setProductPrizeText] = useState();
  const [variant, setVariant] = useState();
  const [vatTextState, setVatTextState] = useState(false);
  const [manOrWoman, setManOrWoman] = useState();
  const [productCode, setProductCode] = useState('');
  const [errorState, setErrorState] = useState({
    message: '',
    show: false,
  });
  const [giftCard, setGiftCard] = useState(false);

  const refBuy = useRef(null);
  const [showMobileBuy, setShowMobileBuy] = useState();

  const cartref = useRef();

  useEffect(() => {
    if (refBuy && refBuy.current) {
      const wHeight = window.innerHeight;
      const rawRect = refBuy.current.getBoundingClientRect().bottom;

      if (wHeight < rawRect) {
        setShowMobileBuy(true);
      }
    }
  }, []);

  useEffect(() => {
    if (props.scrollState) {
      if (refBuy.current) {
        const wHeight = window.innerHeight;
        const rawRect = refBuy.current.getBoundingClientRect().bottom;
        const defHeight = rawRect - wHeight;

        if (rawRect > defHeight && defHeight > 70) {
          setShowMobileBuy(true);
        } else {
          if (defHeight > 20 && defHeight < 150) {
            setShowMobileBuy(false);
          }

          if (rawRect < 180 && showMobileBuy == false) {
            setShowMobileBuy(true);
          } else if (showMobileBuy == true && rawRect > 182) {
            setShowMobileBuy(false);
          }
        }

        // else if (wHeight <= rawRect + 10 ) {
        //   setShowMobileBuy(true)
        // } else if (defHeight < 70 && defHeight > -10) {
        //   setShowMobileBuy(false)
        // }
      }
    }
  }, [props.scrollState]);

  useEffect(() => {
    if (props.baseProductData && props.baseProductData.tags) {
      props.baseProductData.tags.map((tag) => {
        if (tag.includes('uniqueTag-')) {
          setProductCode(tag.split('-')[1]);
        }

        tag = getProductGender(tag);

        if (tag) {
          setManOrWoman(tag);
        }
      });
      if (props.baseProductData.variants.edges[0].node.presentmentPrices) {
        let checkingInt = parseInt(
          props.baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount,
          10,
        );
        if (checkingInt >= 99) {
          setProductPrizeText('Enjoy a COMPLIMENTARY GIFT with your purchase');
        } else {
          setProductPrizeText('COMPLIMENTARY GIFTS on $99+ purchases');
        }
      }
    }
    if (props.baseProductData && props.baseProductData.sizeValues && props.baseProductData.variants) {
      let chosenSizeValue = '';
      for (const sizeValue of props.baseProductData.sizeValues) {
        if (sizeValue.chosen) {
          chosenSizeValue = sizeValue.value;
        }
      }
      for (let singleVariant of props.baseProductData.variants.edges) {
        singleVariant = singleVariant.node;
        for (const singleSelectedOptions of singleVariant.selectedOptions) {
          if (singleSelectedOptions.name === 'Size' || singleSelectedOptions.name === 'Denominations') {
            if (singleSelectedOptions.value === chosenSizeValue) {
              setVariant(singleVariant);
            }
          }
        }
      }
    }

    if (props.baseProductData && props.baseProductData.tags) {
      props.baseProductData.tags.map((item) => {
        if (item.match(/^gift_card.*$/)) {
          setGiftCard(true);
        }
      });
    }
  }, [props.baseProductData]);

  useEffect(() => {
    if (props.currency.chosenShippingCountry) {
      for (const singleCountry of approvedCountryList) {
        if (singleCountry.redirect === '/' || singleCountry.redirect === '/de/') {
          if (
            singleCountry.countryCode === props.currency.chosenShippingCountry &&
            props.currency.chosenShippingCountry !== 'GB'
          ) {
            setVatTextState(true);
          }
        }
      }
    }
  }, [props.currency.chosenShippingCountry]);

  useEffect(() => {
    if (props.baseProductData.descriptionHtml) {
      setProductDesciption(props.baseProductData.descriptionHtml);
    }
  }, [props.baseProductData.descriptionHtml]);

  function openNotifyWhenAvailable() {
    setIsNotifyWhenAvailableOpen(true);
  }

  function closeNotifyWhenAvailable() {
    setIsNotifyWhenAvailableOpen(false);
  }

  function decodeProductId(productId) {
    return atob(productId).replace('gid://shopify/Product/', '');
  }

  useEffect(() => {
    if (props.baseProductData && props.baseProductData.sizeValues) {
      for (const [i, singleValue] of props.baseProductData.sizeValues.entries()) {
        if (singleValue.chosen) {
          setChosenSizeVariant(i);
        }
      }
    }
  }, [props.baseProductData]);

  const getSalePercent = (nowPrice, salePrice) => {
    if (nowPrice && salePrice) {
      return parseFloat(100 - (parseFloat(salePrice).toFixed(2) * 100) / parseFloat(nowPrice).toFixed(2)).toFixed(0);
    } else {
      return null;
    }
  };

  const getSalePrice = (nowPrice, salePrice) => {
    if (nowPrice && salePrice) {
      return parseFloat(parseFloat(nowPrice, 10) - parseFloat(salePrice, 10)).toFixed(2);
    } else {
      return null;
    }
  };

  let ProductPriceHelper = null;
  let ProductBtnHelper = null;
  let chosenSizeValue;

  let priceValue = 0;
  let gifPriceValue = 0;
  let gifSalePriceValue = 0;

  if (
    props.baseProductData &&
    props.baseProductData.variants &&
    props.baseProductData.variants.edges[0].node.presentmentPrices &&
    props.baseProductData.variants.edges[0].node.presentmentPrices.edges.length > 0
  ) {
    priceValue = props.baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount;
  }

  let priceComparedValue = 0;
  if (
    props.baseProductData &&
    props.baseProductData.variants &&
    props.baseProductData.variants.edges[0].node.presentmentPrices &&
    props.baseProductData.variants.edges[0].node.presentmentPrices.edges &&
    props.baseProductData.variants.edges[0].node.presentmentPrices.edges.length > 0 &&
    props.baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice
  ) {
    priceComparedValue =
      props.baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount;
  }

  if (props.baseProductData.id) {
    if (props.baseProductData.sizeValues && props.baseProductData.sizeValues.length > 0) {
      for (let singleSizeValue of props.baseProductData.sizeValues) {
        if (singleSizeValue.chosen) {
          chosenSizeValue = singleSizeValue.value;
        }
      }
    }

    if (props.baseProductData.variants && props.baseProductData.variants.edges.length > 0) {
      const rawID = atob(props.baseProductData.id).replace('gid://shopify/Product/', '');

      if (rawID == 4369663131706) {
        if (props.baseProductData.sizeValues) {
          {
            props.baseProductData.sizeValues.map((item, index) => {
              if (item.chosen == true) {
                const thePrice = item.value.replace('$', '');

                if (thePrice == 100) {
                  priceValue = 95;
                  priceComparedValue = 100;
                } else if (thePrice == 200) {
                  priceValue = 180;
                  priceComparedValue = 200;
                } else if (thePrice == 400) {
                  priceValue = 320;
                  priceComparedValue = 400;
                }
              }
            });
          }
        }
      }
    }

    ProductPriceHelper = (
      <div className="tc_product_price">
        <div className="gr_left">
          {priceComparedValue > 0 && parseFloat(priceComparedValue) > parseFloat(priceValue) ? (
            <div className="productPrice">
              <div className="pr_price">
                <p className="current_price">
                  {props.currency.currencySymbol + ' '}
                  {parseFloat(priceComparedValue, 10).toFixed(2)}
                </p>
                <p className="sale_price">
                  {props.currency.currencySymbol + ' '}
                  {parseFloat(priceValue, 10).toFixed(2)}
                </p>
              </div>
              <div className="salePercentage">
                <p>
                  You save {' ' + props.currency.currencySymbol + ' '}
                  {getSalePrice(priceComparedValue, priceValue)} ({getSalePercent(priceComparedValue, priceValue)}
                  %)
                </p>
              </div>
            </div>
          ) : !giftCard ? (
            <div className="productPrice current">
              <p>
                {props.currency.currencySymbol}
                {parseFloat(priceValue, 10).toFixed(2)}
              </p>
            </div>
          ) : gifSalePriceValue &&
            parseFloat(gifPriceValue.compareAtPrice.amount, 10).toFixed(2) !== gifSalePriceValue ? (
            <div className="productPrice">
              <div className="pr_price">
                <p className="current_price">
                  {props.currency.currencySymbol}
                  {parseFloat(gifPriceValue.compareAtPrice.amount, 10).toFixed(2)}
                </p>
                <p className="sale_price">
                  {props.currency.currencySymbol}
                  {parseFloat(gifSalePriceValue, 10).toFixed(2)}
                </p>
              </div>
              <div className="salePercentage">
                <p>
                  You save {props.currency.currencySymbol}
                  {getSalePrice(gifPriceValue.compareAtPrice.amount, gifSalePriceValue)} (
                  {getSalePercent(gifPriceValue.compareAtPrice.amount, gifSalePriceValue)} %)
                </p>
              </div>
            </div>
          ) : (
            <div className="productPrice current">
              <p>
                {props.currency.currencySymbol}
                {parseFloat(priceValue, 10).toFixed(2)}
              </p>
            </div>
          )}
          {/* <div className="vat_text">
                <p>{vatTextState === true && <span> incl. VAT excl. shipping</span>}</p>
              </div> */}
        </div>
      </div>
    );

    ProductBtnHelper = (
      <div className="tc_product_btns">
        <div className="tc_stock_item">
          {variant ? (
            props.hasExceededQuantity ? (
              <p className="productInventorylabel exceeded-error">
                All {props.baseProductData.variants.edges[chosenSizeVariant].node.quantityAvailable} product(s) are in
                your cart.
              </p>
            ) : props.baseProductData.variants.edges[chosenSizeVariant].node.quantityAvailable > 0 &&
              props.baseProductData.variants.edges[chosenSizeVariant].node.quantityAvailable <= 5 ? (
              <p className="productInventorylabel">
                {' '}
                {`Only ${props.baseProductData.variants.edges[chosenSizeVariant].node.quantityAvailable} items in stock`}
              </p>
            ) : null
          ) : null}
          {props.hasExceededQuantity === 0 && <p className="productInventorylabel"> Sold out</p>}
        </div>
        <div className="addCart_btn">
          {props.baseProductData.chosenSizeAvailability ? (
            props.justAdded &&
              props.justAdded.product &&
              props.justAdded.product.id &&
              props.justAdded.variant &&
              props.justAdded.variant.id &&
              variant &&
              props.justAdded.variant.id === variant.id &&
              props.baseProductData.id === props.justAdded.product.id ? (
              <div>
                <button aria-label="Adding to bag" className="addToCartBtn" disabled={true}>
                  Adding...
                </button>
              </div>
            ) : (
              <div>
                <button
                  id="btn-add-cart"
                  aria-label="Add to bag"
                  onClick={() => {
                    if (!variant) {
                      setErrorState({
                        message: 'Please select a size.',
                        show: true,
                      });
                      cartref && cartref.current && cartref.current.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setErrorState({
                        message: '',
                        show: false,
                      });
                      convertCurrency().then((newGifts) => {
                        props.setHasExceededQuantity(
                          addToCart(variant || props.baseProductData.variants.edges[0].node, props.baseProductData),
                        );
                      });
                    }
                  }}
                  className="addToCartBtn"
                  disabled={props.hasExceededQuantity}
                >
                  Add to cart
                </button>
              </div>
            )
          ) : (
            <div className="add_btn">
              <button
                aria-label="Notify When Available"
                onClick={() => openNotifyWhenAvailable()}
                className="addToCartBtn"
              >
                Notify When Available
              </button>
            </div>
          )}
        </div>
        <div className="wish_btn">
          <button
            aria-label="WishList"
            className="wishListBtn"
            key={props.myWishlist}
            onClick={() => {
              toggleWishlist(
                decodeProductId(props.baseProductData.id),
                props.baseProductData.variants.edges[0].node.id,
              );
            }}
          >
            <div className="wish_btn-grid">
              {props.myWishlist &&
                Array.isArray(props.myWishlist) &&
                props.myWishlist.includes(decodeProductId(props.baseProductData.id)) ? (
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.75056 15.3707C9.35686 15.6959 8.77837 15.6959 8.38469 15.3707C5.89105 13.3107 0.461226 9.15133 1.13972 5.24056C1.6291 2.23326 3.55398 1.21957 4.92423 1.18578C7.08292 1.10497 8.433 2.34416 8.89184 2.85014C8.98311 2.95079 9.15213 2.95079 9.2434 2.85014C9.70224 2.34416 11.0523 1.10497 13.211 1.18578C14.5813 1.21957 16.5061 2.23326 17.0281 5.24056C17.6771 9.15134 12.2445 13.3108 9.75056 15.3707Z"
                    stroke="black"
                    fill="black"
                    strokeWidth="0.8"
                    strokeMiterlimit="10"
                  />
                </svg>
              ) : (
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.75056 15.3707C9.35686 15.6959 8.77837 15.6959 8.38469 15.3707C5.89105 13.3107 0.461226 9.15133 1.13972 5.24056C1.6291 2.23326 3.55398 1.21957 4.92423 1.18578C7.08292 1.10497 8.433 2.34416 8.89184 2.85014C8.98311 2.95079 9.15213 2.95079 9.2434 2.85014C9.70224 2.34416 11.0523 1.10497 13.211 1.18578C14.5813 1.21957 16.5061 2.23326 17.0281 5.24056C17.6771 9.15134 12.2445 13.3108 9.75056 15.3707Z"
                    stroke="black"
                    strokeWidth="0.8"
                    strokeMiterlimit="10"
                  />
                </svg>
              )}
              <span>Add to Wishlist</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tc_new-product" ref={cartref}>
      {props.baseProductData.id && props.baseProductData.variants && (
        <div className="productForm" style={{ width: props.formWidth }}>
          {props.baseProductData.tags.map((item, key) => {
            if (item === `2+1Free`) {
              return (
                <div className="free_tagMobile" key={key}>
                  2+1 FRee
                </div>
              );
            }
          })}
          <div className="tc_product_title">
            <div className="productTitle">
              <h1>{props.baseProductData.title}</h1>
            </div>
          </div>

          {ProductPriceHelper}

          <NotifyWhenAvailable
            product={props.baseProductData}
            isOpen={isNotifyWhenAvailableOpen}
            closeModal={() => closeNotifyWhenAvailable()}
            chosenSizeVariant={chosenSizeVariant}
          />
          {!giftCard ? (
            <div className="tc_product_color">
              <div className="colorTitle">
                <p>
                  Color <span>- {props.baseProductData.chosenColorValue}</span>
                </p>
              </div>
              <div className="colorVarientForm">
                {props.baseProductData.colorValues.map((item, index) => (
                  <div key={index} className="color_lists">
                    {item.chosen ? (
                      <div key={index} className="singleColorVariantBox active">
                        <div
                          className="innerSingleColorBox"
                          style={{
                            backgroundImage: `url(https://cdn.shopify.com/s/files/1/0098/6044/8292/t/21/assets/${item.name}_50x.png?v=)`,                          }}
                        />
                      </div>
                    ) : (
                      <div key={index} className="singleColorVariantBox">
                        <SafeLink alt="Product Color Value" to={item.handle}>
                          <div
                            className="innerSingleColorBox"
                            style={{
                              backgroundImage: `url(https://cdn.shopify.com/s/files/1/0098/6044/8292/t/21/assets/${item.name}_50x.png?v=)`
                            }}
                          />
                        </SafeLink>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="tc_product_size">
            <div className="sizeTitle">
              <span className="s_tt">{giftCard ? 'Select Amount' : 'Select Size'}</span>
              <div className="size_chart">
                <SizeChart productCode={productCode} manOrWoman={manOrWoman} />
              </div>
            </div>
            <div className={!errorState.show ? 'size-section' : 'size-section errorSize'}>
              <ul className="sizeLists" id="product-sizelist">
                {props.baseProductData.sizeValues.map((item, index) => (
                  <li key={index} className={`${item.value.length > 4 ? 'lengthHigh' : ''}`}>
                    {item.chosen ? (
                      <div className={`sizeBox ${item.availableForSale ? '' : 'notAvailable'}`}>
                        <span data-size={item.value}>{productSizeParser(item.value, manOrWoman)}</span>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setErrorState({
                            message: '',
                            show: false,
                          });
                          props.changeSize(item.value);
                        }}
                        className={item.availableForSale ? '' : 'notAvailable'}
                      >
                        <span data-size={item.value}>{productSizeParser(item.value, manOrWoman)}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: errorState.show ? 'block' : 'none' }} className="sizeErrorMessage">
              {errorState.message}
            </div>
          </div>

          {ProductBtnHelper}

          <div className="mobile_Bottom" style={{ display: showMobileBuy == true ? 'flex' : 'none' }}>
            {ProductBtnHelper}
          </div>
          <div className="free_gift" ref={refBuy}>
            {/* <p>{productPrizeText}</p> */}
          </div>
          <div className="productDetailTab">
            <div className="d-none d-lg-block">
              <div className="tabHeader" style={{ marginBottom: '20px' }}>
                <div className="row" style={{ display: 'flex' }}>
                  <div className="col" onClick={() => setProductDetailTabState(0)}>
                    Description
                  </div>
                </div>
                <div className="tabHeaderUnderline">
                  <div
                    className="blackUnderline"
                    style={{
                      marginLeft: productDetailTabState === 1 ? '100%' : '0%',
                    }}
                  />
                </div>
              </div>

              <div className="tabBody">
                <div
                  className="tabDetail"
                  style={{
                    display: productDetailTabState === 0 ? 'block' : 'none',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: productDesciption,
                  }}
                />
              </div>
            </div>
            <div className="d-lg-none">
              <Collapsible
                trigger={
                  <div
                    style={{
                      display: 'flex',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <p className="collapseTitle">Description</p>
                    <svg
                      style={{
                        marginTop: '4px',
                        position: 'absolute',
                        right: '10px',
                      }}
                      width="9"
                      height="9"
                      viewBox="0 0 9 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.402344 4.20459H8.40234" stroke="black" />
                      <path d="M4.48828 0.11853L4.48828 8.11853" stroke="black" />
                    </svg>
                  </div>
                }
                triggerWhenOpen={
                  <div
                    style={{
                      display: 'flex',
                      position: 'relative',
                    }}
                  >
                    <p className="collapseTitle">Description</p>
                    <svg
                      style={{
                        marginTop: '8px',
                        position: 'absolute',
                        right: '10px',
                      }}
                      width="9"
                      height="2"
                      viewBox="0 0 9 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.402344 1.20459H8.40234" stroke="black" />
                    </svg>
                  </div>
                }
              >
                <div
                  className="tabDetail"
                  dangerouslySetInnerHTML={{
                    __html: productDesciption,
                  }}
                />
              </Collapsible>
            </div>

            <div className="tc_product_footer">
              <div className="left">
                <Link to="/pages/cashmere-care">
                  <div className="cashmere-care">
                    <span>Cashmere care</span>
                  </div>
                </Link>
              </div>
              <div className="right">
                <div className="social-footer">
                  <span>Share: </span>
                  <ul>
                    <li>
                      <FacebookShareButton
                        url={typeof window !== `undefined` && window.location.href}
                        subject="Gobi Cashmere"
                        body="body"
                        className="Demo__some-network__share-button"
                      >
                        <i className="fa fa-facebook-f">
                          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M4.96863 12.4883H2.24262V6.6792H0.878906V4.44075H2.24156V3.09796C2.24156 1.273 3.01121 0.186523 5.19804 0.186523H7.01774V2.42497H5.87989C5.03023 2.42497 4.97217 2.73757 4.97217 3.32134L4.96863 4.44075H7.02978L6.78833 6.6792H4.96863V12.4883Z"
                              fill="#303030"
                            />
                          </svg>
                        </i>
                      </FacebookShareButton>
                    </li>
                    <li>
                      <TwitterShareButton
                        url={typeof window !== `undefined` && window.location.href}
                        subject="Gobi Cashmere"
                        body="body"
                        className="Demo__some-network__share-button"
                      >
                        <i className="fa fa-twitter">
                          <svg
                            width="16"
                            height="13"
                            viewBox="0 0 16 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.8845 1.64263C15.3086 1.89366 14.6979 2.0586 14.0725 2.13201C14.7312 1.74395 15.2243 1.13326 15.4597 0.413744C14.8403 0.775802 14.1625 1.03064 13.4556 1.1672C13.0226 0.713097 12.4611 0.397573 11.8438 0.261546C11.2266 0.125518 10.5821 0.175262 9.99384 0.404328C9.40563 0.633393 8.90088 1.03121 8.54503 1.5462C8.18918 2.06118 7.99865 2.66958 7.99816 3.29249C7.99819 3.53099 8.0258 3.76871 8.08046 4.00106C6.82601 3.93891 5.59886 3.61759 4.47873 3.05797C3.35859 2.49835 2.37051 1.71295 1.57868 0.752778C1.17485 1.43679 1.051 2.24669 1.23237 3.01749C1.41374 3.78828 1.88668 4.46199 2.55486 4.90138C2.05432 4.88633 1.56476 4.75317 1.12732 4.5131V4.55275C1.12749 5.26991 1.37953 5.96494 1.8407 6.51997C2.30188 7.075 2.94379 7.45586 3.65759 7.59796C3.3866 7.67062 3.10697 7.70726 2.82611 7.70691C2.62724 7.70691 2.42882 7.68809 2.2336 7.65069C2.43532 8.26788 2.8278 8.80758 3.35618 9.1944C3.88455 9.58122 4.52244 9.79582 5.1807 9.80823C4.06213 10.6717 2.68132 11.1398 1.26008 11.1373C1.00867 11.1375 0.757472 11.1229 0.507812 11.0938C1.95045 12.0063 3.6294 12.4904 5.34399 12.4883C11.1462 12.4883 14.3198 7.75528 14.3198 3.65113C14.3198 3.5156 14.3163 3.38313 14.311 3.24935C14.9285 2.80983 15.4615 2.26546 15.885 1.64176L15.8845 1.64263Z"
                              fill="#303030"
                            />
                          </svg>
                        </i>
                      </TwitterShareButton>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default React.memo(connect(mapStateToProps)(ProductForm));
