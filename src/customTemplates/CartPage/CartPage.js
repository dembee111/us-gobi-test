import React, { useState, useEffect } from 'react';
import './CartPage.scss';
import { allPagesEvent } from '../../components/shared/dataLayer/index';
import { connect } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { Link } from 'gatsby';
import LineItems from './LineItems';
import { qtyCount } from '../../components/shared/cart/CartHelpers';
import { formatPrice, handleCheckBasicCollection, isGift, hasGiftScarf, handleCheckPrice, hasGiftBox, handleCheckGift } from '../../components/shared/cart/CartHelpers';
import GiftOptions from './GiftOptions';
import { getProductGender, productSizeParser } from '../ProductPage/ProductHelpers';
import { getGiftProducts } from '../../components/shared/query/query';
import SideDrawer from "./SideDrawer"
import SideDrawer1 from "./SideDrawer1"
import { getGiftBox } from '../../components/shared/query/query';

const initialDeals = {
  giftbox: {
    isOpen: true,
    handle: "luxury-gift-box-1",
    giftTag: "giftshawl",
    selectedTag: "pshawl",
    product: []
  },
  giftshawl: {
    isOpen: true,
    id: [4450903294010, 4562323996730],
    giftTag: "giftshawl",
    selectedTag: "dressskirt",
    product: []
  }
}
const Cart = (props) => {

  const edges = props.checkout.lineItems.edges || [];

  let giftboxImage = "https://cdn.shopify.com/s/files/1/0098/6044/8292/files/giftbox-pic.png?v=1619688976"
  let giftscarfImage = "https://cdn.shopify.com/s/files/1/0098/6044/8292/files/giftscarf-us.png?v=1619689189"
  const [getGiftBoxQuery, { data: getGiftBoxData, error: getGiftBoxError }] = useLazyQuery(getGiftBox, {
    errorPolicy: 'all',
  });
  function goToCheckout() {
    window.location.assign(props.checkout.webUrl);
  }



  const [deals, setDeals] = useState(initialDeals);

  const [optionBtn, setOptionBtn] = useState(false);
  const [getGiftProductsQuery, { data: getGiftProductSuccess, error: getGiftProductError }] = useLazyQuery(getGiftProducts);
  const [rightSide, setRightSide] = useState(false);
  const [rightSide1, setRightSide1] = useState(false);

  useEffect(() => {
    getGiftProductsQuery({
      variables: {
        productIds: deals.giftshawl.id.map((product) => btoa(`gid://shopify/Product/${product}`)),
        currencyCode: props.currency.currencyCode,
      },
    })
  }, []);

  useEffect(() => {
    if (getGiftProductError) {
      console.log("")
    }
    if (getGiftProductSuccess) {
      let datas = getGiftProductSuccess.nodes
      let tur = deals
      tur.giftshawl.product = datas
      setDeals(tur)
    }
  }, [getGiftProductSuccess, getGiftProductError])

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
    } else if (getGiftBoxData) {
      let datas = getGiftBoxData.productByHandle
      let tur = deals
      tur.giftbox.product = [datas]
      setDeals(tur)
    }
  }, [getGiftBoxData, getGiftBoxError]);

  useEffect(() => {
    allPagesEvent();
  }, [typeof window !== `undefined` && window && window.dataLayer]);

  useEffect(() => {
    if (rightSide === true) {
      document.body.classList.add('tc-over-hidden');
    } else {
      document.body.classList.remove('tc-over-hidden');
    }
  }, [rightSide]);

  useEffect(() => {
    if (rightSide1 === true) {
      document.body.classList.add('tc-over-hidden');
    } else {
      document.body.classList.remove('tc-over-hidden');
    }
  }, [rightSide1]);

  // let giftBox = handleCheckPrice(deals)

  // let shawlResult = handleCheckGift(deals.giftbox.selectedTag)

  function allCheckoutLineItems() {
    let list = []
    props.checkout && props.checkout.lineItems && props.checkout.lineItems.edges && props.checkout.lineItems.edges.map((lineItem, index) => {
      let basicLine = handleCheckBasicCollection(lineItem, index);

      let size = '';
      let color = '';
      let gender = '';
      let url = '';

      if (lineItem.node.variant && lineItem.node.variant.product) {
        url = `/products/${lineItem.node.variant.product.handle}`;
        lineItem.node.variant.product.tags.map((tag) => {
          tag = getProductGender(tag);

          if (tag) {
            gender = tag;
          }
        });
      }
      lineItem.node.variant &&
        lineItem.node.variant.selectedOptions &&
        lineItem.node.variant.selectedOptions.map((selectedOption) => {
          if (selectedOption.name === 'Size') {
            size = selectedOption.value;
          } else if (selectedOption.name === 'Color') {
            color = selectedOption.value;
          }
        });

      const isGiftItem = isGift(lineItem);

      list.push(
        < LineItems
          key={index}
          isGiftItem={isGiftItem}
          lineItem={lineItem}
          url={url}
          color={color}
          size={size}
          gender={gender}
          currency={props.currency}
          basicLine={basicLine}
          optionBtn={optionBtn}
          setOptionBtn={setOptionBtn}
        />
      )
    })
    return list
  }

  return (
    <div className="tc_cart">
      <div className="tc_cart-container">
        <div className="tc_cart-products">
          <div className="title-section">
            <div className="title_count">
              <h1 className="bg_tt">Shopping Bag</h1>
              <div className="count">({qtyCount()})</div>
              <div className="count_total-M">
                <div className="count-M">2 items</div>
                <div className="title-total">$ 378.00</div>
              </div>
            </div>
            <div className="continue-shop">
              <Link className="continue-shop-link" to="/collections/new">
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="product-list">
            {allCheckoutLineItems()}
          </div>

          {props.checkout &&
            props.checkout.lineItems &&
            props.checkout.lineItems.edges &&
            !hasGiftScarf(props.checkout.lineItems.edges) &&
            Number(props.checkout.subtotalPriceV2.amount) >= 79 && <GiftOptions title={"Gift Scarf"} desc={"Add a gift scarf"} giftImage={giftscarfImage} setRightSide={setRightSide} />}
          <br />
          {props.checkout &&
            props.checkout.lineItems &&
            props.checkout.lineItems.edges &&
            !hasGiftBox(props.checkout.lineItems.edges) &&
            Number(props.checkout.subtotalPriceV2.amount) > 199 && (
              <GiftOptions title={"Gift box"} desc={"Add a gift box"} giftImage={giftboxImage} setRightSide={setRightSide1} />
            )}
        </div>
        <div className="tc_cart-order">
          <div className="order_box">
            <p className="tt">Order Summary</p>
            <div className="sub_detail">
              <div className="list">
                <p className="sub_tt">Subtotal</p>
                <p className="sub_price">
                  {props.currency.currencySymbol}
                  {formatPrice(props.checkout.subtotalPriceV2.amount)}
                </p>
              </div>
              <div className="list">
                <p className="sub_tt">Shipping</p>
                <p className="sub_price">-</p>
              </div>
            </div>
            <div className="total">
              <p className="total_tt">Total</p>
              <p className="total_price">
                {props.currency.currencySymbol}
                {formatPrice(props.checkout.subtotalPriceV2.amount)}
              </p>
            </div>
            <div className="button_box">
              <div className="text">
                <p>
                  By checking out, I agree to the{' '}
                  <Link to="/pages/terms-of-service/">General Terms and Conditions</Link> and acknowledge that I have
                  read the <Link to="/pages/privacy-policy/">Privacy Policy.</Link>
                </p>
              </div>
              <div className="secure_payment">
                <div className="icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.6667 6H2.33333C1.59695 6 1 6.56982 1 7.27273V11.7273C1 12.4302 1.59695 13 2.33333 13H11.6667C12.403 13 13 12.4302 13 11.7273V7.27273C13 6.56982 12.403 6 11.6667 6Z"
                      stroke="#282828"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 6V3.77778C4 3.04107 4.31607 2.33453 4.87868 1.81359C5.44129 1.29266 6.20435 1 7 1C7.79565 1 8.55871 1.29266 9.12132 1.81359C9.68393 2.33453 10 3.04107 10 3.77778V6"
                      stroke="#282828"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Secure Payment</span>
              </div>
              <div className="button">
                <button onClick={goToCheckout} className="checkout_btn"
                  disabled={!props.checkout || edges.length === 0}>checkout</button>
              </div>
              <div className={`button mobile ${optionBtn ? 'dl-none' : ''}`}>
                <button onClick={goToCheckout} className="checkout_btn"
                  disabled={!props.checkout || edges.length === 0}>checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <SideDrawer
        products={deals.giftshawl.product}
        rightSide={rightSide}
        setRightSide={setRightSide}
      />
      <SideDrawer1
        products={deals.giftbox.product}
        rightSide={rightSide1}
        setRightSide={setRightSide1}
      />

    </div>
  );
};

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
  customer: state.customer,
});

export default connect(mapStateToProps)(Cart);