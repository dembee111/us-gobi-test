import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  addFreeGift,
  getSlideIndex,
  handleCheckBasicCollection,
  isGift,
  updateLineItem,
  giftsDefault,
} from './CartHelpers';
import LineItem from './LineItem';
import { getProductGender } from '../../../customTemplates/ProductPage/ProductHelpers';

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
  checkoutLineItemsReplaceMutation: state.checkoutLineItemsReplaceMutation,
});
export default connect(mapStateToProps)(LineItems);

function LineItems(props) {
  const grid = [];
  const gifts = [];
  const giftVariants = [];
  const slideIndex = Number(getSlideIndex(props.checkout.subtotalPriceV2.amount, props.gifts));

  //599 two gifts  offered
  let firstGift, secondGift;

  function getGiftCollected() {
    let giftCollected = 'None';
    let nextGift = 'None';
    switch (slideIndex) {
      case -1:
        giftCollected = 'None';
        nextGift = 'Hat';
        break;
      case 0:
        giftCollected = 'Hat';
        nextGift = 'Fringe Scarf';
        break;
      case 1:
        giftCollected = 'Fringe Scarf';
        nextGift = 'Blanket';
        break;
      case 2:
        giftCollected = 'Blanket';
        nextGift = 'None';
        break;
      default:
        giftCollected = 'None';
        giftCollected = 'None';
        nextGift = 'Hat';
        break;
      // case -1:
      //   giftCollected = 'None';
      //   nextGift = 'Socks or Hat';
      //   break;
      // case 0:
      //   giftCollected = 'Socks or Hat';
      //   nextGift = 'Fringe Scarf';
      //   break;
      // case 1:
      //   giftCollected = 'Fringe Scarf';
      //   nextGift = 'Triangle Scarf';
      //   break;
      // case 2:
      //   giftCollected = 'Triangle Scarf';
      //   nextGift = 'Woven Blanket';
      //   break;
      // case 3:
      //   giftCollected = 'Woven Blanket';
      //   nextGift = 'Knit Blanket';
      //   break;
      // case 4:
      //   giftCollected = 'Knit Blanket';
      //   nextGift = 'Socks and Blanket';
      //   break;
      // case 5:
      //   giftCollected = 'Socks and Blanket';
      //   nextGift = 'None';
      //   break;
      // default:
      //   giftCollected = 'None';
    }
    props.setGiftCollected(giftCollected);
    props.setNextGift(nextGift);
  }

  useEffect(() => {
    getGiftCollected();
  }, [props.checkout.subtotalPriceV2.amount, props.gifts]);

  // useEffect(() => {
  //   if (
  //     props.checkout &&
  //     props.checkout.id &&
  //     props.checkout.lineItems &&
  //     props.checkout.lineItems.edges &&
  //     props.checkoutLineItemsReplaceMutation &&
  //     props.currency &&
  //     props.currency.currencyCode
  //   ) {
  //     // let totalPrice = 0;
  //     // let hasGiftItem = false;
  //     // let newLineItems = [];

  //     // for (let lineItem of props.checkout.lineItems.edges) {
  //     //   if (lineItem && lineItem.node && lineItem.node.variant) {
  //     //     if (lineItem.node.variant.id) {
  //     //       let isGiftItem = isGift(lineItem);
  //     //       if (isGiftItem) {
  //     //         hasGiftItem = true;
  //     //       } else {
  //     //         newLineItems.push({
  //     //           variantId: lineItem.node.variant.id,
  //     //           quantity: parseInt(lineItem.node.quantity),
  //     //         });
  //     //       }
  //     //     }
  //     //     if (
  //     //       lineItem.node.variant.presentmentPrices &&
  //     //       lineItem.node.variant.presentmentPrices.edges &&
  //     //       lineItem.node.variant.presentmentPrices.edges[0] &&
  //     //       lineItem.node.variant.presentmentPrices.edges[0].node &&
  //     //       lineItem.node.variant.presentmentPrices.edges[0].node.price &&
  //     //       lineItem.node.variant.presentmentPrices.edges[0].node.price.amount &&
  //     //       lineItem.node.quantity
  //     //     ) {
  //     //       totalPrice +=
  //     //         Number(lineItem.node.quantity) *
  //     //         Number(lineItem.node.variant.presentmentPrices.edges[0].node.price.amount);
  //     //     }
  //     //   }
  //     // }

  //     // if (!hasGiftItem) {
  //     //   addFreeGift(totalPrice, giftsDefault).then((freeGiftItems) => {
  //     //     if (freeGiftItems && freeGiftItems.length > 0) {
  //     //       newLineItems = newLineItems.concat(freeGiftItems);
  //     //       props.checkoutLineItemsReplaceMutation({
  //     //         variables: {
  //     //           checkoutId: props.checkout.id,
  //     //           lineItems: newLineItems,
  //     //           currencyCode: props.currency.currencyCode,
  //     //         },
  //     //       });
  //     //     }
  //     //   });
  //     // }
  //     let newLineItems = [];
  //     let hasGiftItem = false;
  //     for (let lineItem of props.checkout.lineItems.edges) {
  //       if (lineItem && lineItem.node && lineItem.node.variant && lineItem.node.variant.id) {
  //         let isGiftItem = isGift(lineItem);
  //         if (!isGiftItem) {
  //           newLineItems.push({
  //             variantId: lineItem.node.variant.id,
  //             quantity: parseInt(lineItem.node.quantity),
  //           });
  //         } else {
  //           hasGiftItem = true;
  //         }
  //       }
  //     }
  //     if (hasGiftItem) {
  //       props.checkoutLineItemsReplaceMutation({
  //         variables: {
  //           checkoutId: props.checkout.id,
  //           lineItems: newLineItems,
  //           currencyCode: props.currency.currencyCode,
  //         },
  //       });
  //     }
  //   }
  // }, [props.checkout, props.checkoutLineItemsReplaceMutation, props.currency]);

  props.checkout.lineItems.edges.map((lineItem) => {
    let isGiftItem = isGift(lineItem);
    if (isGiftItem) {
      if (firstGift) {
        secondGift = lineItem;
      } else {
        firstGift = lineItem;
      }
    }
  });

  props.checkout.lineItems.edges.map((lineItem, index) => {
    let basicLine = handleCheckBasicCollection(lineItem, index);
    console.log('TCL: LineItems -> basicLine', basicLine);

    props.setBasicLine(basicLine);

    if (lineItem.node && lineItem.node.variant && lineItem.node.variant.product.handle) {
      const url = `/products/${lineItem.node.variant.product.handle}`;
      let color = '';
      let size = '';
      let gender = '';
      let giftCard = false;

      if (lineItem.node.variant && lineItem.node.variant.product) {
        lineItem.node.variant.product.tags.map((tag) => {
          if (tag.match(/^gift_card.*$/)) {
            giftCard = true;
          }

          tag = getProductGender(tag);

          if (tag) {
            gender = tag;
          }
        });
      }

      lineItem.node.variant &&
        lineItem.node.variant.selectedOptions &&
        lineItem.node.variant.selectedOptions.map((selectedOption) => {
          if (selectedOption.name === 'Color') {
            color = selectedOption.value;
          } else if (selectedOption.name === 'Size') {
            size = selectedOption.value;
          }
        });
      // have gift item separate
      let isGiftItem = isGift(lineItem);
      if (isGiftItem) {
        giftVariants.push(lineItem.node.variant);
        //when there are two gifts
        if (slideIndex === 5) {
          if (firstGift && firstGift.node && firstGift.node.id && firstGift.node.id === lineItem.node.id) {
            gifts.push(
              <LineItem
                key={`grid-${index}`}
                isGiftItem={isGiftItem}
                lineItem={lineItem}
                url={url}
                color={color}
                size={size}
                gender={gender}
                additionalGift={secondGift}
                slideIndex={slideIndex}
                giftOptions={props.giftOptions}
                gifts={props.gifts}
              />,
            );
          } else if (secondGift && secondGift.node && secondGift.node.id && secondGift.node.id === lineItem.node.id) {
            gifts.push(
              <LineItem
                key={`grid-${index}`}
                isGiftItem={isGiftItem}
                lineItem={lineItem}
                url={url}
                color={color}
                size={size}
                gender={gender}
                additionalGift={firstGift}
                slideIndex={slideIndex}
                giftOptions={props.giftOptions}
                gifts={props.gifts}
              />,
            );
          }
        } else {
          gifts.push(
            <LineItem
              key={`grid-${index}`}
              isGiftItem={isGiftItem}
              lineItem={lineItem}
              url={url}
              color={color}
              size={size}
              gender={gender}
              slideIndex={slideIndex}
              giftOptions={props.giftOptions}
              gifts={props.gifts}
            />,
          );
        }
      } else if (!isGiftItem) {
        grid.push(
          <LineItem
            key={`grid-${index}`}
            isGiftItem={isGiftItem}
            lineItem={lineItem}
            color={color}
            giftCard={giftCard}
            size={size}
            gender={gender}
            url={url}
            gifts={props.gifts}
            basicLine={basicLine}
          />,
        );
      }
    }
    //error handling
    else {
      //if a lineItem is unavailable or has an error remove from cart
      // if (lineItem.node && lineItem.node.id) {
      //   updateLineItem(lineItem.node.id, 0, props.gifts);
      // }
    }
  });
  return gifts.concat(grid);
}
