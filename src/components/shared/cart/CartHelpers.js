import store from '../../../state/createStore';
import { addToCartEvent, removeFromCartEvent } from '../dataLayer/index';
import { sendAddToCartEvent } from '../dataLayer/algolia';
import { getGiftBox, getGiftProducts } from '../../../components/shared/query/query';
import { has } from 'lodash';

export function isCheckCollection(product, selectedTag) {
  let isIcecream = false;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === selectedTag) {
        isIcecream = true;
      }
    }
  }
  return isIcecream;
}

export function isGiftboxCollection(product) {
  let isIcecream = false;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === 'giftbox') {
        isIcecream = true;
      }
    }
  }
  return isIcecream;
}

export function isGiftShawlCollection(product) {
  let isIcecream = false;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === 'giftshawl') {
        isIcecream = true;
      }
    }
  }
  return isIcecream;
}

export function handleCheckPrice(deals) {
  console.log("TCL: handleCheckPrice -> deals", deals.giftbox.isOpen)
  let count = 0
  let isCountedgift = 0
  if (deals.giftbox.isOpen) {
    store().getState().checkout &&
      store().getState().checkout.lineItems &&
      store().getState().checkout.lineItems.edges &&
      store()
        .getState()
        .checkout.lineItems.edges.map((lineItem) => {
          console.log("TCL: handleCheckPrice -> lineItem", lineItem)
          // if (lineItem.node.variant.presentmentPrices[0].node.price.amount >= 199) {
          //   count++
          // }
          // if (isGiftboxCollection(lineItem.node.variant.product)) {
          //   isCountedgift++
          // }
        })
  }


  return { count, isCountedgift }
}

export function handleCheckGift(selectedTag) {
  let count = 0
  let hasOption = false
  let sockCount = 0
  let sockShawl = 0
  store().getState().checkout &&
    store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges &&
    store()
      .getState()
      .checkout.lineItems.edges.map((line) => {
        let result = isCheckCollection(line.node.variant.product, selectedTag)
        let isSock = isGiftboxCollection(line.node.variant.product)
        let isShawl = isGiftShawlCollection(line.node.variant.product)
        if (result) {
          count++
          hasOption = true
        }
        if (isSock) {
          sockCount++
        }
        if (isShawl) {
          sockShawl++
        }
      })

  return { count, sockCount, sockShawl }
}

function findMinPriceSecond(bucket) {
  let min = 0;
  let minLine = { variantId: '', handle: '', price: 0, res: false };
  bucket.map((b, i) => {
    if (min < Number(b.node.variant.presentmentPrices.edges[0].node.price.amount) && i === 0) {
      min = Number(b.node.variant.presentmentPrices.edges[0].node.price.amount);
    }
    if (min >= Number(b.node.variant.presentmentPrices.edges[0].node.price.amount) && b.node.quantity < 4) {
      min = Number(b.node.variant.presentmentPrices.edges[0].node.price.amount);
      minLine.price = min;
      minLine.index = i;
      minLine.real = b.index;
      minLine.qty = b.node.quantity;
      minLine.handle = b.node.variant.product.handle;
      minLine.variantId = atob(b.node.variant.id).replace('gid://shopify/ProductVariant/', '');
    }
  });
  return minLine;
}

function findMinPrice(bucket) {
  let min = 0;
  let minLine = { variantId: '', handle: '', price: 0, res: false };
  bucket.map((b, i) => {
    if (min < Number(b.node.variant.presentmentPrices.edges[0].node.price.amount) && i === 0) {
      min = Number(b.node.variant.presentmentPrices.edges[0].node.price.amount);
    }
    if (min >= Number(b.node.variant.presentmentPrices.edges[0].node.price.amount) && b.node.quantity < 2) {
      min = Number(b.node.variant.presentmentPrices.edges[0].node.price.amount);
      minLine.price = min;
      minLine.index = i;
      minLine.real = b.index;
      minLine.qty = b.node.quantity;
      minLine.handle = b.node.variant.product.handle;
      minLine.variantId = atob(b.node.variant.id).replace('gid://shopify/ProductVariant/', '');
    }
  });
  return minLine;
}

