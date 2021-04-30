import store from '../../../state/createStore';

function waitForFbq(callback) {
  if (typeof fbq !== 'undefined') {
    callback();
  } else {
    setTimeout(function () {
      waitForFbq(callback);
    }, 100);
  }
}

export function addToCartEvent(product, variant, quantity) {
  if (typeof window !== `undefined` && window.dataLayer) {
    waitForFbq(() => {
      window.dataLayer.push({
        event: 'addToCart',
        ecommerce: {
          currencyCode: store().getState().currency.currencyCode,
          add: {
            products: [
              {
                name: product.title && product.title.replace("'", ''),
                id: (variant.sku && variant.sku.replace("'", '')) || '',
                productId: product.id && atob(product.id).replace('gid://shopify/Product/', '').replace("'", ''),
                variantId:
                  (variant.id && atob(variant.id).replace('gid://shopify/ProductVariant/', '').replace("'", '')) || '',
                price: variant.priceV2 && parseInt(variant.priceV2.amount),
                compareAtPrice: variant.compareAtPriceV2 && parseInt(variant.compareAtPriceV2.amount),
                quantity: quantity, // update to actual quantity
                category: (product.productType && product.productType.replace("'", '')) || '',
                inventoryCount: variant.quantityAvailable,
              },
            ],
          },
        },
      });
    });
  }
}

export function removeFromCartEvent(sendingProduct) {
  if (typeof window !== `undefined` && window.dataLayer) {
    window.dataLayer.push({
      event: 'removeFromCart',
      ecommerce: {
        remove: {
          products: [sendingProduct],
        },
      },
    });
  }
}

export function subscribeEvent(email) {
  if (typeof window !== `undefined` && window.dataLayer) {
    window.dataLayer.push({
      event: 'subscribe',
      customerEmail: email, // Hashed customer email
    });
  }
}

export function allPagesEvent() {
  if (typeof window !== `undefined` && window.dataLayer) {
    if (store().getState().customer.id) {
      let cartTotal = '';
      if (store().getState().checkout) {
        cartTotal = store().getState().checkout.totalPriceV2.amount;
      }
      window.dataLayer.push({
        visitorType: 'User', // Guest OR User
        customerId:
          store().getState().customer.id && atob(store().getState().customer.id).replace('gid://shopify/Customer/', ''),
        customerEmail: store().getState().customer.email && store().getState().customer.email.replace("'", ''), // Shopify customer email hashed if possible
        cartTotal: cartTotal && parseInt(cartTotal), // should be the subtotal currently added to cart
        pageType: 'cart', // home|collection|product|cart|searchresults|checkout|purchase|other
      });
    } else {
      let cartTotal = '';
      if (store().getState().checkout) {
        cartTotal = store().getState().checkout.totalPriceV2.amount;
      }

      window.dataLayer.push({
        visitorType: 'Guest', // Guest OR User
        cartTotal: cartTotal && parseInt(cartTotal), // should be the subtotal currently added to cart
        pageType: 'cart', // home|collection|product|cart|searchresults|checkout|purchase|other
      });
    }
    const edges = store().getState().checkout.lineItems.edges || [];
    var cartItems = edges.map(function (lineItem, idx) {
      if (lineItem.node.variant) {
        let variant = lineItem.node.variant;
        let product = lineItem.node.variant.product;

        return {
          position: idx,
          id: variant.sku,
          productId: product.id && atob(product.id).replace('gid://shopify/Product/', ''),
          variantId: variant.id && atob(variant.id).replace('gid://shopify/ProductVariant/', ''),
          name: variant.title && variant.title.replace("'", ''),
          quantity: variant.quantityAvailable,
          price: variant.price && parseInt(variant.price),
        };
      }
    });

    window.dataLayer.push({
      ecommerce: {
        currencyCode: store().getState().currency.currencyCode,
        actionField: { list: 'Shopping Cart' },
        impressions: cartItems,
      },
    });
  }
}

export function collectionViewEvent(allProducts) {
  if (typeof window !== `undefined` && window.dataLayer) {
    window.dataLayer.push({
      event: 'collectionView',
      ecommerce: {
        currencyCode: store().getState().currency.currencyCode,
        actionField: { list: 'Collection Page' },
        impressions: allProducts,
      },
    });
  }
}

export function productClickEvent(sendingProductData, handle) {
  if (typeof window !== `undefined` && window.dataLayer) {
    let sendingData = {
      event: 'productClick',
      ecommerce: {
        click: {
          actionField: { list: handle }, // Optional list property.
          products: [sendingProductData],
        },
      },
    };

    window.dataLayer.push(sendingData);
  }
}

export function productDetailViewEvent(product) {
  if (typeof window !== `undefined` && window.dataLayer) {
    let sendingObject = {
      event: 'productDetailView',
      ecommerce: {
        currencyCode: store().getState().currency.currencyCode,
        detail: {
          products: [product],
        },
      },
    };
    waitForFbq(() => {
      window.dataLayer.push(sendingObject);
    });
  }
}

export function searchResultsEvent(input, products) {
  if (typeof window !== `undefined` && window.dataLayer) {
    waitForFbq(() => {
      window.dataLayer.push({
        event: 'searchResults',
        searchQuery: input, // grab actual search query
        ecommerce: {
          currencyCode: store().getState().currency.currencyCode,
          actionField: { list: 'Search Results' },
          impressions: products,
        },
      });
    });
  }
}
