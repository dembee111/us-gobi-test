import React, { useEffect, useState } from 'react';
import './WishlistPage.scss';
import { Link, navigate } from 'gatsby';
import { connect } from 'react-redux';
import { addToCart, convertCurrency, formatPrice } from '../../components/shared/cart/CartHelpers';
import { removeFromWishlist } from './WishlistHelpers';
import Image from '../../components/shared/image';
import { productSizeParser } from '../ProductPage/ProductHelpers';

const Product = (props) => {
  const [variant, setVariant] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [isVariantDropdownOpen, setIsVariantDropdownOpen] = useState(false);
  const [variantDropdownStyle, setVariantDropdownStyle] = useState({});
  const [variantButtonStyle, setVariantButtonStyle] = useState({});
  const [dropdownName, setDropdownName] = useState('dropdown-down');
  const [isInCart, setIsInCart] = useState();
  const [giftCard, setGiftCard] = useState(false);

  function selectOption(variant) {
    setVariant(variant);
    closeVariantDropdown();
    variant &&
      variant.node &&
      variant.node.selectedOptions &&
      variant.node.selectedOptions.map((selectedOption) => {
        if (selectedOption.name === 'Size' || selectedOption.name === 'Denominations') {
          setSelectedSize(selectedOption.value);
        }
      });
  }

  function openVariantDropdown() {
    setIsVariantDropdownOpen(true);
  }

  function closeVariantDropdown() {
    setIsVariantDropdownOpen(false);
  }

  function toggleVariantDropdown() {
    setIsVariantDropdownOpen(!isVariantDropdownOpen);
  }

  useEffect(() => {
    for (const singleVariant of props.wishlistItem.variants.edges) {
      if (singleVariant.node.availableForSale) {
        setVariant(singleVariant);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (isVariantDropdownOpen) {
      setVariantDropdownStyle({
        display: 'block',
      });
      setDropdownName('dropdown-up');
      setVariantButtonStyle();
    } else {
      setVariantDropdownStyle({
        display: 'none',
      });
      setDropdownName('dropdown-down');
      setVariantButtonStyle();
    }
  }, [isVariantDropdownOpen]);

  useEffect(() => {
    if (
      props.checkout &&
      props.checkout.lineItems &&
      props.checkout.lineItems.edges &&
      props.wishlistItem &&
      props.wishlistItem.id !== undefined
    ) {
      let inCart = false;
      let size;
      for (let lineItem of props.checkout.lineItems.edges) {
        if (
          lineItem &&
          lineItem.node &&
          lineItem.node.variant &&
          lineItem.node.variant.product &&
          lineItem.node.variant.product.id === props.wishlistItem.id
        ) {
          inCart = true;
          lineItem.node.variant &&
            lineItem.node.variant &&
            lineItem.node.variant.selectedOptions &&
            lineItem.node.variant.selectedOptions.map((selectedOption) => {
              if (selectedOption.name === 'Size' || selectedOption.name === 'Denominations') {
                size = selectedOption.value;
              }
            });
        }
      }
      setSelectedSize(size);
      setIsInCart(inCart);
    }

    if (props.wishlistItem && props.wishlistItem.tags) {
      props.wishlistItem.tags.map((item) => {
        if (item.match(/^gift_card.*$/)) {
          setGiftCard(true);
        }
      });
    }
  }, [props.checkout, props.wishlistItem]);

  return (
    <div className="product-item">
      <div className="img-box">
        {props.wishlistItem.images.edges.length > 0 ? (
          <Link to={`/products/${props.wishlistItem.handle}`}>
            {isInCart ? (
              <div className="opaque-background">
                <div className="check-icon">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="white" />
                    <path
                      d="M27 12L14.625 24L9 18.5455"
                      stroke="#4F5255"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ) : null}
            <Image
              src={props.wishlistItem.images.edges[0].node.originalSrc}
              alt={props.wishlistItem.images.edges[0].node.altText}
            />
          </Link>
        ) : null}
        <div className="product-toggle">
          <a
            onClick={() => removeFromWishlist(atob(props.wishlistItem.id).replace('gid://shopify/Product/', ''))}
            aria-label="Remove from wishlist"
            className="product-toggle-icon"
          >
            <div className="icon-box">
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.6493 16.4528C10.2615 16.7626 9.70718 16.7626 9.3194 16.4528C6.56407 14.2512 0.292627 9.68585 1.06545 5.39656C1.616 2.13881 3.78149 1.04069 5.32302 1.00409C7.79228 0.915077 9.32108 2.30438 9.81171 2.83397C9.90199 2.93142 10.0667 2.93142 10.157 2.83397C10.6476 2.30438 12.1764 0.915077 14.6456 1.00409C16.1872 1.04069 18.3527 2.13881 18.9399 5.39656C19.6791 9.68585 13.4048 14.2513 10.6493 16.4528Z"
                  stroke="#4F5255"
                  fill="#4F5255"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
      <div className="product-detail">
        <div className="product-title">
          <p>{props.wishlistItem.title.toLowerCase()}</p>
        </div>
        {props.wishlistItem &&
        props.wishlistItem.variants &&
        props.wishlistItem.variants.edges &&
        props.wishlistItem.variants.edges[0] &&
        props.wishlistItem.variants.edges[0].node &&
        props.wishlistItem.variants.edges[0].node.presentmentPrices &&
        props.wishlistItem.variants.edges[0].node.presentmentPrices.edges &&
        props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0] &&
        props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0].node &&
        props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice &&
        props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0].node.price ? (
          <div className="prices">
            {props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount !==
            props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount ? (
              <div className="product-compare-at-price">
                {props.currency.currencySymbol}
                {formatPrice(
                  props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount,
                )}
              </div>
            ) : null}

            <div
              className="product-price"
              style={
                props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount !==
                props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount
                  ? {
                      color: '#ea4335',
                    }
                  : null
              }
            >
              {props.currency.currencySymbol}
              {formatPrice(props.wishlistItem.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount)}
            </div>
          </div>
        ) : null}

        <div className="product-size">
          <div className="grid__item">
            {variant ? (
              <div className="dropdown">
                <button
                  aria-label="Wishlist"
                  key="1"
                  className={'variant-input rounded-edges ' + dropdownName}
                  value={variant.node.id}
                  disabled={isInCart}
                  onClick={() => toggleVariantDropdown()}
                  style={variantButtonStyle}
                >
                  <div className="d-grid">
                    {giftCard
                      ? selectedSize
                        ? productSizeParser(selectedSize, props.gender)
                        : 'Select Amount'
                      : selectedSize
                      ? productSizeParser(selectedSize, props.gender)
                      : 'Select Size'}
                    {isInCart ? null : (
                      <div className="d-icon">
                        {isVariantDropdownOpen ? (
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 7L7 1L1 7" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0.999999L7 7L13 1" stroke="#4F5255" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </button>
                {isInCart ? null : (
                  <div className="options" style={variantDropdownStyle}>
                    {props.wishlistItem.variants.edges.map((singleVariant, index) => {
                      if (singleVariant.node.availableForSale) {
                        let size = '';
                        singleVariant &&
                          singleVariant.node &&
                          singleVariant.node.selectedOptions &&
                          singleVariant.node.selectedOptions.map((selectedOption) => {
                            if (selectedOption.name === 'Size' || selectedOption.name === 'Denominations') {
                              size = selectedOption.value;
                            }
                          });
                        return (
                          <div
                            key={index}
                            className="option"
                            value={singleVariant.node.id}
                            onClick={() => selectOption(singleVariant)}
                          >
                            {productSizeParser(size, props.gender)}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="product-cart">
          {isInCart ? (
            <button
              aria-label="Add to bag"
              disabled={!props.wishlistItem.availableForSale}
              onClick={() => {
                navigate('/cart');
              }}
              className="in-cart-button"
            >
              <span>In Cart</span>
            </button>
          ) : (
            <button
              aria-label="Add to bag"
              disabled={!props.wishlistItem.availableForSale}
              onClick={() => {
                if (selectedSize) {
                  convertCurrency().then((newGifts) => {
                    addToCart(variant ? variant.node : props.wishlistItem.variants.edges[0].node, props.wishlistItem);
                  });
                  setIsInCart(true);
                } else {
                  openVariantDropdown();
                }
              }}
              className="cart-btn"
            >
              <span>Add to cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currency: state.currency,
  checkout: state.checkout,
});

export default connect(mapStateToProps)(Product);
