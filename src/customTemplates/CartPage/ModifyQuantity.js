import React from 'react';
import { updateQuantityInCart, becomeOneVariant, isGiftCard } from '../../components/shared/cart/CartHelpers';

export default function ModifyQuantity(props) {

  // function decrementQuantity(lineItem) {
  //   updateQuantityInCart(lineItem, qty - 1);
  // }

  // function incrementQuantity(lineItem, quantity) {
  //   updateQuantityInCart(lineItem, quantity);
  // }

  const handleChangeQuantity = (e) => {
    updateQuantityInCart(props.lineItem.node, e.target.value);
  }

  if (props.isGiftItem) {
    return null;
  }

  function onSelectOption() {
    let options = []
    for (let i = 1; i <= props.lineItem.node.variant.quantityAvailable; i++) {
      if (i < 10) {
        options.push(<option key={i} selected={props.lineItem.node.quantity === i} value={i}>{i}</option>)
      }
    }
    return options
  }
  return (
    <div className="custom_select">
      <select aria-labelledby="quantity-select" defaultValue={props.lineItem.node.quantity} name="qty" onChange={handleChangeQuantity}>
        {onSelectOption()}
      </select>
      <div className="custom_select-icon">
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L13 1" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
