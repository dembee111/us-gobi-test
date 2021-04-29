import React from 'react';
import './CartPage.scss';
import { connect } from 'react-redux';
import LineItem from './LineItem';

export default function LineItems(props) {

  if (props.isGiftItem) {
    return (
      <LineItem
        key={props.key}
        isGiftItem={props.isGiftItem}
        lineItem={props.lineItem}
        url={props.url}
        color={props.color}
        size={props.size}
        gender={props.gender}
        currency={props.currency}
      />
    )
  } else {
    return (
      <LineItem
        key={props.key}
        isGiftItem={props.isGiftItem}
        lineItem={props.lineItem}
        url={props.url}
        color={props.color}
        size={props.size}
        gender={props.gender}
        currency={props.currency}
      />
    )
  }

}