export function handleCheckBasicCollection(lineItem, index) {
  let varId = atob(lineItem.node.variant.id).replace('gid://shopify/ProductVariant/', '');
  let count = 0;
  let bucket = [];
  let handles = [];
  let checkQty = { one: 0, two: 0, three: 0, four: 0 };
  let minLine = { variantId: '', handle: '', price: 0, res: false };
  let secondMinLine = { variantId: '', handle: '', price: 0, res: false };
  let thirdMinLine = { variantId: '', handle: '', price: 0, res: false };
  // checkout lineItems dotor heden basic baraa baigaag shalgaj toolj awah
  store().getState().checkout &&
    store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges &&
    store()
      .getState()
      .checkout.lineItems.edges.map((line, i) => {
        let result = isBasicCollection(line.node.variant.product);
        if (result) {
          count += line.node.quantity;
          line = { ...line, index: i };
          bucket.push(line);
        }
      });

  if (count >= 3 && count < 6) {
    minLine = findMinPrice(bucket);
  }

  if (count >= 6 && count < 9) {
    minLine = findMinPrice(bucket);
    if (minLine) {
      bucket.map((b) => {
        if (b.node.quantity === 1) {
          checkQty.one++;
        } else if (b.node.quantity === 2) {
          checkQty.two++;
        }
      });
    }
    handles.push(minLine);

    if (checkQty.one === 1 || checkQty.one === 0) {
      bucket.splice(minLine.index, 1);
      handles = [];
      secondMinLine = findMinPriceSecond(bucket);
      handles.push(secondMinLine);
    } else if (checkQty.one >= 2) {
      bucket.splice(minLine.index, 1);
      secondMinLine = findMinPrice(bucket);
      handles.push(secondMinLine);
    }
  }

  if (count >= 9 && count < 12) {
    minLine = findMinPrice(bucket);
    if (minLine) {
      bucket.map((b) => {
        if (b.node.quantity === 1) {
          checkQty.one++;
        } else if (b.node.quantity === 2) {
          checkQty.two++;
        } else if (b.node.quantity === 3) {
          checkQty.three++;
        }
      });
    }
    handles.push(minLine);

    if (checkQty.one === 1 && checkQty.two >= 1) {
      bucket.splice(minLine.index, 1);
      secondMinLine = findMinPriceSecond(bucket);
      handles.push(secondMinLine);
    } else if (checkQty.one === 1 || checkQty.one === 0) {
      bucket.splice(minLine.index, 1);
      handles = [];
      secondMinLine = findMinPriceSecond(bucket);
      handles.push(secondMinLine);
    } else if (checkQty.one >= 3) {
      // 2 dahi
      bucket.splice(minLine.index, 1);
      secondMinLine = findMinPrice(bucket);
      handles.push(secondMinLine);
      // 3 dahi
      bucket.splice(secondMinLine.index, 1);
      thirdMinLine = findMinPrice(bucket);
      handles.push(thirdMinLine);
    } else if (checkQty.one >= 1 && checkQty.two >= 1) {
      bucket.splice(minLine.index, 1);
      secondMinLine = findMinPriceSecond(bucket);
      handles.push(secondMinLine);
    } else if (checkQty.three === 3) {
      bucket.splice(minLine.index, 1);
      secondMinLine = findMinPrice(bucket);
      handles.push(secondMinLine);
    }
  }

  if ((count >= 6 && count < 9) || (count >= 9 && count < 12)) {
    handles &&
      handles.map((hand) => {
        if (
          hand.handle === lineItem.node.variant.product.handle &&
          varId === hand.variantId &&
          hand.real === index &&
          lineItem.node.quantity === 1
        ) {
          minLine.res = true;
        } else if (
          hand.handle === lineItem.node.variant.product.handle &&
          varId === hand.variantId &&
          hand.real === index &&
          lineItem.node.quantity === 2
        ) {
          minLine.res = true;
        } else if (
          hand.handle === lineItem.node.variant.product.handle &&
          varId === hand.variantId &&
          hand.real === index &&
          lineItem.node.quantity === 3
        ) {
          minLine.res = true;
        }
      });
  }

  if (count >= 3 && count < 6) {
    if (
      minLine.handle === lineItem.node.variant.product.handle &&
      varId === minLine.variantId &&
      minLine.price === Number(lineItem.node.variant.presentmentPrices.edges[0].node.price.amount) &&
      minLine.real === index &&
      lineItem.node.quantity === 1
    ) {
      minLine.res = true;
    }
  }

  minLine.count = count;
  return minLine;
}

export function isBasicCollection(product) {
  let isIcecream = false;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === '2+1Free') {
        isIcecream = true;
      }
    }
  }
  return isIcecream;
}

/**
 * The prices gifts of gifts with the product ids of the gifts to be given.
 * gift - price gift
 * ids - product ids of gift products to give by default
 * additionalOptions - other gift options the user can choose at the given price
 */
export const giftsDefault = [
  {
    price: 1,
    giftIds: [
      {
        defaultId: 4450906701882,
      },
    ],
  },
  // {
  //   price: 99,
  //   giftIds: [
  //     {
  //       defaultId: 4534269280314,
  //       additionalIds: [4450906701882, 4562357157946],
  //     },
  //   ],
  // },
  // {
  //   price: 199,
  //   giftIds: [
  //     {
  //       defaultId: 4450903294010,
  //       additionalIds: [4562323996730],
  //     },
  //   ],
  // },
  // {
  //   price: 299,
  //   giftIds: [
  //     {
  //       defaultId: 4450919841850,
  //       additionalIds: [4562294767674],
  //     },
  //   ],
  // },
  // {
  //   price: 399,
  //   giftIds: [
  //     {
  //       defaultId: 4357455872058,
  //     },
  //   ],
  // },
  // {
  //   price: 499,
  //   giftIds: [
  //     {
  //       defaultId: 4450921578554,
  //       additionalIds: [4562353127482],
  //     },
  //   ],
  // },
  // {
  //   price: 599,
  //   giftIds: [{ defaultId: 4450906701882 }, { defaultId: 4450921578554, additionalIds: [4562353127482] }],
  // },
  // {
  //   price: 99,
  //   giftIds: [
  //     {
  //       defaultId: 4534269280314,
  //     },
  //   ],
  // },
  // {
  //   price: 249,
  //   giftIds: [
  //     {
  //       defaultId: 4450903294010,
  //     },
  //   ],
  // },
  // {
  //   price: 399,
  //   giftIds: [
  //     {
  //       defaultId: 4357455872058,
  //     },
  //   ],
  // },
];

/**
 * Checks whether product is part of the icecream collection by checking if it contains the tag "icecream"
 *
 * @param product the product to check if it is gift socks
 *
 * @return none
 */
export function isIcecreamCollection(product) {
  let isIcecream = false;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === 'icecream') {
        isIcecream = true;
      }
    }
  }
  return isIcecream;
}

