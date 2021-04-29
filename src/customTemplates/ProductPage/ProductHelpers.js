import { sizeData } from '../../components/shared/data/sizeData';

export const getStorePath = (path) => {
  let result = 'eu';

  if (path.includes('/de/')) {
    result = 'de';
  } else if (path.includes('/us/')) {
    result = 'us';
  } else if (path.includes('/uk/')) {
    result = 'uk';
  } else if (path.includes('/ru/')) {
    result = 'ru';
  }

  return result;
};
export const productSizeParser = (size, gender) => {
  try {
    let urlPath = window.location.pathname;
    let result = size;

    if (urlPath && sizeData && gender) {
      const selPath = getStorePath(urlPath);
      let rawResult = sizeData[selPath];

      if (rawResult && (gender == 'woman' || gender == 'man')) {
        rawResult = sizeData[selPath][gender][selPath][size.toLowerCase()];

        if (rawResult) {
          result = `${size} (${selPath} ${rawResult})`;
        }
      }
    }
    return result.toUpperCase();
  } catch (error) {
    return size;
  }
};

export const getProductGender = (tag) => {
  let result = null;

  if (tag === 'woman' || tag === 'man' || tag === 'women' || tag === 'men') {
    if (tag === 'women') {
      tag = 'woman';
    } else if (tag === 'men') {
      tag = 'man';
    }
    result = tag;
  }
  return result;
};

export const primeColorOrder = [
  'red',
  'salmon',
  'shrimp',
  'burnt coral',
  'fusion coral',
  'coral',
  'tangerine tango',
  'shell pink',
  'cayenne',
  'spicy orange',
  'scarlet',
  'fiery red',
  'racing red',
  'ribbon red',
  'rose red',
  'barberry',
  'haute red',
  'earth red',
  'burnt brick',
  'tandori spice',
  'red clay',
  'burnt ochre',
  'burnt henna',
  'crushed berry',
  'bordeaux',
  'rhododendron',
  'cabernet',
  'cowhide',
  'sassafras',
  'bitter chocolate',
  'black plum',
  'aurora red',
  'chili',
  'pink',
  'rosewater',
  'blossom pink',
  'pearl blush',
  'dusty pink',
  'blush',
  'foxglove',
  'bubblegum',
  'winetasting',
  'peach blossom',
  'chalk violet',
  'purple gumdrop',
  'heirloom-lilac',
  'deep-periwinkle',
  'almond-blossom',
  'pale lilac',
  'mauve chalk',
  'rose smoke',
  'adobe rose',
  'wood rose',
  'lilas',
  'ash rose',
  'old rose',
  'pale mauve',
  'grape shake',
  'rose brown',
  'dark purple',
  'rum raisin',
  'fuchsia rose',
  'bright rose',
  'raspberry radiance',
  'beaujolais',
  'tibetan red',
  'paradise pink',
  'powder pink',
  'orchid ice',
  'orchid hush',
  'orchid bloom',
  'orchid bouquet',
  'lavender frost',
  'sandstone',
  'lavender gray',
  'grape jam',
  'sweet grape',
  'plum perfect',
  'bellflower',
  'cherries jubilee',
  'pale dogwood',
  'foxglove',
  'yellow',
  'french vanilla',
  'pale banana',
  'golden haze',
  'daffodil',
  'yolk yellow',
  'mustard',
  'citronelle',
  'mustard gold',
  'peach nougat',
  'sun orange',
  'red orange',
  'nasturtium',
  'tigerlily',
  'apricot',
  'solar power',
  'yellow-iris',
  'green',
  'whispering blue',
  'clearly aqua',
  'pale aqua',
  'gray mist',
  'jade green',
  'arctic blue',
  'abyss',
  'slate',
  'dusty green',
  'deep lake',
  'teal green',
  'shady glade',
  'atlantic deep',
  'agave green',
  'capulet olive',
  'sea spray',
  'bronze green',
  'trekking green',
  'jane bug',
  'sea moss',
  'dark green',
  'greener pastures',
  'kombu green',
  'dark olive',
  'opal',
  'cypress',
  'teal',
  'vetiver',
  'loden-frost',

  'marine',
  'arctic ice',
  'gray dawn',
  'thistle',
  'brunnera blue',
  'dusty lavender',
  'blue iris',
  'surf the web',
  'blueprint',
  'sodalite blue',
  'nightshadow blue',
  'crown blue',
  'peacoat',
  'deep well',
  'midnight',
  'illusion blue',
  'sky way',
  'light blue',
  'airy blue',
  'blue',
  'blue granite',
  'purple impression',
  'english manor',
  'ultra marine',
  'bijou blue',
  'navy peony',
  'black iris',
  'navy',
  'baby blue',
  'blue glass',
  'canal blue',
  'delphinium blue',
  'dusty blue',
  'blue heaven',
  'coronet blue',
  'blithe',
  'hawaiian ocean',
  'caribbean sea',
  'mosaic blue',
  'peacock',
  'moroccan blue',
  'ensign blue',
  'majolica blue',
  'ebony',
  'eclipse',
  'winter sky',
  'navy blazer',
  'starlight blue',
  'twilight blue',
  'copen-blue',
  'dress-blues',
  'poseidon',

  'black',
  'grey',
  'antarctica',
  'micro chip',
  'white gray',
  'light gray',
  'harbor mist',
  'paloma',
  'tradewinds',
  'sharkskin',
  'stone gray',
  'neutral gray',
  'dim gray',
  'charcoal',
  'shale',
  'vapor blue',
  'gray morn',
  'storm-front',
  'brown',
  'caramel cream',
  'ginger root',
  'light camel',
  'toasted almond',
  'sheepskin',
  'roebuck',
  'tawny brown',
  'almond',
  'pumpkin spice',
  'camel',
  'mocha',
  'leather brown',
  'sequoia',
  'twilight mauve',
  'deep taupe',
  'andorra',
  'shopping bag',
  'decadent chocolate',
  'java',
  'chocolate brown',
  'coffee bean',
  'molé',
  'sugar almond',
  'taupe',
  'beige',
  'whitecap gray',
  'parchment',
  'tapioca',
  'creme brulee',
  'sandshell',
  'wintermood',
  'fog',
  'warm grey',
  'light taupe',
  'feather gray',
  'plaza taupe',
  'satellite',
  'cocoa',
  'turkish coffee',
  'buttercream',
  'shitake',
  'otter',
  'falcon',
  'nomad',
  'almond-milk',
  'white',
  'snow white',
  'off white',
  'tofu',
  'ivory white',
  'whisper white',
].map((item) => {
  return item.replace(/ /g, '-');
});

