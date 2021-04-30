import React, { useState, useEffect } from 'react';
import Image from '../image';
import { getMaxAvailableVariant } from './CartHelpers';

const ModifyGiftOption = ({ giftOptionCallBack, showGiftOptions, selectOption, ...props }) => {
  const [options, setOptions] = useState();

  useEffect(() => {
    if (
      props.giftOptions &&
      props.slideIndex !== undefined &&
      props.giftOptions[props.slideIndex] &&
      props.lineItem &&
      props.lineItem.node &&
      props.lineItem.node.variant &&
      props.lineItem.node.variant.product
    ) {
      let gift = props.giftOptions[props.slideIndex];
      if (gift.giftIds) {
        for (let giftId of gift.giftIds) {
          let optionsArray = [];
          let isCurrentGift = false;
          let defaultGift = giftId.default;
          if (defaultGift) {
            if (defaultGift.id === props.lineItem.node.variant.product.id) {
              isCurrentGift = true;
            }
            if (defaultGift.availableForSale) optionsArray.push(defaultGift);
          }
          if (giftId.additional) {
            for (let additional of giftId.additional) {
              if (additional) {
                if (additional.id === props.lineItem.node.variant.product.id) {
                  isCurrentGift = true;
                }
                if (additional.availableForSale) optionsArray.push(additional);
              }
            }
          }
          if (isCurrentGift) setOptions(optionsArray);
        }
      }
    }
  }, [props.giftOptions, props.slideIndex, props.lineItem]);

  function selectGift(variants) {
    let maxVariant = getMaxAvailableVariant(variants);
    selectOption(maxVariant && maxVariant.id);
    giftOptionCallBack(false);
  }

  if (!options || options.length <= 1) {
    return null;
  } else if (showGiftOptions) {
    return (
      <div className="tc_gift-change">
        <div className="tt">Gift:</div>
        <div key={'modify-gift-option-' + showGiftOptions} className="gift-option">
          <div
            className="background"
            onClick={() => {
              giftOptionCallBack(false);
            }}
          />
          <div aria-label="cancel change gift" onClick={() => giftOptionCallBack(false)} className="change-link">
            Cancel
          </div>
          <div className="dropdown">
            <div className="options">
              <div className="gifts-title">
                <div className="choose-txt">Choose your gift</div>
              </div>
              {options &&
                options.map((giftOption, index) => {
                  if (giftOption && giftOption.availableForSale) {
                    return (
                      <div
                        key={index}
                        className="option gifts-option"
                        onMouseUp={() => {
                          selectGift(giftOption.variants.edges);
                        }}
                      >
                        <div className="img">
                          {giftOption.images &&
                          giftOption.images.edges &&
                          giftOption.images.edges[0] &&
                          giftOption.images.edges[0].node ? (
                            <Image
                              src={giftOption.images.edges[0].node.originalSrc}
                              altText={giftOption.images.edges[0].node.altText}
                            />
                          ) : null}
                        </div>
                        <div className="gift-title">{giftOption.title.toLowerCase()}</div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="tc_gift-change">
      <div className="tt">Gift:</div>
      <div className="color">
        <div className="color-inner">
          <div aria-label="change gift button" onClick={() => giftOptionCallBack(true)} className="change-link">
            Change
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyGiftOption;
