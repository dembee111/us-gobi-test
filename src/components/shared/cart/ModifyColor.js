import React, { useState, useEffect } from 'react';
import { getMaxAvailableVariant } from './CartHelpers';
import './ModifyColor.scss';

const ModifyColor = ({ colorCallBack, showChange, selectOption, ...props }) => {
  const [colors, setColors] = useState();

  useEffect(() => {
    if (props.variants && props.variants.edges) {
      let colorsMap = {};

      for (let variant of props.variants.edges) {
        if (variant && variant.node && variant.node.availableForSale !== false) {
          let color = '';
          variant.node.selectedOptions.map((selectedOption) => {
            if (selectedOption.name === 'Color') {
              color = selectedOption.value;
            }
          });
          if (colorsMap[color] && Array.isArray(colorsMap[color])) {
            colorsMap[color].push(variant);
          } else {
            colorsMap[color] = [variant];
          }
        }
      }
      setColors(colorsMap);
    }
  }, [props.variants]);

  if (!props.color) return null;

  if (showChange) {
    return (
      <div key={'modify-color-' + showChange} className="gr_list">
        <div
          className="background"
          onClick={() => {
            colorCallBack(false);
          }}
        />
        <p className="tt">Color</p>
        <div className="tc_change open">
          <span className="color_tt">{props.color}</span>
          <div className="dropdown">
            <div className="options">
              <div className="colors-title">
                <div className="choose-txt">Choose your color</div>
                {/* <div className="color-txt">{props.color && props.color.toUpperCase()}</div> */}
              </div>
              {colors &&
                Object.keys(colors) &&
                Object.keys(colors).map((color, index) => {
                  let maxVariant = getMaxAvailableVariant(colors[color]);
                  if (maxVariant && maxVariant.quantityAvailable > 0) {
                    return (
                      <div
                        key={index}
                        className={props.color && props.color === color ? 'option active' : 'option'}
                        value={maxVariant && maxVariant.id}
                        onMouseUp={() => {
                          selectOption(maxVariant);
                        }}
                      >
                        <div className="color-circle">
                          <div
                            className="color_back"
                            style={{
                              backgroundImage: `url(https://cdn.shopify.com/s/files/1/1953/2845/t/95/assets/${color.replace(
                                ' ',
                                '-',
                              )}_15x.png?v=)`,
                            }}
                          />
                        </div>
                        <span className="color_option">{color}</span>
                      </div>
                    );
                  } else return null;
                })}
            </div>
          </div>
          <div aria-label="cancel change color" onClick={() => colorCallBack(false)} className="change-link">
            Cancel
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="gr_list gift_color">
      <p className="tt">Color</p>
      <div className="tc_change">
        <span className="color_tt">{props.color}</span>
      </div>
      {colors && Object.keys(colors) && Object.keys(colors).length > 1 ? (
        <div className="tc_color">
          <div className="color-inner">
            <div aria-label="change color button" onClick={() => colorCallBack(true)} className="change-link">
              Change
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ModifyColor;
