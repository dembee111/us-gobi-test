import { initialStateFilter } from '../SearchPage/SearchGrid/SearchGridHelper';
export function getInitCollectionProducts(handle, first, after, filter) {
  return new Promise((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let parsedResult = JSON.parse(xmlHttp.responseText);

        if (parsedResult.error) {
          reject(parsedResult.message);
        } else {
          resolve(parsedResult.message);
        }
      }
      // else {
      //   console.log(xmlHttp.responseText);
      // }
    };
    xmlHttp.open(
      'POST',
      'https://europe-west1-gobicashmere-sizechart.cloudfunctions.net/collectionPageInitProducts2',
      true,
    ); // true for asynchronous
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    const reqBody = JSON.stringify({
      superSecretCode: '8W?@zVgj$bDMWb3V',
      handle: handle,
      after: after,
      first: first,
      filter: filter,
      preSet: initialStateFilter,
      database: 'usCollection',
    });
    xmlHttp.send(reqBody);
  });
}

export function getAfterCollectionProducts(handle, first, after, filter) {
  return new Promise((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let parsedResult = JSON.parse(xmlHttp.responseText);

        if (parsedResult.error) {
          reject(parsedResult.message);
        } else {
          resolve(parsedResult.message);
        }
      }
      // else {
      //   console.log(xmlHttp.responseText);
      // }
    };
    xmlHttp.open(
      'POST',
      'https://europe-west1-gobicashmere-sizechart.cloudfunctions.net/collectionPageAfterProducts2',
      true,
    ); // true for asynchronous
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    const reqBody = JSON.stringify({
      superSecretCode: '8W?@zVgj$bDMWb3V',
      handle: handle,
      after: after,
      first: first,
      filter: filter,
      preSet: initialStateFilter,
      database: 'usCollection',
    });
    xmlHttp.send(reqBody);
  });
}

export function dataProcess(returningProductData) {
  let limiter = 4;
  const returningData = [[]];

  for (const singleProduct of returningProductData) {
    if (limiter === 4) {
      let product;
      if (singleProduct.node) {
        product = singleProduct.node;
      } else {
        product = singleProduct;
      }
      returningData[returningData.length - 1].push(product);
      if (returningData[returningData.length - 1].length === limiter) {
        returningData.push([]);
        limiter = 5;
      }
    } else if (limiter === 5) {
      let product;
      if (singleProduct.node) {
        product = singleProduct.node;
      } else {
        product = singleProduct;
      }
      returningData[returningData.length - 1].push(product);
      if (returningData[returningData.length - 1].length === limiter) {
        returningData.push([]);
        limiter = 4;
      }
    }
  }
  return returningData;
}

export function handleRecievedProductData(productEdges) {
  // let newProductEdges = [];
  for (const singleProductEdge of productEdges) {
    let product;
    if (singleProductEdge.node) {
      product = singleProductEdge.node;
    } else {
      product = singleProductEdge;
    }

    for (const singleTag of product.tags) {
      if (singleTag.includes('uniqueTag-')) {
        product.uniqueTag = singleTag;
        break;
      }
    }

    product.handle = `/products/${product.handle}`;

    product.colors = [];

    for (const singleTag of product.tags) {
      if (singleTag.includes('handle_')) {
        let color = singleTag.replace('handle_', '');
        const spliceIndex = color.indexOf('+');

        color = color.slice(0, spliceIndex);
        let handle = singleTag.replace(`handle_${color}+`, '');
        handle = `/products/${handle}`;
        product.colors.push({
          color,
          handle,
        });
      }
    }

    for (const option of product.options) {
      if (option.name === 'Color') {
        product.selectedColor = option.values[0];
      }
    }
  }
  return productEdges;
}

