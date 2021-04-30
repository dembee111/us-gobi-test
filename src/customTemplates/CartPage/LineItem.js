import React, { useEffect, useState } from 'react';
import './CartPage.scss';
import { connect } from 'react-redux';
import {
  getGiftCardSalePrice,
  updateQuantityInCart,
  updateSizeVariant,
  formatPrice,
  getMultiplyDecimal,
  isGiftCard,
  isFiftyGiftCard,
  removeGiftFromCart,
  removeFreeGiftBoxFromCart,
  removeGiftCardFromCart,
  isFreeGiftCard,
  isGiftBox
} from '../../components/shared/cart/CartHelpers';
import { addToWishlist } from '../WishlistPage/WishlistHelpers';
import Image from '../../components/shared/image';
import ModifyQuantity from './ModifyQuantity';
import ModifySize from './ModifySize';
import { Link } from 'gatsby';


const LineItem = (props) => {
  const basicLine = props.basicLine && props.basicLine;
  const { setOptionBtn, optionBtn } = props

  const [showChange, setShowChange] = useState();

  function removeItem(lineItem) {

    updateQuantityInCart(lineItem, 0);
  }

  const selectOption = (lineItem, selectedVariant) => {
    sizeCallBack(false);
    updateSizeVariant(lineItem, selectedVariant);
  };

  const sizeCallBack = (val) => {
    setShowChange(val);
  };

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
  const capitalize = (str, lower = true) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
  ;

  return (
    <div className="list-box">
      <div className="img">
        {props.isGiftItem || isFiftyGiftCard(props.lineItem.node) ? (
          <div className="ajaxcart__product-image navigable">
            <Image src={props.lineItem.node.variant.image.src} alt={props.lineItem.node.variant.image.altText} />
          </div>
        ) : (
          <Link
            to={props.url}
            className="ajaxcart__product-image navigable"
            data-open-accessibility-text-original="16px"
          >
            <Image src={props.lineItem.node.variant.image.src} alt={props.lineItem.node.variant.image.altText} />
          </Link>
        )}
      </div>
      <div className="detail">
        <div className="top">
          {props.isGiftItem || isFiftyGiftCard(props.lineItem.node) ? (
            <p className="pr_tt">{capitalize(props.lineItem.node.title)}</p>
          ) : (
            <Link
              to={props.url}
            >
              <p className="pr_tt">{capitalize(props.lineItem.node.title)}</p>
            </Link>
          )}
          <div className="price mobile">
            {!props.isGiftItem && isSalePrice() !== null && !isFiftyGiftCard(props.lineItem.node) ? (
              <div className="price-box">
                {isSalePrice() == true ? (
                  <>
                    <p className="sale-price">
                      {props.currency.currencySymbol}
                      {formatPrice(
                        props.lineItem.node.variant.presentmentPrices.edges[0].node.compareAtPrice.amount,
                      )}
                    </p>
                    <p className="price-default sale">
                      {props.currency.currencySymbol}
                      {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}
                    </p>
                  </>
                ) : (
                  isGiftCard(props.lineItem.node.variant.product) ?
                    getGiftCardSalePrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount) ?
                      <>
                        <p className="sale-price">
                          {props.currency.currencySymbol}
                          {formatPrice(
                            props.lineItem.node.variant.presentmentPrices.edges[0].node.compareAtPrice.amount,
                          )}
                        </p>
                        <p className="price-default sale">
                          {props.currency.currencySymbol}
                          {getGiftCardSalePrice(
                            props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount,
                          )}
                        </p>
                      </>
                      :
                      < p className="price-default">
                        {props.currency.currencySymbol}
                        {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}
                      </p>
                    :
                    <p className="price-default">
                      {props.currency.currencySymbol}
                      {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}
                    </p>
                )}
              </div>
            ) : (
              <div className="price-box">
                <p className="sale-price">
                  {props.currency.currencySymbol}
                  {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}{' '}
                </p>
                <p className="price-default sale">
                  {props.currency.currencySymbol}
                  {"0.00"}
                </p>
              </div>
            )}
          </div>
          <div className="color">
            {props.lineItem.node &&
              props.lineItem.node.variant &&
              props.lineItem.node.variant.product &&
              !isGiftCard(props.lineItem.node.variant.product) &&
              !isFiftyGiftCard(props.lineItem.node) ? (
              <>
                <p className="color-tt">Color</p>
                <div className="color-text">{capitalize(props.color)}</div>
              </>
            ) : null}
          </div>
          <div className="size_quantity">
            {!isGiftCard(props.lineItem.node.variant.product) && (
              <ModifySize
                lineItem={props.lineItem}
                size={props.size}
                gender={props.gender}
                showChange={showChange}
                sizeCallBack={sizeCallBack}
                selectOption={selectOption}
              />
            )}
            {!props.isGiftItem && !isGiftCard(props.lineItem.node.variant.product) ? (
              <div className="quantity">
                <label id="quantity-select" className="quantity-tt">
                  Quantity
              </label>
                <ModifyQuantity isGiftItem={props.isGiftItem} lineItem={props.lineItem} />
              </div>
            ) : (
              <div className="quantity">
                <label id="quantity-select" className="quantity-tt">
                  Quantity
              </label>
                <div className="custom_select">
                  <select aria-labelledby="quantity-select" name="qty">
                    <option defaultValue value="1">1</option>
                  </select>
                  <div className="custom_select-icon">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L13 1" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
        <div className="bottom">
          {!props.isGiftItem ? (
            <div className="wish_remove">
              <div className="wish-btn">
                {props.myWishlist &&
                  Array.isArray(props.myWishlist) &&
                  props.myWishlist.includes(
                    atob(props.lineItem.node.variant.product.id).replace('gid://shopify/Product/', ''),
                  ) ? (
                  <Link aria-label="Go to Wishlist"
                    className="wish-btn-link" to="/wishlist">
                    In Wishlist
                  </Link>
                ) : (
                  <button
                    className="wish-btn-custom"
                    onClick={() =>
                      addToWishlist(
                        atob(props.lineItem.node.variant.product.id).replace('gid://shopify/Product/', ''),
                        props.lineItem.node.variant.id,
                      )
                    }
                  >
                    Move To Wishlist
                  </button>
                )}
              </div>
              <div className="remove-btn">
                <button className="remove-btn-custom"
                  onClick={() => {
                    if (isFiftyGiftCard(props.lineItem.node)) {
                      removeGiftCardFromCart();
                    } else if (props.isGiftItem) {
                      removeGiftFromCart(props.lineItem);
                    } else {
                      removeItem(props.lineItem.node);
                    }
                  }}
                >Remove</button>
              </div>
            </div>
          ) : (
            <div className="wish_remove">
              <div className="remove-btn">
                <button className="remove-btn-custom"
                  onClick={() => {
                    if (isFiftyGiftCard(props.lineItem.node)) {
                      removeGiftCardFromCart();
                    } else if (props.isGiftItem && !isGiftBox(props.lineItem.node)) {
                      removeGiftFromCart(props.lineItem.node);
                    } else if (props.isGiftItem && isGiftBox(props.lineItem.node)) {
                      removeFreeGiftBoxFromCart();
                    } else {
                      removeItem(props.lineItem.node);
                    }
                  }}>Remove</button>
              </div>
            </div>
          )}

          {!props.isGiftItem ? (
            <div className="wish_remove mobile">
              <div className="more-option" onClick={() => setOptionBtn(true)}>
                More Options
              </div>
              <div className={`openButton-list ${optionBtn ? 'open' : ''}`}>
                <div className="fixed_wish-btn">
                  {!isFiftyGiftCard(props.lineItem.node) ? (
                    props.myWishlist &&
                      Array.isArray(props.myWishlist) &&
                      props.myWishlist.includes(
                        atob(props.lineItem.node.variant.product.id).replace('gid://shopify/Product/', ''),
                      ) ? (
                      <Link aria-label="Go to Wishlist"
                        className="btn_link-cus" to="/wishlist">
                        In Wishlist
                      </Link>
                    ) : (
                      <button
                        className="btn-custom"
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
                </div>
                <div className="fixed_remove-btn">
                  <button className="btn-custom"
                    onClick={() => {
                      if (isFiftyGiftCard(props.lineItem.node)) {
                        removeGiftCardFromCart();
                      } else if (props.isGiftItem && !isGiftBox(props.lineItem.node)) {
                        removeGiftFromCart(props.lineItem.node);
                      } else if (props.isGiftItem && isGiftBox(props.lineItem.node)) {
                        removeFreeGiftBoxFromCart();
                      } else {
                        removeItem(props.lineItem.node);
                      }
                    }}>Remove</button>
                </div>
                <div className="cancel-btn" onClick={() => setOptionBtn(false)}>
                  cancel
                </div>
              </div>
            </div>
          ) : null}

        </div>
      </div>

      <div className="price">
        {!props.isGiftItem && isSalePrice() !== null && !isFiftyGiftCard(props.lineItem.node) ? (
          <div className="price-box">
            {isSalePrice() == true ? (
              <>
                <p className="sale-price">
                  {props.currency.currencySymbol}
                  {formatPrice(
                    props.lineItem.node.variant.presentmentPrices.edges[0].node.compareAtPrice.amount,
                  )}
                </p>
                <p className="price-default sale">
                  {props.currency.currencySymbol}
                  {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}
                </p>
              </>
            ) : (
              isGiftCard(props.lineItem.node.variant.product) ?
                getGiftCardSalePrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount) ?
                  <>
                    <p className="sale-price">
                      {props.currency.currencySymbol}
                      {formatPrice(
                        props.lineItem.node.variant.presentmentPrices.edges[0].node.compareAtPrice.amount,
                      )}
                    </p>
                    <p className="price-default sale">
                      {props.currency.currencySymbol}
                      {getGiftCardSalePrice(
                        props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount,
                      )}
                    </p>
                  </>
                  :
                  < p className="price-default">
                    {props.currency.currencySymbol}
                    {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}
                  </p>
                :
                <p className="price-default">
                  {props.currency.currencySymbol}
                  {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}
                </p>
            )}
          </div>
        ) : (
          <div className="price-box">
            <p className="sale-price">
              {props.currency.currencySymbol}
              {formatPrice(props.lineItem.node.variant.presentmentPrices.edges[0].node.price.amount)}{' '}
            </p>
            <p className="price-default sale">
              {props.currency.currencySymbol}
              {"0.00"}
            </p>
          </div>
        )}
      </div>

    </div >
  );
};

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
  myWishlist: state.myWishlist,
});

export default connect(mapStateToProps)(LineItem);
