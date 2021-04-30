import React from 'react';
import { updateQuantityInCart, isGiftCard } from './CartHelpers';

export default function ModifyQuantity(props) {
  const debounceInputChange = debounce(inputChange, 400);

  function inputChange(lineItem, quantity) {
    if (quantity && !isNaN(quantity)) {
      props.setHasExceededQuantity(updateQuantityInCart(lineItem, Number(quantity), props.gifts));
    }
  }

  function decrementQuantity(lineItem) {
    updateQuantityInCart(lineItem, lineItem.quantity - 1, props.gifts);
  }

  function incrementQuantity(lineItem) {
    updateQuantityInCart(lineItem, lineItem.quantity + 1, props.gifts);
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }
  if (props.isGiftItem) {
    return null;
  }
  return (
    <div className="grid grid--full display-table">
      <div className="grid__item display-table-cell">
        <div className="ajaxcart__quantity">
          <span className="quantity_tt">Quantity:</span>
          <div className="js-qty__wrapper" key={props.lineItem.node.quantity}>
            <label className="visually-hidden">Quantity</label>
            <input
              type="text"
              className="js-qty__num"
              defaultValue={props.lineItem.node.quantity}
              min="0"
              aria-label="quantity"
              pattern="[0-9]*"
              name="updates[]"
              onChange={(e) => debounceInputChange(props.lineItem.node)}
            />
          </div>
        </div>
        <div className="quantity_btn-list">
          <button
            type="button"
            className="quantity_btn"
            aria-label="Reduce item quantity by one"
            onClick={() => decrementQuantity(props.lineItem.node)}
          >
            <div className="icon">
              <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-0.000843644 0.792H5.99916V2.784H-0.000843644V0.792Z" fill="#4F5255" />
              </svg>
            </div>
          </button>
          <button
            type="button"
            className="quantity_btn"
            aria-label="Increase item quantity by one"
            onClick={() => incrementQuantity(props.lineItem.node)}
            disabled={
              props.lineItem.node.quantity >= props.lineItem.node.variant.quantityAvailable &&
              !isGiftCard(props.lineItem.node.variant.product)
            }
          >
            <div className="icon">
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.7831 7.836H6.94706V12.936H5.03906V7.836H0.227063V6.06H5.03906V0.983999H6.94706V6.06H11.7831V7.836Z"
                  fill="#4F5255"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
