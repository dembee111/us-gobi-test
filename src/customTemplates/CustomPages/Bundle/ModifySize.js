import React from 'react';
import { productSizeParser } from '../../ProductPage/ProductHelpers';

const ModifySize = ({ sizeSelectOption, product, gender, bundleIndex, ...props }) => {
  if (product.variants.edges && product.variants.edges.length > 1) {
    return (
      <div className="tc-product-size">
        <div className="p-size-title">
          <span>Select Size</span>
        </div>
        <div className="size-section">
          <ul className="sizeLists">
            {product.variants.edges.map((variant, index) => {
              let size = '';
              variant.node.selectedOptions.map((selectedOption) => {
                if (selectedOption.name === 'Size') {
                  size = selectedOption.value;
                }
              });
              if (variant && variant.node && variant.node.quantityAvailable > 0) {
                return (
                  <li key={index}>
                    <div
                      onClick={() => {
                        sizeSelectOption(variant.node, size, bundleIndex);
                      }}
                      className={size === props.size ? 'sizeBox' : ''}
                    >
                      <span>{productSizeParser(size, gender)}</span>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="size">
        <div className="size-inner">
          Size:
          <span>{productSizeParser(props.size, gender)}</span>
        </div>
      </div>
    );
  }
};

export default ModifySize;