export function hasIcecreamCollection(lineItems) {
  if (lineItems) {
    let hasIcecreamProduct = false;
    for (let lineItem of lineItems) {
      if (lineItem && lineItem.node && lineItem.node.variant && lineItem.node.variant.product) {
        if (isIcecreamCollection(lineItem.node.variant.product)) {
          hasIcecreamProduct = true;
        }
      }
    }
    return hasIcecreamProduct;
  }
}

export const discountPrices = [100, 200, 300, 500];
export const discountPercentages = [5, 15, 25, 30];

function getDiscountIndex(total) {
  let i = -1;
  if (total && !isNaN(total)) {
    for (let discountPrice of discountPrices) {
      if (discountPrice > Number(total)) {
        return i;
      }
      i++;
    }
  }
  return i;
}

function getDiscountPercentage(total) {
  let discountPercentage = 0;
  let index = getDiscountIndex(total);
  if (index !== -1) {
    discountPercentage = discountPercentages[index];
  }
  return discountPercentage;
}

function getLineItemsTotal() {
  let total = 0;
  if (
    store().getState().checkout &&
    store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges
  ) {
    for (let lineItem of store().getState().checkout.lineItems.edges) {
      if (
        lineItem.node &&
        lineItem.node.variant &&
        lineItem.node.variant.presentmentPrices &&
        lineItem.node.variant.presentmentPrices.edges &&
        lineItem.node.variant.presentmentPrices.edges[0] &&
        lineItem.node.variant.presentmentPrices.edges[0].node &&
        lineItem.node.variant.presentmentPrices.edges[0].node.price &&
        lineItem.node.variant.presentmentPrices.edges[0].node.price.amount
      ) {
        total +=
          Number(lineItem.node.variant.presentmentPrices.edges[0].node.price.amount) * Number(lineItem.node.quantity);
      }
    }
  }
  return total;
}

export function getMultiplyDecimal() {
  let discountPercentage = getDiscountPercentage(getLineItemsTotal());
  return (100 - discountPercentage) / 100;
}

export function getProgressPercentage() {
  let total = getLineItemsTotal();
  let index = getDiscountIndex(total);
  if (index === discountPrices.length - 1) return 100;
  let currentThreshold = index === -1 ? 0 : discountPrices[index];
  let nextThreshold = discountPrices[index + 1];
  let priceGap = nextThreshold - currentThreshold;
  let totalScaled = total - currentThreshold;
  return (totalScaled / priceGap + index + 1) * (100 / discountPrices.length);
}

export function getPriceUntilNextDiscount() {
  let total = getLineItemsTotal();
  let index = getDiscountIndex(total);
  if (index === discountPrices.length - 1) return 0;
  let nextThreshold = discountPrices[index + 1];
  return nextThreshold - total;
}

/**
 * Checks whether lineItem is gift socks by checking if it contains the tag "giftsocks"
 *
 * @param lineItem the lineItem to check if it is gift socks
 *
 * @return none
 */
export function isGiftCard(product) {
  let isGiftCard = false;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === 'gift_card') {
        isGiftCard = true;
      }
    }
  }
  return isGiftCard;
}

/**
 * Gets the maximum available variant of a gift product.
 * For example, if there are 50 grey scarves and 30 white scarves, the function return the grey variant of the scarf.
 *
 * @param variantEdges the variants to find max from.
 *
 * @return maxVariant (object) - the maximum available variant
 */
export function getMaxAvailableVariant(variantEdges) {
  if (!variantEdges) return null;
  let maxQuantity = 0;
  let maxVariant = variantEdges[0] && variantEdges[0].node;
  for (let variantEdge of variantEdges) {
    if (variantEdge.node.quantityAvailable > maxQuantity) {
      maxQuantity = variantEdge.node.quantityAvailable;
      maxVariant = variantEdge.node;
    }
  }
  return maxVariant;
}
/**
 * Calculates the free gift(s) to be given on a certain price gift.
 *
 * @param {number} totalPrice the totalPrice
 * @param gifts the mappings of the gifts and gifts to be given at certain gifts
 * @return items (array) - the gifts to be given
 */
