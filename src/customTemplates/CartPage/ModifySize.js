import React, { useEffect, useState } from 'react';
import { productSizeParser } from '../../customTemplates/ProductPage/ProductHelpers';

const ModifySize = ({ sizeCallBack, showChange, selectOption, ...props }) => {

  function changeSelectedOption(event) {
    selectOption(props.lineItem.node, event.target.value)
  }

  return (
    <div className="size">
      <label id="size-select" className="size-tt">
        Size
      </label>
      <div className="custom_select">
        <select aria-labelledby="size-select" onChange={(event) => changeSelectedOption(event)}>
          {props.lineItem.node.variant.product.variants.edges.map((variant, index) => {
            let size = '';
            variant.node.selectedOptions.map((selectedOption) => {
              if (selectedOption.name === 'Size') {
                size = selectedOption.value;
              }
            });
            if (variant && variant.node && variant.node.quantityAvailable > 0) {
              return (
                <option key={index} selected={size === props.size} value={variant.node.id} >{productSizeParser(size, props.gender)}</option>
              );
            }
          })}
        </select>
        <div className="custom_select-icon">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>

  );
};

export default ModifySize;
