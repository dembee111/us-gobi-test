export async function sendProductViewEvent(sendingObjectIds, indexName) {
  if (typeof window !== `undefined` && window.aa && sendingObjectIds.length > 0 && sendingObjectIds.length < 21) {
    window.aa('viewedObjectIDs', {
      index: indexName,
      eventName: 'View Products',
      objectIDs: sendingObjectIds,
    });
  }
}

// export async function sendSearchPageClickEvent(sendingObjectIds, indexName) {
//   if (typeof window !== `undefined` && window.aa && sendingObjectIds.length > 0 ) {
//     window.aa('clickedObjectIDs', {
//       index: indexName,
//       eventName: 'Click Product SearchPage',
//       objectIDs: sendingObjectIds,
//     });
//   }
// }

export async function sendProductClickEvent(sendingObjectIds, indexName) {
  if (typeof window !== `undefined` && window.aa && sendingObjectIds.length > 0 && sendingObjectIds.length < 21) {
    window.aa('clickedObjectIDs', {
      index: indexName,
      eventName: 'Click Product',
      objectIDs: sendingObjectIds,
    });
  }
}

// export function sendConversionEvent(sendingObjectIds,indexName){
//     if (typeof window !== `undefined` && window.aa && sendingObjectIds.length > 0 ) {
//         window.aa('convertedObjectIDs', {
//             index: indexName,
//             eventName: "Add to WishList",
//             objectIDs: sendingObjectIds
//         });
//     }
// }

export async function sendAddToCartEvent(sendingObjectIds, indexName) {
  if (typeof window !== `undefined` && window.aa && sendingObjectIds.length > 0 && sendingObjectIds.length < 21) {
    window.aa('convertedObjectIDs', {
      index: indexName,
      eventName: 'Conversion AddToCart',
      objectIDs: sendingObjectIds,
    });
  }
}

export async function sendAddToWishlistEvent(sendingObjectIds, indexName) {
  if (typeof window !== `undefined` && window.aa && sendingObjectIds.length > 0 && sendingObjectIds.length < 21) {
    window.aa('convertedObjectIDs', {
      index: indexName,
      eventName: 'Conversion AddToWishList',
      objectIDs: sendingObjectIds,
    });
  }
}

export function getUserToken() {
  return new Promise((resolve, reject) => {
    if (typeof window !== `undefined` && window.aa) {
      let userToken = '';
      window.aa('getUserToken', null, (err, algoliaUserToken) => {
        if (err) {
          console.error(err);
          return;
        }
        userToken = algoliaUserToken;
        resolve(userToken);
      });
    } else {
      reject();
    }
  });
}