export async function addFreeGift(totalPrice, gifts) {
  const items = [];
  if (gifts) {
    let freeGiftProdIds = null;

    //find the greatest price that is less than the totalPrice
    for (const gift of gifts) {
      const { price } = gift;
      if (totalPrice >= price) {
        if (gift && gift.giftIds) {
          freeGiftProdIds = [];
          if (gift.giftIds) {
            for (let giftId of gift.giftIds) {
              freeGiftProdIds.push(giftId.defaultId);
            }
          }
        }
      } else {
        break;
      }
    }

    if (freeGiftProdIds && freeGiftProdIds.length > 0) {
      //query all gift products to get the available quantities of their variants
      await store()
        .getState()
        .client.query({
          query: getGiftProducts,
          variables: {
            productIds: freeGiftProdIds.map((product) => btoa(`gid://shopify/Product/${product}`)),
            currencyCode: store().getState().currency.currencyCode,
          },
        })
        .then((result) => {
          if (result && result.data && result.data.nodes) {
            for (let product of result.data.nodes) {
              if (product && product.variants && product.variants.edges) {
                items.push(product);
              }
            }
          }
        });
    }
  }
  return items;
}
export function addBundleToCart(bundle) {
  if (bundle) {
    let items = [];
    let lineItemSet = {};
    //let bundleSet = {};

    store().getState().checkout &&
      store().getState().checkout.lineItems &&
      store().getState().checkout.lineItems.edges &&
      store()
        .getState()
        .checkout.lineItems.edges.map((lineItem) => {
          if (lineItem && lineItem.node && lineItem.node.variant) {
            lineItemSet[lineItem.node.variant.id] = {
              variantId: lineItem.node.variant.id,
              quantity: lineItem.node.quantity,
            };
          }
        });
    for (let bundleProduct of bundle) {
      if (bundleProduct) {
        let { variant, product } = bundleProduct;
        if (variant) {
          const { quantityAvailable, id } = variant;
          let lineItem = lineItemSet[id];
          let oldQuantity = 0;
          if (lineItem && lineItem.quantity) {
            oldQuantity = lineItem.quantity;
          }
          if ((lineItem && oldQuantity < quantityAvailable) || !lineItem) {
            store().dispatch({
              type: 'ADD_TO_CART',
              payload: {
                justAdded: {
                  product,
                  variant,
                },
              },
            });

            lineItemSet[id] = {
              variantId: id,
              quantity: oldQuantity + 1,
            };

            addToCartEvent(product, variant, oldQuantity + 1);
            // sendAddToCartEvent need objectId from searchPage
            let sendingObjectIds = [atob(id).replace('gid://shopify/ProductVariant/', '')];
            sendAddToCartEvent(sendingObjectIds, 'us_products');
          }
        }
      }
    }

    for (let lineItemId in lineItemSet) {
      let lineItem = lineItemSet[lineItemId];
      items.push({
        variantId: lineItem.variantId,
        quantity: lineItem.quantity,
      });
    }

    //iterate through the set and add all the prods to cart
    store()
      .getState()
      .checkoutLineItemsReplaceMutation({
        variables: {
          checkoutId: store().getState().checkout.id,
          lineItems: items,
          currencyCode: store().getState().currency.currencyCode,
        },
      });
  }
}

/**
 * Adds given variant to the cart
 *
 * @param variant the variant (object) to be added
 * @param product the product (object) to be added
 *
 * @return true if successfully added. false if add was unsuccessful
 */

export function findGiftBox(lineItem) {
  let isGiftItem = false;
  if (lineItem && lineItem.node.variant && lineItem.node.variant.product && lineItem.node.variant.product.tags) {
    for (let tag of lineItem.node.variant.product.tags) {
      if (tag === 'giftbox') {
        isGiftItem = true;
      }
    }
  }
  return isGiftItem;
}

export function findGiftScarf(lineItem) {
  let isGiftItem = false;
  if (lineItem && lineItem.node.variant && lineItem.node.variant.product && lineItem.node.variant.product.tags) {
    for (let tag of lineItem.node.variant.product.tags) {
      if (tag === 'giftscarf') {
        isGiftItem = true;
      }
    }
  }
  return isGiftItem;
}

export function addGiftToCart(variant, product) {

  const variantId = variant.id;
  const { quantityAvailable } = variant;
  let items = [];
  let oldQuantity = 0;

  store().getState().checkout &&
    store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges &&
    store()
      .getState()
      .checkout.lineItems.edges.map((lineItem) => {
        const isGiftBoxItem = findGiftBox(lineItem);
        const isGiftScarfItem = findGiftScarf(lineItem);
        // const isGiftScarfItem = isGiftScarf(lineItem)
        if (lineItem.node.variant.id === variantId) {
          oldQuantity = lineItem.node.quantity;
        } else if (!isGiftBoxItem || !isGiftScarfItem) {
          items.push({
            variantId: lineItem.node.variant.id,
            quantity: parseInt(lineItem.node.quantity),
          });
        }
      });
  addToCartEvent(product, variant, oldQuantity + 1);
  // sendAddToCartEvent need objectId from searchPage
  let sendingObjectIds = [atob(variantId).replace('gid://shopify/ProductVariant/', '')];
  sendAddToCartEvent(sendingObjectIds, 'us_products');

  if (oldQuantity < quantityAvailable) {
    items.push({
      variantId,
      quantity: oldQuantity + 1,
    });

    store()
      .getState()
      .checkoutLineItemsReplaceMutation({
        variables: {
          checkoutId: store().getState().checkout.id,
          lineItems: items,
          currencyCode: store().getState().currency.currencyCode,
        },
      });
    return false;
  }
  return true;
}

export function removeGiftFromCart() {
  let items = [];
  store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges &&
    store()
      .getState()
      .checkout.lineItems.edges.map((lineItem) => {
        const isGiftItem = isGift(lineItem);
        if (!isGiftItem || isGiftBox(lineItem.node)) {
          items.push({
            variantId: lineItem.node.variant.id,
            quantity: parseInt(lineItem.node.quantity),
          });
        }
      });
  store()
    .getState()
    .checkoutLineItemsReplaceMutation({
      variables: {
        checkoutId: store().getState().checkout.id,
        lineItems: items,
        currencyCode: store().getState().currency.currencyCode,
      },
    });
}

export function removeGiftFromLineItems(lineItems) {
  let items = [];
  if (lineItems) {
    for (let lineItem of lineItems) {
      const isGiftItem = isGift(lineItem);
      if (!isGiftItem) {
        items.push({
          variantId: lineItem.node.variant.id,
          quantity: parseInt(lineItem.node.quantity),
        });
      }
    }
  }
  return items;
}