const gerSpecialChar = [
  {
    og: ' ',
    new: '-',
  },
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
  {
    og: 'ê',
    new: 'e',
  },
];

export function processSpecialColorName(tempAddingColor) {
  for (const singleSpecialChar of gerSpecialChar) {
    while (tempAddingColor.includes(singleSpecialChar.og)) {
      tempAddingColor = tempAddingColor.replace(singleSpecialChar.og, singleSpecialChar.new);
    }
  }
  return tempAddingColor;
}

export const structuredDataSingle = (prod, images) => {
  const data = {
    '@context': 'http://schema.org/',
    '@type': 'Product',
    name: `${prod.title}`,
    image: images.map((item) => ({
      '@type': 'ImageObject',
      url: `${item.url}`,
      image: `${item.url}`,
      name: `${item.name}`,
      width: 1024,
      height: 1024 * 1.5,
    })),
    description: prod.description,
    brand: 'Gobi Cashmere',
    offers: {
      '@type': 'Offer',
      priceCurrency: `${prod.currency || '$'}`,
      price: prod.price ? `${parseFloat(prod.price)}` : 0,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Gobi Cashmere',
      },
    },
  };

  return JSON.stringify(data);
};

export function getLocalRecentProduct(id) {
  let rawID = getDecodeProductId(id);
  let rawList = localStorage.getItem('recProdViewUs');
  let rawIdList = [];

  if (rawList) {
    rawIdList = JSON.parse(rawList);

    if (!rawIdList.includes(rawID)) {
      rawIdList.push(rawID);

      rawIdList.reverse();

      if (rawIdList.length > 10) {
        rawIdList.splice(0, 10);
      }
    }
  } else {
    rawIdList.push(rawID);
  }

  localStorage.setItem('recProdViewUs', JSON.stringify(rawIdList));

  return rawIdList;
}

export async function initMetaTags(metaTagObject, id, objectName) {
  return new Promise((resolve, reject) => {
    let title = '';
    let description = '';
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let parsedResult = JSON.parse(xmlHttp.responseText);
        if (objectName === 'product') {
          for (let singleMetaFieldEdge of parsedResult.result.product.metafields.edges) {
            if (singleMetaFieldEdge.node.key === 'title_tag') {
              title = singleMetaFieldEdge.node.value;
            }

            if (singleMetaFieldEdge.node.key === 'description_tag') {
              description = singleMetaFieldEdge.node.value;
            }
          }
        } else if (objectName === 'collection') {
          for (let singleMetaFieldEdge of parsedResult.result.collectionByHandle.metafields.edges) {
            if (singleMetaFieldEdge.node.key === 'title_tag') {
              title = singleMetaFieldEdge.node.value;
            }
            if (singleMetaFieldEdge.node.key === 'description_tag') {
              description = singleMetaFieldEdge.node.value;
            }
          }
        }

        metaTagObject.title = title;
        metaTagObject.description = description;
        resolve(metaTagObject);
        // setMetaTags(metaTagObject);
      } else {
        resolve(metaTagObject);
        // setMetaTags(metaTagObject);
      }
    };
    xmlHttp.open('POST', 'https://europe-west1-gobicashmere-sizechart.cloudfunctions.net/getGlobalMetaData', true); // true for asynchronous
    // xmlHttp.open('POST', 'http://localhost:5001/gobicashmere-sizechart/europe-west1/getGlobalMetaData', true); // true for asynchronous
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    const reqBody = JSON.stringify({
      objectName: objectName,
      id: id,
      siteName: 'gobicashmereus',
    });
    xmlHttp.send(reqBody);
  });

  // await;
}

function getDecodeProductId(productId) {
  return atob(productId).replace('gid://shopify/Product/', '');
}
