import { formatPrice } from '../../../components/shared/cart/CartHelpers';

export function getColorAndSize(product) {
  let color = '';
  let size = '';
  product.options &&
    product.options.map((option) => {
      if (option.name === 'Color') {
        if (option.values && option.values.length > 0) {
          color = option.values[0];
        }
      } else if (option.name === 'Size') {
        if (option.values && option.values.length > 0) {
          size = option.values[0];
        }
      }
    });
  return [color, size];
}

export function getPrice(product) {
  let beforeDecimal = '';
  let afterDecimal = '';

  if (
    product.variants &&
    product.variants.edges &&
    product.variants.edges[0] &&
    product.variants.edges[0].node &&
    product.variants.edges[0].node.presentmentPrices &&
    product.variants.edges[0].node.presentmentPrices.edges &&
    product.variants.edges[0].node.presentmentPrices.edges[0] &&
    product.variants.edges[0].node.presentmentPrices.edges[0].node &&
    product.variants.edges[0].node.presentmentPrices.edges[0].node.price &&
    product.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount
  ) {
    [beforeDecimal, afterDecimal] = (
      formatPrice(product.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount) + ''
    ).split('.');
  }
  return [beforeDecimal, afterDecimal];
}

export function getMultiplier(tags) {
  for (let tag of tags) {
    if (tag === 'uktwo') {
      return 2;
    }
  }
  return 1;
}