async function getFreeGiftSocks(lineItems, addedLineItem) {
  if (lineItems) {
    let hasIcecreamProduct = false;

    for (let lineItem of lineItems) {
      if (lineItem && lineItem.node && lineItem.node.variant && lineItem.node.variant.product) {
        if (isIcecreamCollection(lineItem.node.variant.product)) {
          hasIcecreamProduct = true;
        }
      }
    }
    if (addedLineItem && isIcecreamCollection(addedLineItem)) {
      hasIcecreamProduct = true;
    }
    if (hasIcecreamProduct) {
      let productIds = [4450906701882];
      let items = [];
      await store()
        .getState()
        .client.query({
          query: getGiftProducts,
          variables: {
            productIds: productIds.map((product) => btoa(`gid://shopify/Product/${product}`)),
            currencyCode: store().getState().currency.currencyCode,
          },
        })
        .then((result) => {
          if (result && result.data && result.data.nodes) {
            for (let product of result.data.nodes) {
              if (product && product.variants && product.variants.edges) {
                items.push(product);
              }
            }
          }
        });
      let maxVariant = getMaxAvailableVariant(items[0].variants.edges);
      return maxVariant.id;
    }
  }
}

export function formatPrice(price) {
  try {
    return price ? (Math.round(price * 100) / 100).toFixed(2) : 0;
  } catch (e) {
    return;
  }
}

/**
 * gets the slide index of the price gifts for gifts.
 * For example, if subTotalPrice === 89, then index = 0. if subTotalPrice === 199, then index = 1. if subTotalPrice === 299, then index = 2 etc.
 *
 * @param subTotalPrice the subtotal price to calculate gift
 * @param gifts the mappings of the gifts and gifts to be given at certain price gifts
 *
 * @return true if successfully added. false if add was unsuccessful
 */
export function getSlideIndex(subTotalPrice, gifts) {
  let giftIndex = -1;
  for (const index in gifts) {
    const gift = gifts[index];
    const { price } = gift;
    if (subTotalPrice >= price) {
      giftIndex = index;
    } else {
      break;
    }
  }
  return giftIndex;
}

/**
 * Adds given variant to the cart
 *
 * @param variant the variant (object) to be added
 * @param gifts the mappings of the gifts and gifts to be given at certain gifts
 * @param product the product (object) to be added
 * @return true if successfully added. false if add was unsuccessful
 */
export function addToCart(variant, product) {
  const variantId = variant.id;
  const { quantityAvailable } = variant;
  let items = [];
  let oldQuantity = 0;

  store().getState().checkout &&
    store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges &&
    store()
      .getState()
      .checkout.lineItems.edges.map((lineItem) => {
        if (lineItem.node.variant.id === variantId) {
          oldQuantity = lineItem.node.quantity;
        } else if (!isFreeGiftCard(lineItem.node)) {
          items.push({
            variantId: lineItem.node.variant.id,
            quantity: parseInt(lineItem.node.quantity),
          });
        }
      });
  addToCartEvent(product, variant, oldQuantity + 1);

  let sendingObjectIds = [atob(variantId).replace('gid://shopify/ProductVariant/', '')];
  sendAddToCartEvent(sendingObjectIds, 'us_products');

  if (oldQuantity < quantityAvailable || isGiftCard(product)) {
    store().dispatch({
      type: 'ADD_TO_CART',
      payload: {
        justAdded: {
          product,
          variant,
        },
      },
    });
    items.push({
      variantId,
      quantity: oldQuantity + 1,
    });
    const totalPrice =
      Number(store().getState().checkout.totalPriceV2.amount) +
      Number(variant.presentmentPrices.edges[0].node.price.amount);

    // if (!checkSaleGiftCardId(variantId, store().getState().checkout.lineItems.edges)) {
    //   let freeGiftCardId = getFreeGiftCardId(totalPrice);
    //   if (freeGiftCardId) {
    //     items.push({
    //       variantId: btoa(`gid://shopify/ProductVariant/${freeGiftCardId}`),
    //       quantity: 1,
    //     });
    //   }
    //   let freeGiftBoxId = getFreeGiftBoxId(totalPrice);
    //   if (freeGiftBoxId) {
    //     items.push({
    //       variantId: btoa(`gid://shopify/ProductVariant/${freeGiftBoxId}`),
    //       quantity: 1,
    //     });
    //   }
    // }

    store()
      .getState()
      .checkoutLineItemsReplaceMutation({
        variables: {
          checkoutId: store().getState().checkout.id,
          lineItems: items,
          currencyCode: store().getState().currency.currencyCode,
        },
      });
    return false;
  }
  return true;
}

/**
 * Updates the quantity of the given lineItem to the cart
 *
 * @param lineItem the lineItem (object) to update quantity of
 * @param newQuantity the new quantity of the lineItem
 * @param gifts the mappings of the gifts and gifts to be given at certain gifts
 * @return true if successfully updated. false if update was unsuccessful
 */

export function updateQuantityInCart(lineItem, newQuantity) {
  const { quantityAvailable } = lineItem.variant;
  const variantId = lineItem.variant.id;
  if (
    newQuantity <= quantityAvailable ||
    (lineItem && lineItem.variant && lineItem.variant.product && isGiftCard(lineItem.variant.product))
  ) {
    updateLineItem(variantId, newQuantity);

    if (newQuantity === 0) {
      removeFromCartGA(lineItem, newQuantity);
    }
    return false;
  }
  return true;
}
// export function updateQuantityInCart(oldLineItem, newQuantity) {

//   if (newQuantity <= oldLineItem.variant.quantityAvailable || isGiftCard(oldLineItem.variant.product)) {
//     let items = [];
//     let totalPrice = 0;
//     let oldQuantity = 0;
//     let lineItems = [];
//     let giftItems = [];

