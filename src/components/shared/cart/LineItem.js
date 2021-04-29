import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  updateGiftVariant,
  updateSizeVariant,
  updateQuantityInCart,
  formatPrice,
  getMultiplyDecimal,
  isGiftSocks,
  addGiftToCart,
  removeGiftFromCart,
  isGiftCard,
  getGiftCardSalePrice,
  isFreeGiftCard,
  removeGiftCardFromCart,
  isGiftBox,
  removeFreeGiftBoxFromCart,
} from './CartHelpers';
import { addToWishlist } from '../../../customTemplates/WishlistPage/WishlistHelpers';
import ModifyQuantity from './ModifyQuantity';
import ModifyGiftOption from './ModifyGiftOption';
import ModifySize from './ModifySize';
import ModifyColor from './ModifyColor';
import ModifyGiftSize from './ModifyGiftSize';
import { Link } from 'gatsby';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const mapStateToProps = (state) => ({
  currency: state.currency,
  myWishlist: state.myWishlist,
});

export default connect(mapStateToProps)(LineItem);
function LineItem(props) {
  const basicLine = props.basicLine && props.basicLine;

  const [showChange, setShowChange] = useState();
  const [showSize, setShowSize] = useState();
  const [showGiftOptions, setShowGiftOptions] = useState();
  const [hasExceededQuantity, setHasExceededQuantity] = useState();

  useEffect(() => {
    if (hasExceededQuantity) {
      setTimeout(() => {
        setHasExceededQuantity(false);
      }, 3000);
    }
  }, [hasExceededQuantity]);

  const selectOption = (selectedVariant) => {
    colorCallBack(false);
    if (props.lineItem && props.lineItem.node && props.lineItem.node.variant && props.lineItem.node.variant.product) {
      //addGiftToCart(selectedVariant, props.lineItem.node.variant.product);
      updateSizeVariant(props.lineItem.node, selectedVariant.id);
    }
  };

  const colorCallBack = (val) => {
    setShowChange(val);
  };

  const giftSizeCallBack = (val) => {
    setShowSize(val);
  };

  const giftOptionCallBack = (val) => {
    setShowGiftOptions(val);
  };

  const sizeSelectOption = (lineItem, selectedVariant) => {
    sizeCallBack(false);
    updateSizeVariant(lineItem, selectedVariant);
  };

  const sizeCallBack = (val) => {
    setShowSize(val);
  };

  function removeItem(lineItem) {
    updateQuantityInCart(lineItem, 0);
  }

  const discountMultiplier = getMultiplyDecimal();

  const isSalePrice = () => {
    if (
      props.lineItem &&
      props.lineItem.node &&
      props.lineItem.node.variant &&
      props.lineItem.node.variant.presentmentPrices &&
      props.lineItem.node.variant.presentmentPrices.edges &&
      props.lineItem.node.variant.presentmentPrices.edges[0] &&
      props.lineItem.node.variant.presentmentPrices.edges[0].node &&
      props.lineItem.node.variant.presentmentPrices.edges[0].node
    ) {
      const rawPrice = props.lineItem.node.variant.presentmentPrices.edges[0].node.price;
      const rawCompPrice = props.lineItem.node.variant.presentmentPrices.edges[0].node.compareAtPrice;

      if (rawCompPrice != null && rawCompPrice.amount > 0 && rawCompPrice.amount != rawPrice.amount) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  };

  return (
    <div className="ajaxcart__product appear-animation appear-delay-3 non-gift">
      <div className="ajaxcart__row">
        <div className="grid product_box">
          <div className={props.giftCard ? 'grid__item lineitem-image giftCardImage' : 'grid__item lineitem-image'}>
            {props.isGiftItem || isFreeGiftCard(props.lineItem.node) ? (
              <div className="ajaxcart__product-image navigable">
                {props.lineItem &&
                props.lineItem.node &&
                props.lineItem.node.variant &&
                props.lineItem.node.variant.image &&
                props.lineItem.node.variant.image.src ? (
                  <img
                    alt={props.lineItem.node.variant.image.altText}
                    data-sizes="auto"
                    src={props.lineItem.node.variant.image.src.replace('.jpg', '_320x.jpg')}
                    data-src={props.lineItem.node.variant.image.src.replace('.jpg', '_320x.jpg')}
                    className="lazyload blur-up"
                  />
                ) : null}
              </div>
            ) : (
              <Link
                to={props.url}
                className="ajaxcart__product-image navigable"
                data-open-accessibility-text-original="16px"
              >
                {props.lineItem &&
                props.lineItem.node &&
                props.lineItem.node.variant &&
                props.lineItem.node.variant.image &&
                props.lineItem.node.variant.image.src ? (
                  <img
                    alt={props.lineItem.node.variant.image.altText}
                    data-sizes="auto"
                    src={props.lineItem.node.variant.image.src.replace('.jpg', '_320x.jpg')}
                    data-src={props.lineItem.node.variant.image.src.replace('.jpg', '_320x.jpg')}
                    className="lazyload blur-up"
                  />
                ) : null}
              </Link>
            )}
          </div>
          <div className="grid__item two-thirds">
            <div className="ajaxcart__product-name--wrapper">
              {props.isGiftItem || isFreeGiftCard(props.lineItem.node) ? (
                <div className="ajaxcart__product-name navigable">{props.lineItem.node.title.toLowerCase()}</div>
              ) : (
                <Link
                  to={props.url}
                  className="ajaxcart__product-name navigable"
                  data-open-accessibility-text-original="16px"
                >
                  {props.lineItem.node.title.toLowerCase()}
                </Link>
              )}
              {!props.isGiftItem && !isGiftCard(props.lineItem.node.variant.product) && isSalePrice() != null ? (
                <span className="ajaxcart__price" data-open-accessibility-text-original="13.6px">
                  {isSalePrice() == true ? (
                    <span className="compare-at-price">
                      {props.currency.currencySymbol}
                      {formatPrice(
                        props.lineItem.node.variant.presentmentPrices.edges[0].node.compareAtPrice.amount,
                      )}{' '}
                    </span>
                  ) : null}
                  {/* <span
                    className="so-unit-price"
                    data-open-accessibility-text-original="13.6px"
                    style={isSalePrice() == true ? { color: '#AD0020' } : null}
                  >
                    {props.currency.currencySymbol}
                    {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}
                  </span> */}
                  {basicLine.res === true ? (
                    <>
                      <span className="so-unit-price" style={{ marginLeft: '5px' }}>
                        {props.currency.currencySymbol}
                        <del>
                          {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}{' '}
                        </del>
                      </span>
                      &nbsp;
                      <span className="so-unit-price" style={{ color: '#AD0020' }}>
                        {props.currency.currencySymbol}
                        {'0.0'}{' '}
                      </span>
                    </>
                  ) : (
                    <span
                      className="so-unit-price"
                      data-open-accessibility-text-original="13.6px"
                      style={isSalePrice() == true ? { color: '#AD0020' } : null}
                    >
                      {props.currency.currencySymbol}
                      {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}
                    </span>
                  )}
                </span>
              ) : null}
              {(props.isGiftItem || isFreeGiftCard(props.lineItem.node)) &&
              props.lineItem &&
              props.lineItem.node &&
              props.lineItem.node.variant &&
              props.lineItem.node.variant.presentmentPrices &&
              props.lineItem.node.variant.presentmentPrices.edges &&
              props.lineItem.node.variant.presentmentPrices.edges[0] &&
              props.lineItem.node.variant.presentmentPrices.edges[0].node &&
              props.lineItem.node.variant.presentmentPrices.edges[0].node.price ? (
                <span className="ajaxcart__price">
                  {
                    <span className="compare-at-price">
                      {props.currency.currencySymbol}
                      {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}{' '}
                    </span>
                  }
                  <span className="so-unit-price" style={{ color: '#AD0020' }}>
                    {props.currency.currencySymbol}
                    {'0.00'}{' '}
                  </span>
                </span>
              ) : null}

              {isGiftCard(props.lineItem.node.variant.product) && !isFreeGiftCard(props.lineItem.node) ? (
                getGiftCardSalePrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount) ? (
                  <span className="ajaxcart__price">
                    {
                      <span className="compare-at-price">
                        {props.currency.currencySymbol}
                        {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}{' '}
                      </span>
                    }
                    <span className="so-unit-price" style={{ color: '#AD0020' }}>
                      {props.currency.currencySymbol}
                      {getGiftCardSalePrice(
                        props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount,
                      )}{' '}
                    </span>
                  </span>
                ) : (
                  <span className="so-unit-price">
                    {props.currency.currencySymbol}
                    {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}{' '}
                  </span>
                )
              ) : null}

              {props.lineItem.node &&
              props.lineItem.node.variant &&
              props.lineItem.node.variant.product &&
              !isGiftCard(props.lineItem.node.variant.product) ? (
                !props.isGiftItem ? (
                  <div className="color-title">
                    <span className="color-text">Color:</span>
                    <span className="ajaxcart__product-meta" data-open-accessibility-text-original="13.6px">
                      {props.color}
                    </span>
                  </div>
                ) : props.lineItem &&
                  props.lineItem.node &&
                  props.lineItem.node.variant &&
                  props.lineItem.node.variant.product &&
                  props.lineItem.node.variant.product.variants ? (
                  <ModifyColor
                    variants={props.lineItem.node.variant.product.variants}
                    color={props.color}
                    showChange={showChange}
                    colorCallBack={colorCallBack}
                    selectOption={selectOption}
                  />
                ) : null
              ) : null}
              {/* <span className="ajaxcart__product-meta" data-open-accessibility-text-original="13.6px">
                {props.lineItem.node.variant.title}
              </span> */}
              <div className="detail">
                {!props.isGiftItem &&
                props.lineItem &&
                props.lineItem.node &&
                props.lineItem.node.variant &&
                props.lineItem.node.variant.product &&
                !isGiftCard(props.lineItem.node.variant.product) &&
                !isFreeGiftCard(props.lineItem.node) ? (
                  <ModifySize
                    lineItem={props.lineItem}
                    size={props.size}
                    gender={props.gender}
                    showSize={showSize}
                    sizeCallBack={sizeCallBack}
                    sizeSelectOption={sizeSelectOption}
                  />
                ) : props.lineItem &&
                  props.lineItem.node &&
                  props.lineItem.node.variant &&
                  props.lineItem.node.variant.product &&
                  props.lineItem.node.variant.product.variants &&
                  (isGiftSocks(props.lineItem.node.variant.product) ||
                    (isGiftBox(props.lineItem.node) && props.isGiftItem)) ? (
                  <ModifyGiftSize
                    variants={props.lineItem.node.variant.product.variants}
                    size={props.size}
                    color={props.color}
                    showSize={showSize}
                    giftSizeCallBack={giftSizeCallBack}
                    selectOption={selectOption}
                  />
                ) : null}
              </div>
            </div>

            {props.lineItem && props.lineItem.node && !isFreeGiftCard(props.lineItem.node) ? (
              <ModifyQuantity
                isGiftItem={props.isGiftItem}
                lineItem={props.lineItem}
                setHasExceededQuantity={setHasExceededQuantity}
                basicLine={basicLine}
              />
            ) : null}
            {props.isGiftItem ? (
              <ModifyGiftOption
                giftOptionCallBack={giftOptionCallBack}
                showGiftOptions={showGiftOptions}
                selectOption={selectOption}
                giftOptions={props.giftOptions}
                gifts={props.gifts}
                slideIndex={props.slideIndex}
                lineItem={props.lineItem}
              />
            ) : null}

            {hasExceededQuantity ? (
              <div className="exceeded-error">
                There are only {props.lineItem.node.variant.quantityAvailable} product(s) available.
              </div>
            ) : null}

            {!props.isGiftItem && !isFreeGiftCard(props.lineItem.node) ? (
              props.myWishlist &&
              Array.isArray(props.myWishlist) &&
              props.myWishlist.includes(
                atob(props.lineItem.node.variant.product.id).replace('gid://shopify/Product/', ''),
              ) ? (
                <Link aria-label="Go to Wishlist" to="/wishlist" className="wishlist-button">
                  In Wishlist
                </Link>
              ) : (
                <button
                  aria-label="Move to Wishlist"
                  className="wishlist-button"
                  onClick={() =>
                    addToWishlist(
                      atob(props.lineItem.node.variant.product.id).replace('gid://shopify/Product/', ''),
                      props.lineItem.node.variant.id,
                    )
                  }
                >
                  Move To Wishlist
                </button>
              )
            ) : null}

            <div className="tc_remove-button">
              <span
                className="remove-button"
                aria-label="remove from cart"
                onClick={() => {
                  if (isFreeGiftCard(props.lineItem.node)) {
                    removeGiftCardFromCart();
                  } else if (props.isGiftItem && !isGiftBox(props.lineItem.node)) {
                    removeGiftFromCart();
                  } else if (props.isGiftItem && isGiftBox(props.lineItem.node)) {
                    removeFreeGiftBoxFromCart();
                  } else {
                    removeItem(props.lineItem.node);
                  }
                }}
              >
                remove
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
