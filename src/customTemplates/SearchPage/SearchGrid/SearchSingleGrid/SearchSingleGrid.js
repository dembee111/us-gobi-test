import React, { Component, useEffect, useState, useRef } from 'react';
import './SearchSingleGrid.scss';
import { gerSpecialChar } from '../../../CollectionPage/CollectionHelper';
import { Link } from 'gatsby';
import { productClickEvent } from '../../../../components/shared/dataLayer/index';
import { sendProductClickEvent } from '../../../../components/shared/dataLayer/algolia';
import capitalize from 'capitalize';
import LazyLoad from 'react-lazyload';
import { toggleWishlist } from '../../../WishlistPage/WishlistHelpers';
import { connect } from 'react-redux';
import GiftPop from '../../GiftPop/GiftPop';
import { GatsbyImage } from "gatsby-plugin-image";
import { getShopifyImage } from "gatsby-source-shopify";
import { getColorByName } from '../../../../components/shared/colors'

function CollectionSingleGrid(props) {
  const [hover, setHover] = useState(false);
  const [innerColorHover, setInnerColorHover] = useState(false);
  const [imgSrcSetState, setImgSrcSetState] = useState(
    `${props.hit.product_image.replace('.jpg', '_260x.jpg')} 260w,` +
    `${props.hit.product_image.replace('.jpg', '_390x.jpg')} 390w,` +
    `${props.hit.product_image.replace('.jpg', '_468x.jpg')} 468w,` +
    `${props.hit.product_image.replace('.jpg', '_560x.jpg')} 560w,` +
    `${props.hit.product_image.replace('.jpg', '_640x.jpg')} 640w,` +
    `${props.hit.product_image.replace('.jpg', '_750x.jpg')} 750w,` +
    `${props.hit.product_image.replace('.jpg', '_828x.jpg')} 828w,` +
    `${props.hit.product_image.replace('.jpg', '_1080x.jpg')} 1080w,`,
  );

  const [secondaryImageState, setSecondaryImageState] = useState();
  const [colorsState, setColorsState] = useState([]);
  const [newTagState, setNewTagState] = useState();
  const [priceLabelState, setPriceLabelState] = useState();
  const [colorSwatchElementState, setColorSwatchElementState] = useState();
  const [moreThanAprrovedColorsState, setMoreThanAprrovedColorsState] = useState();
  const imageRef = useRef();
  const [openGiftPop, setOpenGiftPop] = useState(false);
  function convertPrice(amount, from, to) {
    if (props.currencyTable) {
      return (amount * props.currencyTable[from]) / props.currencyTable[to];
    } else {
      return amount;
    }
  }
  function popCloseCallBack(e) {
    setOpenGiftPop(false);
  }
  function gridMouseEnter() {
    setHover(true);
  }

  // product is not getting hovered
  function gridMouseLeave() {
    setHover(false);
  }

  function productAnalyticClickHandle() {
    let url = new URL(window.location.href);
    url.searchParams.set('scrollPosition', window.pageYOffset);

    window.history.replaceState({}, null, url);
    let collectionCollectionHandle = window.location.pathname && window.location.pathname.replace('/search/', '/');
    collectionCollectionHandle = collectionCollectionHandle.replace('/collections/', '/');
    let sendingProductData = {
      name: props.hit.title && props.hit.title.replace("'", ''),
      id: props.hit.sku,
      price: props.hit.price,
      brand: 'Gobi Cashmere',
      category: props.hit.product_type,
      position: props.rowIndex,
    };
    productClickEvent(sendingProductData, collectionCollectionHandle);
    let sendingObjectIds = [props.hit.objectID];
    sendProductClickEvent(sendingObjectIds, 'us_products');
  }
  function openPop() {
    setOpenGiftPop(true);
  }
  useEffect(() => {
    let imgSrcSet;
    let secondaryImage;
    if (props.highlited) {
      imgSrcSet =
        `${props.hit.product_image.replace('.jpg', '_260x.jpg')} 260w,` +
        `${props.hit.product_image.replace('.jpg', '_390x.jpg')} 390w,` +
        `${props.hit.product_image.replace('.jpg', '_468x.jpg')} 468w,` +
        `${props.hit.product_image.replace('.jpg', '_560x.jpg')} 560w,` +
        `${props.hit.product_image.replace('.jpg', '_640x.jpg')} 640w,` +
        `${props.hit.product_image.replace('.jpg', '_750x.jpg')} 750w,` +
        `${props.hit.product_image.replace('.jpg', '_828x.jpg')} 828w,` +
        `${props.hit.product_image.replace('.jpg', '_1080x.jpg')} 1080w,`;

      if (props.hit.named_tags) {
        if (!props.hit.named_tags.secondary_image || props.hit.named_tags.secondary_image.constructor === Array) {
          secondaryImage = imgSrcSet;
        } else {
          secondaryImage =
            `${props.hit.named_tags.secondary_image.replace('.jpg', '260x.jpg')} 260w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_390x.jpg')} 390w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_468x.jpg')} 468w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_560x.jpg')} 560w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_640x.jpg')} 640w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_750x.jpg')} 750w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_828x.jpg')} 828w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_1080x.jpg')} 1080w,`;
        }
      } else {
        secondaryImage = imgSrcSet;
      }
    } else {
      imgSrcSet =
        `${props.hit.product_image.replace('.jpg', '_260x.jpg')} 260w,` +
        `${props.hit.product_image.replace('.jpg', '_390x.jpg')} 390w,` +
        `${props.hit.product_image.replace('.jpg', '_468x.jpg')} 468w,` +
        `${props.hit.product_image.replace('.jpg', '_560x.jpg')} 560w,` +
        `${props.hit.product_image.replace('.jpg', '_640x.jpg')} 640w,` +
        `${props.hit.product_image.replace('.jpg', '_750x.jpg')} 750w,` +
        `${props.hit.product_image.replace('.jpg', '_828x.jpg')} 828w,` +
        `${props.hit.product_image.replace('.jpg', '_1080x.jpg')} 1080w,`;
      if (props.hit.named_tags) {
        if (!props.hit.named_tags.secondary_image || props.hit.named_tags.secondary_image.constructor === Array) {
          secondaryImage = imgSrcSet;
        } else {
          secondaryImage =
            `${props.hit.named_tags.secondary_image.replace('.jpg', '260x.jpg')} 260w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_390x.jpg')} 390w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_468x.jpg')} 468w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_560x.jpg')} 560w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_640x.jpg')} 640w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_750x.jpg')} 750w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_828x.jpg')} 828w,` +
            `${props.hit.named_tags.secondary_image.replace('.jpg', '_1080x.jpg')} 1080w,`;
        }
      } else {
        secondaryImage = imgSrcSet;
      }
    }

    let priceLabel;
    if (props.hit.price) {
      switch (true) {
        case Math.floor(props.hit.price) >= 599:
          priceLabel = <p>Buy now, get a free blanket & socks</p>;
          break;
        case Math.floor(props.hit.price) >= 499:
          priceLabel = <p>Buy now, get a free knit blanket</p>;
          break;
        case Math.floor(props.hit.price) >= 399:
          priceLabel = <p>Buy now, get a free triangle scarf</p>;
          break;
        case Math.floor(props.hit.price) >= 299:
          priceLabel = <p>Buy now, get a free triangle scarf</p>;
          break;
        case Math.floor(props.hit.price) >= 199:
          priceLabel = <p>Buy now, get a free fringe scarf</p>;
          break;
        case Math.floor(props.hit.price) >= 89:
          priceLabel = <p>Buy now, get a FREE ribbed hat or a pair of socks</p>;
          break;
        default:
          priceLabel = <p>Spend €89+ FREE ribbed hat or a pair of socks</p>;
          break;
      }
    }
    let colors = [];

    for (const singleTag of props.hit.tags) {
      if (singleTag.includes('handle_')) {
        let color = singleTag.replace('handle_', '');
        const spliceIndex = color.indexOf('+');

        color = color.slice(0, spliceIndex);
        let handle = singleTag.replace(`handle_${color}+`, '');
        handle = `/products/${handle}`;
        colors.push({
          color,
          handle,
        });
      }
    }

    let newTag = false;
    for (const singleTag of props.hit.tags) {
      if (singleTag === 'newss') {
        newTag = true;
        break;
      }
    }

    let colorSwatchElement;
    let moreThanAprrovedColors = 0;

    if (props.hit.options.color) {
      const colorSwatchConnectionElements = colors.map((data, index) => {
        let chosenIndex = 9;
        if (typeof window !== `undefined`) {
          if (window.innerWidth < 1000) {
            chosenIndex = 9;
          } else if (window.innerWidth < 1400) {
            chosenIndex = 5;
          } else if (window.innerWidth < 1760) {
            chosenIndex = 6;
          } else if (window.innerWidth < 1500) {
            chosenIndex = 5;
          } else {
            chosenIndex = 9;
          }
        }

        if (props.source.origin === 'productRecommendation') {
          chosenIndex = 5;
        }
        if (props.source.origin === 'homeCollection') {
          chosenIndex = 5;
        }
        if (index < chosenIndex) {
          if (data.color !== props.hit.options.color) {
            let processedSelectedColorOther = data.color.replace(new RegExp(' ', 'g'), '-');
            for (const singleSpecialChar of gerSpecialChar) {
              processedSelectedColorOther = processedSelectedColorOther.replace(
                new RegExp(singleSpecialChar.og, 'g'),
                singleSpecialChar.new,
              );
            }
            return (
              <div
                key={index}
                style={{
                  margin: '0 7px',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onMouseEnter={() => {
                  setInnerColorHover(true);
                }}
                onMouseLeave={() => {
                  setInnerColorHover(false);
                }}
              >
                <div className="singleColorBox" key={index}>
                  <Link onClick={productAnalyticClickHandle} to={data.handle}>
                    <div
                      className="innerSingleColorBox"
                      style={{
                        backgroundImage: `url(https://cdn.shopify.com/s/files/1/1953/2845/t/95/assets/${processedSelectedColorOther}_15x.png?v=)`
                      }}
                    />
                  </Link>
                </div>
              </div>
            );
          }
        } else {
          moreThanAprrovedColors++;
        }
      });

      let processedSelectedColor = props.hit.options.color.replace(new RegExp(' ', 'g'), '-');

      for (const singleSpecialChar of gerSpecialChar) {
        processedSelectedColor = processedSelectedColor.replace(
          new RegExp(singleSpecialChar.og, 'g'),
          singleSpecialChar.new,
        );
      }

      colorSwatchElement = (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <div
              style={{ paddingRight: '7px' }}
              onMouseEnter={() => {
                setInnerColorHover(true);
              }}
              onMouseLeave={() => {
                setInnerColorHover(false);
              }}
            >
              <div className={innerColorHover ? 'singleColorBox' : 'singleColorBoxUnderLined singleColorBox'}>
                <Link to={'/products/' + props.hit.handle} onClick={productAnalyticClickHandle}>
                  <div
                    className="innerSingleColorBox"
                    style={{
                     backgroundImage: `url(https://cdn.shopify.com/s/files/1/1953/2845/t/95/assets/${processedSelectedColor}_15x.png?v=)`
                    }}
                  />
                </Link>
              </div>
            </div>
            {colorSwatchConnectionElements}
          </div>
        </div>
      );
    }

    setSecondaryImageState(secondaryImage);
    setColorsState(colors);
    setNewTagState(newTag);
    setColorSwatchElementState(colorSwatchElement);
    setMoreThanAprrovedColorsState(moreThanAprrovedColors);
    setPriceLabelState(priceLabel);
  }, [props.hit]);

  let trendingState = false;
  let bestSellerState = false;
  let runningFastState = false;
  let organicYarnState = false;
  let twoPlusState = false;

  if (props.hit && props.hit.id) {
    for (let singleTag of props.hit.tags) {
      if (singleTag.includes('trending')) {
        trendingState = true;
      }
      if (singleTag.includes('bestsellers')) {
        bestSellerState = true;
      }
      if (singleTag.includes('runningfast')) {
        runningFastState = true;
      }
      if (singleTag.includes('organic')) {
        organicYarnState = true;
      }
      if (singleTag.includes('2+1Free')) {
        twoPlusState = true;
      }
    }
  }

  let giftIconState = false;
  if (props.hit.price >= 99) {
    giftIconState = false;
  }
  if (props.source.origin === 'productRecommendation') {
    giftIconState = false;
  }

  const getSalePercent = (nowPrice, salePrice) => {
    if (nowPrice && salePrice) {
      return parseFloat(100 - (parseFloat(salePrice).toFixed(2) * 100) / parseFloat(nowPrice).toFixed(2)).toFixed(0);
    } else {
      return null;
    }
  };

  let outOfStockState = false;
  if (props.hit && props.hit.variants_inventory_count === 0) {
    outOfStockState = true;
  }

  return (
    <div className="searchPageSinglGrid">
      <div className="singleProductSpace">
        <div
          ref={imageRef}
          onMouseEnter={() => {
            if (window.innerWidth > 768) {
              gridMouseEnter();
            }
          }}
          onMouseLeave={() => {
            if (window.innerWidth > 768) {
              gridMouseLeave();
            }
          }}
          style={{ position: 'relative', width: '100%' }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <Link onClick={productAnalyticClickHandle} to={'/products/' + props.hit.handle} aria-label="Link to image">
              <div
                className="productImage"
                style={{
                  width: '100%',
                  height: props.gridWidth * 1.5,
                  overflow: 'hidden',
                  backgroundColor: '#F2F2F2',
                }}
              >
                <LazyLoad offset={200} once>
                  <div
                    style={{
                      position: 'relative',
                      opacity: hover ? '0' : '1',
                      overflow: 'hidden',
                    }}
                  >
                    {/* <GatsbyImage image={imageData} alt={image.altText} /> */}

                    <img
                      sizes="(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1440px) 1440px, (max-width: 1680px) 1680px, (max-width: 1920px) 1920px, 1920px"
                      srcSet={imgSrcSetState}
                      style={{
                        width: '100%',
                        height: props.gridWidth * 1.5,
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    ></img>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '0px',
                      opacity: !hover ? '0' : '1',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      srcSet={secondaryImageState}
                      style={{
                        width: '100%',
                        height: props.gridWidth * 1.5,
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    ></img>
                  </div>
                </LazyLoad>
              </div>
            </Link>
            <a
              className="wishlist-toggle"
              aria-label="toggle wishlist"
              key={props.myWishlist}
              onClick={() => {
                toggleWishlist(props.hit.id + '', props.hit.objectID);
              }}
            >
              {props.myWishlist && Array.isArray(props.myWishlist) && props.myWishlist.includes(props.hit.id + '') ? (
                <div>
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.6493 16.4528C10.2615 16.7626 9.70718 16.7626 9.3194 16.4528C6.56407 14.2512 0.292627 9.68585 1.06545 5.39656C1.616 2.13881 3.78149 1.04069 5.32302 1.00409C7.79228 0.915077 9.32108 2.30438 9.81171 2.83397C9.90199 2.93142 10.0667 2.93142 10.157 2.83397C10.6476 2.30438 12.1764 0.915077 14.6456 1.00409C16.1872 1.04069 18.3527 2.13881 18.9399 5.39656C19.6791 9.68585 13.4048 14.2513 10.6493 16.4528Z"
                      stroke="#4F5255"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </div>
              ) : (
                <div>
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.6493 16.4528C10.2615 16.7626 9.70718 16.7626 9.3194 16.4528C6.56407 14.2512 0.292627 9.68585 1.06545 5.39656C1.616 2.13881 3.78149 1.04069 5.32302 1.00409C7.79228 0.915077 9.32108 2.30438 9.81171 2.83397C9.90199 2.93142 10.0667 2.93142 10.157 2.83397C10.6476 2.30438 12.1764 0.915077 14.6456 1.00409C16.1872 1.04069 18.3527 2.13881 18.9399 5.39656C19.6791 9.68585 13.4048 14.2513 10.6493 16.4528Z"
                      stroke="#4F5255"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </div>
              )}
            </a>
            {outOfStockState && (
              <div className="outOfStockLabel" aria-label="outOfStock label">
                <p>Out of Stock</p>
              </div>
            )}
            {giftIconState && (
              <div
                className="giftIcon"
                aria-label="gift icon"
                onClick={() => {
                  openPop();
                }}
              >
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.2003 10V19H2.80029V10" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 5.5H1V10H19V5.5Z" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 19V5.5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M9.99971 5.5H5.94971C5.35297 5.5 4.78067 5.26295 4.35872 4.84099C3.93676 4.41903 3.69971 3.84674 3.69971 3.25C3.69971 2.65326 3.93676 2.08097 4.35872 1.65901C4.78067 1.23705 5.35297 1 5.94971 1C9.09971 1 9.99971 5.5 9.99971 5.5Z"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 5.5H14.05C14.6467 5.5 15.219 5.26295 15.641 4.84099C16.0629 4.41903 16.3 3.84674 16.3 3.25C16.3 2.65326 16.0629 2.08097 15.641 1.65901C15.219 1.23705 14.6467 1 14.05 1C10.9 1 10 5.5 10 5.5Z"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="giftIconTitle">
                  <p>Get a FREE Gift</p>
                </div>
              </div>
            )}
          </div>
          <div className="new-tag-box">
            {props.hit.compare_at_price &&
              props.hit.compare_at_price > 0 &&
              props.hit.compare_at_price != props.hit.price && [
                <div key="0" className="saleTag">
                  -{getSalePercent(props.hit.compare_at_price, props.hit.price)}%
                </div>,
              ]}
            {organicYarnState && <label className="organicYarnTag">{'Organic Yarn'}</label>}
            {newTagState && <label className="newTag">{'New'}</label>}
            {trendingState && <label className="trendingTag">{'Trending '}</label>}
            {bestSellerState && <label className="bestSellerTag">{'Best Seller'}</label>}
            {runningFastState && <label className="bestSellerTag">{'Running Fast'}</label>}
            {twoPlusState && <label className="twoPlusTag">{'2+1 Free'}</label>}
          </div>
          <div className="productDetailBox">
            {!hover ? (
              <div>
                <div className="row productHighBox">
                  <div className="col-12 col-md-7 col-lg-12 col-xl-12 productTitleBox" style={{ padding: '0' }}>
                    <div className="productTitle">
                      <p>{capitalize.words(props.hit.title)}</p>
                    </div>

                    <div className="productColorBox">
                      {colorsState.length > 0 && <p> +{colorsState.length} colors</p>}
                    </div>
                  </div>
                </div>
                <div className="new-price-box">
                  <div className="col-12 col-md-5 col-lg-12 col-xl-3 productPriceBox" style={{ padding: '0' }}>
                    <div className="productPriceBoxInner">
                      {props.hit.compare_at_price == null ||
                        props.hit.compare_at_price < 1 ||
                        props.hit.compare_at_price == props.hit.price ? (
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            color: '#212121',
                          }}
                        >
                          {props.currency.currencySymbol +
                            ' ' +
                            (props.hit.price && parseFloat(props.hit.price).toFixed(2))}
                        </div>
                      ) : (
                        <div>
                          <div className="priceWidthFlow1">
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <div
                                style={{
                                  textDecoration: 'line-through',
                                  marginRight: '8px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {props.currency.currencySymbol +
                                  ' ' +
                                  (props.hit.compare_at_price && parseFloat(props.hit.compare_at_price).toFixed(2))}
                              </div>
                              <div
                                style={{
                                  color: '#AD0020',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {props.currency.currencySymbol +
                                  ' ' +
                                  (props.hit.price && parseFloat(props.hit.price).toFixed(2))}
                              </div>
                            </div>
                          </div>
                          <div className="priceWidthFlow2">
                            <div style={{ display: 'flex' }}>
                              <div
                                style={{
                                  textDecoration: 'line-through',
                                  paddingRight: '8px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {props.currency.currencySymbol +
                                  ' ' +
                                  (props.hit.compare_at_price && parseFloat(props.hit.compare_at_price).toFixed(2))}
                              </div>
                              <div
                                style={{
                                  color: '#AD0020',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {props.currency.currencySymbol +
                                  ' ' +
                                  (props.hit.price && parseFloat(props.hit.price).toFixed(2))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <div style={{ height: '64px' }}>
                  <div className="productTitle">
                    <p>{capitalize.words(props.hit.title)}</p>
                  </div>

                  <div className="hoverProductDetailColorBox">
                    <p className="hoverProductDetailColorBoxTitle"></p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '0px',
                      }}
                    >
                      {colorSwatchElementState}
                      {moreThanAprrovedColorsState > 0 && (
                        <p className="extraColorsSwatch">+{moreThanAprrovedColorsState}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="productPriceBox custom_position_price" style={{ padding: '0' }}>
                  <div className="productPriceBoxInner">
                    {props.hit.compare_at_price == null ||
                      props.hit.compare_at_price < 1 ||
                      props.hit.compare_at_price == props.hit.price ? (
                      <div style={{ whiteSpace: 'nowrap', color: '#212121' }}>
                        {props.currency.currencySymbol +
                          ' ' +
                          (props.hit.price && parseFloat(props.hit.price).toFixed(2))}
                      </div>
                    ) : (
                      <div>
                        <div className="priceWidthFlow1">
                          <div
                            style={{
                              display: 'flex',
                            }}
                          >
                            <div
                              style={{
                                textDecoration: 'line-through',
                                marginTop: '4px',
                                marginLeft: '4px',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {props.currency.currencySymbol +
                                ' ' +
                                (props.hit.compare_at_price && parseFloat(props.hit.compare_at_price).toFixed(2))}
                            </div>
                            <div
                              style={{
                                color: '#AD0020',
                                marginTop: '4px',
                                marginLeft: '4px',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {props.currency.currencySymbol +
                                ' ' +
                                (props.hit.price && parseFloat(props.hit.price).toFixed(2))}
                            </div>
                          </div>
                        </div>

                        <div className="priceWidthFlow2">
                          <div style={{ display: 'flex' }}>
                            <div
                              style={{
                                textDecoration: 'line-through',
                                marginRight: '8px',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {props.currency.currencySymbol +
                                ' ' +
                                (props.hit.compare_at_price && parseFloat(props.hit.compare_at_price).toFixed(2))}
                            </div>
                            <div
                              style={{
                                color: '#AD0020',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {props.currency.currencySymbol +
                                ' ' +
                                (props.hit.price && parseFloat(props.hit.price).toFixed(2))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {openGiftPop == true ? <GiftPop callBack={popCloseCallBack} /> : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  myWishlist: state.myWishlist,
});

export default connect(mapStateToProps)(React.memo(CollectionSingleGrid));