//     for (let lineItem of store().getState().checkout.lineItems.edges) {

//       if (lineItem.node && lineItem.node.variant && !isFiftyGiftCard(lineItem.node)) {
//         if (oldLineItem.variant.id === lineItem.node.variant.id) {

//           if (newQuantity > 0) {
//             items.push({
//               variantId: lineItem.node.variant.id,
//               quantity: parseInt(newQuantity),
//             });
//             totalPrice += newQuantity * Number(lineItem.node.variant.presentmentPrices.edges[0].node.price.amount);
//             lineItems.push(lineItem);
//           }
//           oldQuantity = lineItem.node.quantity;

//         } else {

//           if (isGift(lineItem) && Number(store().getState().checkout.subtotalPriceV2.amount) > 199) {
//             giftItems.push({
//               variantId: lineItem.node.variant.id,
//               quantity: parseInt(lineItem.node.quantity),
//             });
//           } else {
//             items.push({
//               variantId: lineItem.node.variant.id,
//               quantity: parseInt(lineItem.node.quantity),
//             });
//             lineItems.push(lineItem);
//           }
//           totalPrice +=
//             Number(lineItem.node.quantity) * Number(lineItem.node.variant.presentmentPrices.edges[0].node.price.amount);
//         }
//       }
//     }
//     console.log(Number(store().getState().checkout.subtotalPriceV2.amount))
//     // let freeGiftCard = getFreeGiftCard(lineItems);
//     // if (freeGiftCard) {
//     //   items.push({
//     //     variantId: freeGiftCard,
//     //     quantity: 1,
//     //   });
//     // }

//     if (giftItems && newQuantity > 0) {
//       items = items.concat(giftItems);
//     }

//     store()
//       .getState()
//       .checkoutLineItemsReplaceMutation({
//         variables: {
//           checkoutId: store().getState().checkout.id,
//           lineItems: items,
//           currencyCode: store().getState().currency.currencyCode,
//         },
//       });
//     if (newQuantity === 0) {
//       removeFromCartGA(oldLineItem, newQuantity);
//     }
//     return false;
//   }
//   return true;
// }

function removeFromCartGA(lineItem, newQuantity) {
  let sendingProduct = {
    name: lineItem.variant.product.title && lineItem.variant.product.title.replace("'", ''),
    id: (lineItem.variant.sku && lineItem.variant.sku.replace("'", '')) || '',
    productId:
      lineItem.variant.product.id &&
      atob(lineItem.variant.product.id).replace('gid://shopify/Product/', '').replace("'", ''),
    variantId:
      (lineItem.variant.id &&
        atob(lineItem.variant.id).replace('gid://shopify/ProductVariant/', '').replace("'", '')) ||
      '',
    price: lineItem.variant.priceV2 && lineItem.variant.priceV2.amount && parseInt(lineItem.variant.priceV2.amount),
    compareAtPrice:
      lineItem.variant.compareAtPriceV2 &&
      lineItem.variant.compareAtPriceV2.amount &&
      parseInt(lineItem.variant.compareAtPriceV2.amount),
    quantity: newQuantity, // update to actual quantity
    category: (lineItem.variant.product.productType && lineItem.variant.product.productType.replace("'", '')) || '',
    inventoryCount: lineItem.variant.quantityAvailable,
  };
  removeFromCartEvent(sendingProduct);
}

/**
 * Updates the size of the line item in the cart
 *
 * @param oldLineItem the old lineItem (object) to be removed
 * @param newSizeVariant the new variant to be replaced with
 *
 * @return none
 */
export function updateSizeVariant(oldLineItem, newSizeVariant) {
  let items = [];
  let totalPrice = 0;
  store()
    .getState()
    .checkout.lineItems.edges.map((lineItem) => {
      // ignore the old size variant & ignore gift items
      if (oldLineItem.variant.id !== lineItem.node.variant.id) {
        items.push({
          variantId: lineItem.node.variant.id,
          quantity: parseInt(lineItem.node.quantity),
        });
        totalPrice +=
          Number(lineItem.node.quantity) * Number(lineItem.node.variant.presentmentPrices.edges[0].node.price.amount);
      }
    });
  // add new size variant with quantity as 1
  items.push({
    variantId: newSizeVariant,
    quantity: 1,
  });
  totalPrice += Number(oldLineItem.variant.presentmentPrices.edges[0].node.price.amount);

  store()
    .getState()
    .checkoutLineItemsReplaceMutation({
      variables: {
        checkoutId: store().getState().checkout.id,
        currencyCode: store().getState().currency.currencyCode,
        lineItems: items,
      },
    });
}

/**
 * Updates the gifts in the cart by replacing the old gifts with the new variant inputs
 *
 * @param newSizeVariants the old lineItem (object) to be removed
 *
 * @return none
 */
export function updateGiftVariant(newSizeVariants) {
  const items = [];
  store()
    .getState()
    .checkout.lineItems.edges.map((lineItem) => {
      const isGiftItem = isGift(lineItem);
      if (!isGiftItem || isGiftBox(lineItem.node)) {
        items.push({
          variantId: lineItem.node.variant.id,
          quantity: parseInt(lineItem.node.quantity),
        });
      }
    });
  // add new variant with same quantity as old
  for (const newSizeVariant of newSizeVariants) {
    items.push({
      variantId: newSizeVariant,
      quantity: 1,
    });
  }
  const variables = {
    checkoutId: store().getState().checkout.id,
    lineItems: items,
    currencyCode: store().getState().currency.currencyCode,
  };
  if (store().getState().currency && store().getState().currency.currencyCode) {
    variables.currencyCode = store().getState().currency.currencyCode;
  }
  store().getState().checkoutLineItemsReplaceMutation({
    variables,
  });
}

