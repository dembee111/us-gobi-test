import React from 'react';
import { productSizeParser } from '../../../customTemplates/ProductPage/ProductHelpers';
import './ModifySize.scss';

const ModifySize = ({ sizeCallBack, showSize, sizeSelectOption, ...props }) => {
  if (showSize) {
    return (
      <div className="gr_list size_change">
        <p className="tt">Size:</p>
        <div className={showSize ? 'change_size-title open' : 'change_size-title'}>
          <div className="background" />
          <span className="size_tt">{productSizeParser(props.size && props.size.toUpperCase(), props.gender)}</span>
          <div className="dropdown">
            <div className="options">
              {props.lineItem.node.variant.product.variants.edges.map((variant, index) => {
                let size = '';
                variant.node.selectedOptions.map((selectedOption) => {
                  if (selectedOption.name === 'Size') {
                    size = selectedOption.value;
                  }
                });
                if (variant && variant.node && variant.node.quantityAvailable > 0) {
                  return (
                    <div
                      key={index}
                      className="option"
                      value={variant.node.id}
                      onMouseUp={() => {
                        sizeSelectOption(props.lineItem.node, variant.node.id);
                      }}
                    >
                      {productSizeParser(size, props.gender)}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div aria-label="cancel change size" onClick={() => sizeCallBack(false)} className="change-link">
          Cancel
        </div>
      </div>
    );
  }
  // return (
  //   <div className="size">
  //     <div className="size-inner">
  //       <span>{props.size}</span>
  //       &nbsp;
  //       {props.lineItem.node.variant.product.variants.edges &&
  //         props.lineItem.node.variant.product.variants.edges.length > 1 ? (
  //           <div aria-label="change size button" onClick={() => sizeCallBack(true)} className="change-link">
  //             Change Size
  //           </div>
  //         ) : null}
  //     </div>
  //   </div>
  // );

  return (
    <div className="gr_list size_change">
      <div className="size_tt">
        <p className="tt">Size:</p>
        <div className="size-title">
          <span>{productSizeParser(props.size && props.size.toUpperCase(), props.gender)}</span>
        </div>
      </div>
      {props.lineItem.node.variant.product.variants.edges &&
      props.lineItem.node.variant.product.variants.edges.length > 1 ? (
        <div aria-label="change size button" onClick={() => sizeCallBack(true)} className="change-link">
          Change
        </div>
      ) : null}
    </div>
  );
};

export default ModifySize;