export function imageHandle(data) {
  for (const clonedItem of data) {
    if (clonedItem.length === 4) {
      for (const singleItem of clonedItem) {
        if (singleItem.images.edges) {
          if (singleItem.images.edges[0]) {
            singleItem.selectedImg = singleItem.images.edges[0].node.originalSrc;
          }

          if (singleItem.images.edges[1]) {
            singleItem.hoverImg = singleItem.images.edges[1].node.originalSrc;
          } else if (singleItem.images.edges[0] && singleItem.images.edges[0].node) {
            singleItem.hoverImg = singleItem.images.edges[0].node.originalSrc;
          }
        } else {
          if (singleItem.images[0]) {
            singleItem.selectedImg = singleItem.images[0].originalSrc;
          }

          if (singleItem.images[1]) {
            singleItem.hoverImg = singleItem.images[1].originalSrc;
          } else if (singleItem.images[0]) {
            singleItem.hoverImg = singleItem.images[0];
          }
        }
      }
    } else if (clonedItem.length === 5) {
      for (const singleItem of clonedItem) {
        if (singleItem.images.edges) {
          if (singleItem.images.edges[0] && singleItem.images.edges[0].node) {
            singleItem.selectedImg = singleItem.images.edges[0].node.originalSrc;
          }
          if (singleItem.images.edges[1]) {
            singleItem.hoverImg = singleItem.images.edges[1].node.originalSrc;
          } else if (singleItem.images.edges[0] && singleItem.images.edges[0].node) {
            singleItem.hoverImg = singleItem.images.edges[0].node.originalSrc;
          }
        } else {
          if (singleItem.images[0]) {
            singleItem.selectedImg = singleItem.images[0].originalSrc;
          }
          if (singleItem.images[1]) {
            singleItem.hoverImg = singleItem.images[1].originalSrc;
          } else if (singleItem.images[0]) {
            singleItem.hoverImg = singleItem.images[0].originalSrc;
          }
        }
      }
    }
  }
  return data;
}
export function filterReducer(state = initialStateFilter, action) {
  switch (action.type) {
    case 'color':
      return { ...state, colorFilters: action.payload.colorFilters };
    case 'size':
      return { ...state, sizeFilters: action.payload.sizeFilters };
    case 'categories':
      return { ...state, categoriesFilters: action.payload.categoriesFilters };
    case 'price':
      return { ...state, priceFilters: action.payload.priceFilters };
    case 'sort':
      return { ...state, sortFilters: action.payload.sortFilters };

    default:
      throw new Error();
  }
}
export function compareAtoZ(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

export function compareZtoA(a, b) {
  if (a.title < b.title) {
    return 1;
  }
  if (a.title > b.title) {
    return -1;
  }
  return 0;
}

export function comparePriceAsc(a, b) {
  if (
    parseInt(a.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount) <
    parseInt(b.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount)
  ) {
    return 1;
  }
  if (
    parseInt(a.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount) >
    parseInt(b.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount)
  ) {
    return -1;
  }
  return 0;
}

export function comparePriceDes(a, b) {
  if (
    parseInt(a.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount) <
    parseInt(b.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount)
  ) {
    return -1;
  }
  if (
    parseInt(a.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount) >
    parseInt(b.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount)
  ) {
    return 1;
  }
  return 0;
}

export function prepForProductClones(tempProductEdges) {
  const clonedTemp = [];
  for (const singleProductEdge of tempProductEdges) {
    let product;
    if (singleProductEdge.node) {
      product = singleProductEdge.node;
    } else {
      product = singleProductEdge;
    }
    clonedTemp.push(singleProductEdge);
  }
  tempProductEdges = handleRecievedProductData(clonedTemp);

  // let productList = [];

  tempProductEdges = dataProcess(tempProductEdges);

  // prep for html

  tempProductEdges = imageHandle(tempProductEdges);
  return tempProductEdges;
}

const { fromCharCode } = String;

export const firstLetterOfWordRegExp = /\b[a-z]|['_][a-z]|\B[A-Z]/g;
export function toLatin1UpperCase(x) {
  // avoid frequent anonymous inline functions
  const charCode = x.charCodeAt(0);
  return charCode === 39 ? x : fromCharCode(charCode ^ 32);
}
export function titleCase(string) {
  return string.replace(firstLetterOfWordRegExp, toLatin1UpperCase);
}
export const gerSpecialChar = [
  {
    og: 'ß',
    new: 'ss',
  },
  {
    og: 'ü',
    new: 'u',
  },
  {
    og: 'è',
    new: 'e',
  },
  {
    og: 'é',
    new: 'e',
  },
  {
    og: 'û',
    new: 'u',
  },
  {
    og: 'ö',
    new: 'o',
  },
  {
    og: 'â',
    new: 'a',
  },
  {
    og: "'",
    new: '_',
  },
];

export function menuSearching(headerCategories, matchParam) {
  let resultFound = false;
  // let searchIndex = props.matchParam;

  let searchIndex = matchParam;
  if (!searchIndex) {
    searchIndex = window.location.pathname.replace('/collections/');
  }
  for (const singleMenu of headerCategories) {
    if (singleMenu.link === `/collections/${searchIndex}`) {
      resultFound = true;
      return singleMenu;
    }
    if (singleMenu.child) {
      const result = menuSearching(singleMenu.child, searchIndex);
      if (result) {
        resultFound = true;
        return result;
      }
    }
    if (singleMenu.head) {
      if (singleMenu.head.link === `/collections/${searchIndex}`) {
        resultFound = true;
        return singleMenu.head;
      }
    }
  }
  if (!resultFound) {
    return null;
  }
}

export function categorySearching(innerHeaderCategories, matchParam) {
  let resultFound = false;
  let searchIndex = matchParam;
  if (!searchIndex) {
    searchIndex = window.location.pathname.replace('/collections/');
  }
  for (const singleMenu of innerHeaderCategories) {
    if (singleMenu.link === `/collections/${searchIndex}`) {
      resultFound = true;

      return {
        parent: innerHeaderCategories,
        child: singleMenu,
      };
    }
    if (singleMenu.child) {
      const result = categorySearching(singleMenu.child, searchIndex);

      if (result) {
        resultFound = true;
        return {
          parent: singleMenu,
          child: result.parent,
        };
      }
    }
    if (singleMenu.head) {
      if (singleMenu.head.link === `/collections/${searchIndex}`) {
        resultFound = true;
        return {
          parent: singleMenu,
        };
      }
    }
  }
  if (!resultFound) {
    return null;
  }
}

export function getBreadCrumbs(headerCategories, matchParam, returningArray) {
  // let resultFound = false;
  // let searchIndex = props.matchParam;
  let sourceReturningArray = JSON.parse(JSON.stringify(returningArray));

  let searchIndex = matchParam;
  if (!searchIndex) {
    searchIndex = window.location.pathname.replace('/collections/');
  }
  for (const singleMenu of headerCategories) {
    // console.log(singleMenu.link,searchIndex);

    if (singleMenu.link === `/collections/${searchIndex}`) {
      returningArray.push(singleMenu);

      return returningArray;
    }

    if (singleMenu.head) {
      if (singleMenu.head.link === `/collections/${searchIndex}`) {
        // resultFound = true;
        returningArray.push(singleMenu);
        return returningArray;
      }
    }

    if (singleMenu.child) {
      const result = getBreadCrumbs(singleMenu.child, searchIndex, returningArray);

      if (result) {
        if (singleMenu.head) {
          result.push(singleMenu.head);
        } else {
          result.push(singleMenu);
        }

        return result;
      }
    }
  }
}
