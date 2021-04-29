import store from '../../state/createStore';
import { sendAddToWishlistEvent } from '../../components/shared/dataLayer/algolia';

export function toggleWishlist(productId, variantId) {
  // prod is already in wishlist
  if (
    store().getState().myWishlist &&
    Array.isArray(store().getState().myWishlist) &&
    store().getState().myWishlist.includes(productId)
  ) {
    removeFromWishlist(productId);
  } else {
    addToWishlist(productId, variantId);
  }
}

export function addToWishlist(productId, variantId) {
  return new Promise((resolve, reject) => {
    store().dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: {
        wishlistItem: productId,
      },
    });
    if (store().getState().customer && store().getState().customer.id) {
      let sendingObjectIds = [variantId];
      sendAddToWishlistEvent(sendingObjectIds, 'us_products');

      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {
            resolve(xmlHttp.responseText);
          } else {
            reject();
          }
        }
      };
      xmlHttp.open('POST', 'https://us-central1-wishlist-d3465.cloudfunctions.net/addToWishlist', true); // true for asynchronous
      xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      const reqBody = `customerId=${store().getState().customer.id}&region=US` + `&productId=${productId}`;
      xmlHttp.send(reqBody);
    } else {
      reject('Customer id is not defined');
    }
  });
}

export function setWishlist(wishlist) {
  return new Promise((resolve, reject) => {
    store().dispatch({
      type: 'SET_WISHLIST',
      payload: {
        wishlist,
      },
    });
    if (store().getState().customer && store().getState().customer.id && Array.isArray(wishlist)) {
      let sendingObjectIds = wishlist;
      sendAddToWishlistEvent(sendingObjectIds, 'us_products');

      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {
            resolve(xmlHttp.responseText);
          } else {
            reject();
          }
        }
      };
      xmlHttp.open('POST', 'https://us-central1-wishlist-d3465.cloudfunctions.net/setWishlist', true); // true for asynchronous
      xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      function arrayToXWFU(key, array) {
        let convertedString = '';
        for (let elm of array) {
          convertedString += `&${key}=${elm}`;
        }
        return convertedString;
      }

      const reqBody =
        `customerId=${store().getState().customer.id}&region=US` + `${arrayToXWFU('wishlist[]', wishlist)}`;
      xmlHttp.send(reqBody);
    } else {
      reject('Customer id is not defined / wishlist is not an array');
    }
  });
}

export function removeFromWishlist(productId) {
  return new Promise((resolve, reject) => {
    store().dispatch({
      type: 'REMOVE_FROM_WISHLIST',
      payload: { wishlistItem: productId },
    });
    if (store().getState().customer && store().getState().customer.id) {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {
            resolve(xmlHttp.responseText);
          } else {
            reject();
          }
        }
      };
      xmlHttp.open('POST', 'https://us-central1-wishlist-d3465.cloudfunctions.net/removeProduct', true); // true for asynchronous
      xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      const reqBody = `customerId=${store().getState().customer.id}&region=US` + `&productId=${productId}`;
      xmlHttp.send(reqBody);
    } else {
      reject('Customer id is not defined');
    }
  });
}

export async function getWishlist(customerId) {
  return new Promise((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          resolve(xmlHttp.responseText);
        } else {
          reject();
        }
      }
    };
    xmlHttp.open('POST', 'https://us-central1-wishlist-d3465.cloudfunctions.net/getWishlist', true); // true for asynchronous
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const reqBody = `customerId=${customerId}&region=US`;
    xmlHttp.send(reqBody);
  });
}
