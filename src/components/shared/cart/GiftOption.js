import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModifyColor from './ModifyColor';
import ModifyGiftSize from './ModifyGiftSize';
import {
  addGiftToCart,
  isGiftSocks,
  updateGiftVariant,
  removeGiftFromCart,
  getMaxAvailableVariant,
  formatPrice,
} from './CartHelpers';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
});
export default connect(mapStateToProps)(GiftSection);

function GiftSection(props) {
  const [showChange, setShowChange] = useState();
  const [showSize, setShowSize] = useState();
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [selectedGift, setSelectedGift] = useState();
  const [giftInCart, setGiftInCart] = useState();

  const selectOption = (selectedVariant) => {
    colorCallBack(false);
    if (giftInCart) {
      addGiftToCart(selectedVariant, props.giftCollected);
    } else {
      // if (
      //     props.additionalGift &&
      //     props.additionalGift.node &&
      //     props.additionalGift.node.variant &&
      //     props.additionalGift.node.variant.id
      // ) {
      //     updateGiftVariant([selectedVariant, props.additionalGift.node.variant.id]);
      // } else {
      //     updateGiftVariant([selectedVariant]);
      // }
      setSelectedGift(selectedVariant);
    }
  };

  const colorCallBack = (val) => {
    setShowChange(val);
  };

  const giftSizeCallBack = (val) => {
    setShowSize(val);
  };

  const giftSlideConfig = {
    slidesPerView: 'auto',
    spaceBetween: 4,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
    },
    navigation: false,
  };

  useEffect(() => {
    let gift;
    if (props.checkout && props.checkout.lineItems && props.checkout.lineItems.edges) {
      for (let lineItem of props.checkout.lineItems.edges) {
        if (
          lineItem.node &&
          lineItem.node.variant &&
          lineItem.node.variant.product &&
          lineItem.node.variant.product.id &&
          props.giftCollected
        ) {
          if (lineItem.node.variant.product.id === props.giftCollected.id) {
            gift = lineItem.node.variant;
          }
        }
      }
    }
    if (!gift && props.giftCollected && props.giftCollected.variants && props.giftCollected.variants.edges) {
      let maxVariant = getMaxAvailableVariant(props.giftCollected.variants.edges);
      setSelectedGift(maxVariant);
      if (props.setIsGiftAdded) props.setIsGiftAdded(false);
      setGiftInCart();
    } else {
      setSelectedGift(gift);
      setGiftInCart(gift);
      if (props.setIsGiftAdded) props.setIsGiftAdded(true);
    }
  }, [props.checkout, props.giftCollected]);

  useEffect(() => {
    if (selectedGift) {
      selectedGift.selectedOptions &&
        selectedGift.selectedOptions.map((selectedOption) => {
          if (selectedOption.name === 'Color') {
            setColor(selectedOption.value);
          } else if (selectedOption.name === 'Size') {
            setSize(selectedOption.value);
          }
        });
    }
  }, [selectedGift]);

  if (props.giftCollected) {
    if (props.isMini) {
      return (
        <div className="one_box">
          <div className="detail">
            {giftInCart && selectedGift && giftInCart.id === selectedGift.id ? (
              <div className="gift_button">
                <button className="remove_button" onClick={() => removeGiftFromCart()}>
                  <span>Added</span>
                </button>
              </div>
            ) : (
              <div className="gift_button">
                <button className="add_button" onClick={() => addGiftToCart(selectedGift, props.giftCollected)}>
                  <span>Add</span>
                </button>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="one_box">
          {selectedGift && selectedGift.image && selectedGift.image.src ? (
            <div className="img">
              <img src={selectedGift.image.src} alt={selectedGift.image.altText} />
            </div>
          ) : null}
          <div className="detail">
            <span className="tt_link" to={`/products/${props.giftCollected.handle}`}>
              <h1>{props.giftCollected.title}</h1>
            </span>
            {selectedGift &&
            selectedGift.presentmentPrices &&
            selectedGift.presentmentPrices.edges &&
            selectedGift.presentmentPrices.edges[0] &&
            selectedGift.presentmentPrices.edges[0].node &&
            selectedGift.presentmentPrices.edges[0].node.price &&
            props.currency ? (
              <span className="gift_price">
                {
                  <span className="compare-at-price">
                    {props.currency.currencySymbol}
                    {formatPrice(selectedGift.presentmentPrices.edges[0].node.price.amount)}{' '}
                  </span>
                }
                <span className="so-unit-price" style={{ color: '#AD0020' }}>
                  {props.currency.currencySymbol}
                  {'0.00'}
                </span>
              </span>
            ) : null}
            <ModifyColor
              variants={props.giftCollected.variants}
              color={color}
              showChange={showChange}
              colorCallBack={colorCallBack}
              selectOption={selectOption}
            />
            {isGiftSocks(props.giftCollected) ? (
              <ModifyGiftSize
                variants={props.giftCollected.variants}
                size={size}
                color={color}
                showSize={showSize}
                giftSizeCallBack={giftSizeCallBack}
                selectOption={selectOption}
              />
            ) : null}

            {giftInCart && selectedGift && giftInCart.id === selectedGift.id ? (
              <div className="gift_button">
                <button className="remove_button" onClick={() => removeGiftFromCart()}>
                  <span>Added</span>
                </button>
                <div className="tc_remove-button">
                  <span className="remove-button" aria-label="remove from cart" onClick={() => removeGiftFromCart()}>
                    remove
                  </span>
                </div>
              </div>
            ) : (
              <div className="gift_button">
                <button className="add_button" onClick={() => addGiftToCart(selectedGift, props.giftCollected)}>
                  <span>Add</span>
                </button>
              </div>
            )}
          </div>
        </div>

        // <div className="many_gift">
        //   <div className="gift_list">
        //     <div className="box">
        //       {selectedGift && selectedGift.image && selectedGift.image.src ? (
        //         <div className="img">
        //           <img src={selectedGift.image.src} alt={selectedGift.image.altText} />
        //         </div>
        //       ) : null}
        //       <div className="detail">
        //         <Link className="tt_link" to={`/products/${props.giftCollected.handle}`}>
        //           <h1>{props.giftCollected.title}</h1>
        //         </Link>
        //         <ModifyColor
        //           variants={props.giftCollected.variants}
        //           color={color}
        //           showChange={showChange}
        //           colorCallBack={colorCallBack}
        //           selectOption={selectOption}
        //         />
        //         {isGiftSocks(props.giftCollected) ? (
        //           <ModifyGiftSize
        //             variants={props.giftCollected.variants}
        //             size={size}
        //             color={color}
        //             showSize={showSize}
        //             giftSizeCallBack={giftSizeCallBack}
        //             selectOption={selectOption}
        //           />
        //         ) : null}

        //         {giftInCart && selectedGift && giftInCart.id === selectedGift.id ? (
        //           <div className="gift_button">
        //             <button className="remove_button" onClick={() => removeGiftFromCart()}>
        //               <span>Added</span>
        //             </button>
        //             <div className="tc_remove-button">
        //               <span className="remove-button" aria-label="remove from cart" onClick={() => removeGiftFromCart()}>
        //                 remove
        //               </span>
        //             </div>
        //           </div>
        //         ) : (
        //           <div className="gift_button">
        //             <button className="add_button" onClick={() => addGiftToCart(selectedGift, props.giftCollected)}>
        //               <span>Add</span>
        //             </button>
        //           </div>
        //         )}
        //       </div>
        //     </div>
        //     <div className="box">
        //       {selectedGift && selectedGift.image && selectedGift.image.src ? (
        //         <div className="img">
        //           <img src={selectedGift.image.src} alt={selectedGift.image.altText} />
        //         </div>
        //       ) : null}
        //       <div className="detail">
        //         <Link className="tt_link" to={`/products/${props.giftCollected.handle}`}>
        //           <h1>{props.giftCollected.title}</h1>
        //         </Link>
        //         <ModifyColor
        //           variants={props.giftCollected.variants}
        //           color={color}
        //           showChange={showChange}
        //           colorCallBack={colorCallBack}
        //           selectOption={selectOption}
        //         />
        //         {isGiftSocks(props.giftCollected) ? (
        //           <ModifyGiftSize
        //             variants={props.giftCollected.variants}
        //             size={size}
        //             color={color}
        //             showSize={showSize}
        //             giftSizeCallBack={giftSizeCallBack}
        //             selectOption={selectOption}
        //           />
        //         ) : null}

        //         {giftInCart && selectedGift && giftInCart.id === selectedGift.id ? (
        //           <div className="gift_button">
        //             <button className="remove_button" onClick={() => removeGiftFromCart()}>
        //               <span>Added</span>
        //             </button>
        //             <div className="tc_remove-button">
        //               <span className="remove-button" aria-label="remove from cart" onClick={() => removeGiftFromCart()}>
        //                 remove
        //               </span>
        //             </div>
        //           </div>
        //         ) : (
        //           <div className="gift_button">
        //             <button className="add_button" onClick={() => addGiftToCart(selectedGift, props.giftCollected)}>
        //               <span>Add</span>
        //             </button>
        //           </div>
        //         )}
        //       </div>
        //     </div>
        //   </div>
        // </div>

        // <div className="many_gift slide">
        //   <div className="gift_list">
        //     <Swiper {...giftSlideConfig}>
        //       <div className="gift_slide">
        //         <div className="box">
        //           {selectedGift && selectedGift.image && selectedGift.image.src ? (
        //             <div className="img">
        //               <img src={selectedGift.image.src} alt={selectedGift.image.altText} />
        //             </div>
        //           ) : null}
        //           <div className="detail">
        //             <Link className="tt_link" to={`/products/${props.giftCollected.handle}`}>
        //               <h1>{props.giftCollected.title}</h1>
        //             </Link>
        //             <ModifyColor
        //               variants={props.giftCollected.variants}
        //               color={color}
        //               showChange={showChange}
        //               colorCallBack={colorCallBack}
        //               selectOption={selectOption}
        //             />
        //             {isGiftSocks(props.giftCollected) ? (
        //               <ModifyGiftSize
        //                 variants={props.giftCollected.variants}
        //                 size={size}
        //                 color={color}
        //                 showSize={showSize}
        //                 giftSizeCallBack={giftSizeCallBack}
        //                 selectOption={selectOption}
        //               />
        //             ) : null}

        //             {giftInCart && selectedGift && giftInCart.id === selectedGift.id ? (
        //               <div className="gift_button">
        //                 <button className="remove_button" onClick={() => removeGiftFromCart()}>
        //                   <span>Added</span>
        //                 </button>
        //                 <div className="tc_remove-button">
        //                   <span className="remove-button" aria-label="remove from cart" onClick={() => removeGiftFromCart()}>
        //                     remove
        //                   </span>
        //                 </div>
        //               </div>
        //             ) : (
        //               <div className="gift_button">
        //                 <button className="add_button" onClick={() => addGiftToCart(selectedGift, props.giftCollected)}>
        //                   <span>Add</span>
        //                 </button>
        //               </div>
        //             )}
        //           </div>
        //         </div>
        //       </div>
        //       <div className="gift_slide">
        //         <div className="box">
        //           {selectedGift && selectedGift.image && selectedGift.image.src ? (
        //             <div className="img">
        //               <img src={selectedGift.image.src} alt={selectedGift.image.altText} />
        //             </div>
        //           ) : null}
        //           <div className="detail">
        //             <Link className="tt_link" to={`/products/${props.giftCollected.handle}`}>
        //               <h1>{props.giftCollected.title}</h1>
        //             </Link>
        //             <ModifyColor
        //               variants={props.giftCollected.variants}
        //               color={color}
        //               showChange={showChange}
        //               colorCallBack={colorCallBack}
        //               selectOption={selectOption}
        //             />
        //             {isGiftSocks(props.giftCollected) ? (
        //               <ModifyGiftSize
        //                 variants={props.giftCollected.variants}
        //                 size={size}
        //                 color={color}
        //                 showSize={showSize}
        //                 giftSizeCallBack={giftSizeCallBack}
        //                 selectOption={selectOption}
        //               />
        //             ) : null}

        //             {giftInCart && selectedGift && giftInCart.id === selectedGift.id ? (
        //               <div className="gift_button">
        //                 <button className="remove_button" onClick={() => removeGiftFromCart()}>
        //                   <span>Added</span>
        //                 </button>
        //                 <div className="tc_remove-button">
        //                   <span className="remove-button" aria-label="remove from cart" onClick={() => removeGiftFromCart()}>
        //                     remove
        //                   </span>
        //                 </div>
        //               </div>
        //             ) : (
        //               <div className="gift_button">
        //                 <button className="add_button" onClick={() => addGiftToCart(selectedGift, props.giftCollected)}>
        //                   <span>Add</span>
        //                 </button>
        //               </div>
        //             )}
        //           </div>
        //         </div>
        //       </div>
        //       <div className="gift_slide">
        //         <div className="box">
        //           {selectedGift && selectedGift.image && selectedGift.image.src ? (
        //             <div className="img">
        //               <img src={selectedGift.image.src} alt={selectedGift.image.altText} />
        //             </div>
        //           ) : null}
        //           <div className="detail">
        //             <Link className="tt_link" to={`/products/${props.giftCollected.handle}`}>
        //               <h1>{props.giftCollected.title}</h1>
        //             </Link>
        //             <ModifyColor
        //               variants={props.giftCollected.variants}
        //               color={color}
        //               showChange={showChange}
        //               colorCallBack={colorCallBack}
        //               selectOption={selectOption}
        //             />
        //             {isGiftSocks(props.giftCollected) ? (
        //               <ModifyGiftSize
        //                 variants={props.giftCollected.variants}
        //                 size={size}
        //                 color={color}
        //                 showSize={showSize}
        //                 giftSizeCallBack={giftSizeCallBack}
        //                 selectOption={selectOption}
        //               />
        //             ) : null}

        //             {giftInCart && selectedGift && giftInCart.id === selectedGift.id ? (
        //               <div className="gift_button">
        //                 <button className="remove_button" onClick={() => removeGiftFromCart()}>
        //                   <span>Added</span>
        //                 </button>
        //                 <div className="tc_remove-button">
        //                   <span className="remove-button" aria-label="remove from cart" onClick={() => removeGiftFromCart()}>
        //                     remove
        //                   </span>
        //                 </div>
        //               </div>
        //             ) : (
        //               <div className="gift_button">
        //                 <button className="add_button" onClick={() => addGiftToCart(selectedGift, props.giftCollected)}>
        //                   <span>Add</span>
        //                 </button>
        //               </div>
        //             )}
        //           </div>
        //         </div>
        //       </div>
        //     </Swiper>
        //   </div>
        // </div>
      );
    }
  }
}