/**
 * Checks whether lineItem is a gift by checking if it contains the tag "Gift20"
 *
 * @param lineItem the lineItem to check if it is a gift
 *
 * @return none
 */

export function isGift(lineItem) {
  console.log("TCL: isGift -> lineItem", lineItem)
  let isGiftItem = false;
  if (lineItem && lineItem.node.variant && lineItem.node.variant.product && lineItem.node.variant.product.tags) {
    for (let tag of lineItem.node.variant.product.tags) {
      if (tag === 'Gift20') {
        isGiftItem = true;
      }
    }
  }
  return isGiftItem;
}
/**
 * Checks whether lineItem is gift socks by checking if it contains the tag "giftsocks"
 *
 * @param lineItem the lineItem to check if it is gift socks
 *
 * @return none
 */

export function isGiftSocks(product) {
  let isSocks = false;
  if (product.tags) {
    for (let tag of product.tags) {
      if (tag === 'giftsocks') {
        isSocks = true;
      }
    }
  }
  return isSocks;
}
/**
 * Updates the lineItem in the cart
 *
 * @param variantId the variantId of the lineItem to update
 * @param quantity the new quantity of the lineItem
 * @param gifts the mappings of the gifts and gifts to be given at certain gifts
 * @return none
 */
export function updateLineItem(variantId, quantity) {
  let items = [];
  let totalPrice = 0;
  let oldQuantity = 0;
  let newLineItems = [];
  store()
    .getState()
    .checkout.lineItems.edges.map((lineItem) => {
      if (lineItem.node && lineItem.node.variant) {
        if (variantId === lineItem.node.variant.id) {
          if (quantity > 0) {
            items.push({
              variantId: lineItem.node.variant.id,
              quantity: parseInt(quantity),
            });
            newLineItems.push({ node: { ...lineItem.node, quantity: parseInt(quantity) } });
            totalPrice += quantity * Number(lineItem.node.variant.presentmentPrices.edges[0].node.price.amount);
          }
          oldQuantity = lineItem.node.quantity;
        } else {
          if (!isGift(lineItem) && !isFreeGiftCard(lineItem.node)) {
            totalPrice +=
              Number(lineItem.node.quantity) *
              Number(lineItem.node.variant.presentmentPrices.edges[0].node.price.amount);
            items.push({
              variantId: lineItem.node.variant.id,
              quantity: parseInt(lineItem.node.quantity),
            });
            newLineItems.push(lineItem);
          }
        }
      }
    });

  // if (!checkSaleGiftCardId(variantId, store().getState().checkout.lineItems.edges)) {
  //   let freeGiftCardId = getFreeGiftCardId(totalPrice);
  //   if (freeGiftCardId) {
  //     items.push({
  //       variantId: btoa(`gid://shopify/ProductVariant/${freeGiftCardId}`),
  //       quantity: 1,
  //     });
  //   }

  //   let freeGiftBoxId = getFreeGiftBoxId(totalPrice);
  //   if (freeGiftBoxId) {
  //     items.push({
  //       variantId: btoa(`gid://shopify/ProductVariant/${freeGiftBoxId}`),
  //       quantity: 1,
  //     });
  //   }
  // }

  store()
    .getState()
    .checkoutLineItemsReplaceMutation({
      variables: {
        checkoutId: store().getState().checkout.id,
        lineItems: items,
        currencyCode: store().getState().currency.currencyCode,
      },
    });
}

/**
 * Updates the currency of the cart
 *
 * @param currencyCode the currency code to change to
 * @param updateCheckoutCurrencyMutation the apollo graphql mutation to use
 *
 * @return none
 */
export function updateCurrencyCart(currencyCode, updateCheckoutCurrencyMutation) {
  const lineItems = [];
  if (
    store().getState().checkout &&
    store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges
  ) {
    for (const lineItem of store().getState().checkout.lineItems.edges) {
      const newLineItem = {};
      if (lineItem.node) {
        newLineItem.quantity = lineItem.node.quantity;
        newLineItem.variantId = lineItem.node.variant.id;
      }
      lineItems.push(newLineItem);
    }
  }
  let input = {
    presentmentCurrencyCode: currencyCode,
  };
  if (lineItems && lineItems.length !== 0) {
    input = {
      presentmentCurrencyCode: currencyCode,
      lineItems,
    };
  }
  updateCheckoutCurrencyMutation({
    variables: {
      input,
      currencyCode,
    },
  });
}
export function initCurrency() {
  return new Promise((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        const tempString = xmlHttp.responseText.substring(
          xmlHttp.responseText.indexOf('rates:'),
          xmlHttp.responseText.indexOf('convert:'),
        );
        const currentRates = JSON.parse(tempString.substring(tempString.indexOf('{'), tempString.indexOf('}') + 1));
        resolve(currentRates);
      }
    };
    xmlHttp.open('GET', 'https://cdn.shopify.com/s/javascripts/currencies.js', true); // true for asynchronous
    xmlHttp.send(null);
  });
}

