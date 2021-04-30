import React, { useEffect, useState } from 'react';
import './ModifyGiftSize.scss';

const ModifyGiftSize = ({ giftSizeCallBack, showSize, selectOption, ...props }) => {
  const [sizes, setSizes] = useState();

  useEffect(() => {
    if (props.variants && props.variants.edges) {
      let sizesMap = {};

      for (let variant of props.variants.edges) {
        if (variant && variant.node && variant.node.availableForSale !== false) {
          let size = '';
          let color = '';
          variant.node.selectedOptions.map((selectedOption) => {
            if (selectedOption.name === 'Size') {
              size = selectedOption.value;
            } else if (selectedOption.name === 'Color') {
              color = selectedOption.value;
            }
          });
          if (color === props.color) {
            sizesMap[size] = variant;
          }
        }
      }
      setSizes(sizesMap);
    }
  }, [props.variants, props.color, props.size]);

  if (showSize && sizes && Object.keys(sizes) && Object.keys(sizes).length > 1) {
    return (
      <div key={'modify-size-' + showSize} className="tc_cs-size">
        <div className="tt">Size</div>
        <div className="size-inner">
          <div className="tc_change">
            {/* <div className="size-txt">{props.size}</div> */}
            <div className={showSize ? 'size-title open' : 'size-title'}>
              <div className="dropdown">
                <div className="options">
                  {sizes &&
                    Object.keys(sizes) &&
                    Object.keys(sizes).map((size, index) => {
                      return (
                        <div
                          key={index}
                          className="option"
                          value={size && sizes[size] && sizes[size].node && sizes[size].node.id}
                          onMouseUp={() => {
                            giftSizeCallBack(false);
                            selectOption(size && sizes[size] && sizes[size].node);
                          }}
                        >
                          {size}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div aria-label="cancel change size" onClick={() => giftSizeCallBack(false)} className="change-link">
              Cancel
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="tc_cs-size">
      <div className="size-inner">
        <div className="tt">Size</div>
        <div className="size-txt">{props.size}</div>
      </div>
      {sizes && Object.keys(sizes) && Object.keys(sizes).length > 1 ? (
        <div aria-label="change size button" onClick={() => giftSizeCallBack(true)} className="change-link">
          Change
        </div>
      ) : null}
    </div>
  );
};

export default ModifyGiftSize;
