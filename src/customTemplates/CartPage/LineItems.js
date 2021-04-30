import React from 'react';
import './CartPage.scss';
import { connect } from 'react-redux';
import LineItem from './LineItem';

export default function LineItems(props) {

  if (props.isGiftItem) {
    return (
      <LineItem
        isGiftItem={props.isGiftItem}
        lineItem={props.lineItem}
        url={props.url}
        color={props.color}
        size={props.size}
        gender={props.gender}
        currency={props.currency}
        optionBtn={props.optionBtn}
        setOptionBtn={props.setOptionBtn}
      />
    )
  } else {
    return (
      <LineItem
        isGiftItem={props.isGiftItem}
        lineItem={props.lineItem}
        url={props.url}
        color={props.color}
        size={props.size}
        gender={props.gender}
        currency={props.currency}
        optionBtn={props.optionBtn}
        setOptionBtn={props.setOptionBtn}
      />
    )
  }

}