export function convertCurrency() {
  return new Promise((resolve) => {
    if (store().getState().currency && store().getState().currency.currencyCode !== 'USD') {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          const tempString = xmlHttp.responseText.substring(
            xmlHttp.responseText.indexOf('rates:'),
            xmlHttp.responseText.indexOf('convert:'),
          );
          const currentRates = JSON.parse(tempString.substring(tempString.indexOf('{'), tempString.indexOf('}') + 1));
          function changeCurrency(amount, from, to) {
            return (amount * currentRates[from]) / currentRates[to];
          }
          const newGifts = [];
          for (const singleThreshHold of giftsDefault) {
            newGifts.push({
              ...singleThreshHold,
              price: Math.floor(
                changeCurrency(singleThreshHold.price, 'USD', store().getState().currency.currencyCode),
              ),
            });
          }
          resolve(newGifts);
        }
      };
      xmlHttp.open('GET', 'https://cdn.shopify.com/s/javascripts/currencies.js', true); // true for asynchronous
      xmlHttp.send(null);
    } else {
      resolve(giftsDefault);
    }
  });
}

export function getGiftCardSalePrice(price) {
  switch (Number(price)) {
    case 100:
      return '95.00';
    case 200:
      return '180.00';
    case 400:
      return '320.00';
    default:
      return null;
  }
}

export function getFreeGiftCardId(price) {
  if (price >= 1500) {
    return 39285769601082;
  } else if (price >= 800) {
    return 39285769338938;
  } else if (price >= 300) {
    return 39285768880186;
  } else if (price >= 149) {
    return 39285768454202;
  }
  return null;
}

function getFreeGiftBoxId(price) {
  if (price >= 199) {
    return 39285841985594;
  }
  return null;
}

function checkSaleGiftCardId(id, lineItems) {
  let hasGift = { giftBox: 0, giftCard: 0 };

  lineItems.forEach((line) => {
    if (
      line.node.title === 'Gift Card 50' ||
      line.node.title === 'Gift Card 100' ||
      line.node.title === 'Gift Card 200' ||
      line.node.title === 'Gift Card 400' ||
      line.node.title === 'Luxury Gift box'
    ) {
      hasGift.giftCard = 1;
    }
    if (line.node.title === 'Luxury Gift box') {
      hasGift.giftBox = 1;
    }
  });

  let result = false;
  let convertedId = atob(id).replace('gid://shopify/ProductVariant/', '');

  let saleGiftIds = [31257657835578, 31257657868346, 31257657901114, 31257658032186];
  saleGiftIds.forEach((ids) => {
    if (ids === parseInt(convertedId)) {
      result = true;
    }
    if (Number(hasGift.giftBox) + Number(hasGift.giftCard) === 2) {
      result = false;
    }
  });

  return result;
}

export function isFreeGiftCard(lineItem) {
  let result = false;
  let product = lineItem.variant.product;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === 'free_gift_card') {
        result = true;
      }
    }
  }

  return result;
}

export function removeGiftCardFromCart() {
  let items = [];
  store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges &&
    store()
      .getState()
      .checkout.lineItems.edges.map((lineItem) => {
        if (!isFreeGiftCard(lineItem.node)) {
          items.push({
            variantId: lineItem.node.variant.id,
            quantity: parseInt(lineItem.node.quantity),
          });
        }
      });
  store()
    .getState()
    .checkoutLineItemsReplaceMutation({
      variables: {
        checkoutId: store().getState().checkout.id,
        lineItems: items,
        currencyCode: store().getState().currency.currencyCode,
      },
    });
}

export function removeFreeGiftBoxFromCart() {
  let items = [];
  store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges &&
    store()
      .getState()
      .checkout.lineItems.edges.map((lineItem) => {
        if (!(isGift(lineItem) && isGiftBox(lineItem.node))) {
          items.push({
            variantId: lineItem.node.variant.id,
            quantity: parseInt(lineItem.node.quantity),
          });
        }
      });
  store()
    .getState()
    .checkoutLineItemsReplaceMutation({
      variables: {
        checkoutId: store().getState().checkout.id,
        lineItems: items,
        currencyCode: store().getState().currency.currencyCode,
      },
    });
}

export function isGiftBox(lineItem) {
  let result = false;
  let product = lineItem.variant.product;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === 'giftbox') {
        result = true;
      }
    }
  }
  return result;
}

export function hasGiftBox(lineItems) {
  if (lineItems) {
    let result = false;
    for (let lineItem of lineItems) {
      if (lineItem && lineItem.node && lineItem.node.variant && lineItem.node.variant.product) {
        if (isGiftBox(lineItem.node)) {
          result = true;
        }
      }
    }
    return result;
  }
}

export function qtyCount() {
  let count = 0
  store().getState().checkout &&
    store().getState().checkout.lineItems &&
    store().getState().checkout.lineItems.edges &&
    store()
      .getState()
      .checkout.lineItems.edges.map((lineItem) => {
        count = Number(lineItem.node.quantity) + count
      })
  return count
}

export function isFiftyGiftCard(lineItem) {
  let isFiftyGiftCard = false;
  let product = lineItem.variant.product;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === 'free_gift_card') {
        isFiftyGiftCard = true;
      }
    }
  }
  return isFiftyGiftCard;
}

export function isGiftScarf(lineItem) {
  let result = false;
  let product = lineItem.variant.product;
  if (product && product.tags) {
    for (let tag of product.tags) {
      if (tag === 'giftscarf') {
        result = true;
      }
    }
  }
  return result;
}

export function hasGiftScarf(lineItems) {
  if (lineItems) {
    let result = false;
    for (let lineItem of lineItems) {
      if (lineItem && lineItem.node && lineItem.node.variant && lineItem.node.variant.product) {
        if (isGiftScarf(lineItem.node)) {
          result = true;
        }
      }
    }
    return result;
  }
}